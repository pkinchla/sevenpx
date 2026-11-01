import process from "node:process";
import { marked } from "marked";

interface ContentFields {
  copy: string;
}

interface ContentfulError {
  sys: { id: string };
  message: string;
}

interface CachedCopy {
  copy: string;
  cachedAt: number;
}

// How long rendered Contentful copy is reused before refetching. Entries are
// kept for a day so stale copy can be served if Contentful is unreachable.
const CACHE_TTL_MS = 5 * 60 * 1000;
const CACHE_MAX_AGE_S = 24 * 60 * 60;

// Shared across requests within a Cloudflare data center. Expiry is tracked
// via `cachedAt` because Deno's Cache API (used in dev) ignores Cache-Control.
async function readCache(key: string): Promise<CachedCopy | undefined> {
  try {
    const cache = await caches.open("contentful");
    const response = await cache.match(key);
    return response ? await response.json() : undefined;
  } catch {
    return undefined;
  }
}

async function writeCache(key: string, copy: string) {
  try {
    const cache = await caches.open("contentful");
    const body: CachedCopy = { copy, cachedAt: Date.now() };
    await cache.put(
      key,
      new Response(JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `max-age=${CACHE_MAX_AGE_S}`,
        },
      }),
    );
  } catch {
    // Caching is best effort.
  }
}

// run server side
export async function getContent() {
  const SPACE_ID = process.env.SPACE_ID;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const ENTRY = process.env.CONTENT_ENTRY;

  const url =
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${ENTRY}`;

  const cached = await readCache(url);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return { hasError: false, status: 200, copy: cached.copy, error: null };
  }

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    if (!response.ok) {
      const errorObject: ContentfulError = await response.json();
      return {
        hasError: true,
        status: response.status,
        error: errorObject.message,
        copy: null,
      };
    }

    const content: { fields: ContentFields } = await response.json();
    const copy = marked.parse(content.fields.copy);
    await writeCache(url, copy);
    return { hasError: false, status: 200, copy, error: null };
  } catch (error) {
    // Serve stale copy rather than an error if Contentful is unreachable.
    if (cached) {
      return { hasError: false, status: 200, copy: cached.copy, error: null };
    }
    return {
      hasError: true,
      status: 404,
      error: (error as Error).message,
      copy: null,
    };
  }
}
