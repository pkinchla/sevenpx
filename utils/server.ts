import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { createClient } from "contentful";
import { marked } from "marked";

// run server side
export async function getContent() {
  const ENV = await config();
  const client = createClient({
    space: ENV.SPACE_ID,
    accessToken: ENV.ACCESS_TOKEN,
  });

  return await client
    .getEntry(ENV.CONTENT_ENTRY)
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
