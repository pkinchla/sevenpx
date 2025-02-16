import { createClient } from "contentful";
import { marked } from "marked";

const SPACE_ID = Deno.env.get("SPACE_ID") as string;
const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN") as string;
const CONTENT_ENTRY = Deno.env.get("CONTENT_ENTRY") as string;

// run server side
export async function getContent() {
  const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
  });

  return await client
    .getEntry(CONTENT_ENTRY)
    .then((content: any) => {
      return {
        hasError: false,
        status: 200,
        copy: marked.parse(content.fields.copy),
        error: null,
      };
    })
    .catch((error: Error) => {
      switch (error.name) {
        case "AccessTokenInvalid":
        case "AccessDenied":
        case "BadRequest":
        case "NotFound":
        case "VersionMismatch": {
          const errorObject = JSON.parse(error.message);
          return {
            hasError: true,
            status: errorObject.status,
            error: errorObject.message,
            copy: null,
          };
        }
        default: {
          return {
            hasError: true,
            status: 404,
            error: error.message,
            copy: null,
          };
        }
      }
    });
}
