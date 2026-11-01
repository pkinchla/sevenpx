import process from "node:process";
import { marked } from "marked";

interface ContentFields {
  copy: string;
}

interface ContentfulError {
  sys: { id: string };
  message: string;
}

// run server side
export async function getContent() {
  const SPACE_ID = process.env.SPACE_ID;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const ENTRY = process.env.CONTENT_ENTRY;

  const url =
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${ENTRY}`;

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
    return {
      hasError: false,
      status: 200,
      copy: marked.parse(content.fields.copy),
      error: null,
    };
  } catch (error) {
    return {
      hasError: true,
      status: 404,
      error: (error as Error).message,
      copy: null,
    };
  }
}
