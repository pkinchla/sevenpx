import { createClient } from 'contentful';
import { marked } from 'marked';

// run server side
export async function getContent() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  return await client
    .getEntry(process.env.CONTENT_ENTRY)
    .then((content) => {
      return {
        hasError: false,
        copy: marked.parse(content.fields.copy),
      };
    })
    .catch((error) => {
      switch (error.name) {
        case 'AccessTokenInvalid':
        case 'AccessDenied':
        case 'BadRequest':
        case 'NotFound':
        case 'VersionMismatch':
          const errorObject = JSON.parse(error.message);
          return {
            hasError: true,
            status: errorObject.status,
            error: errorObject.message,
            copy: null,
          };
        default:
          return {
            hasError: true,
            status: 404,
            error: error.message,
            copy: null,
          };
      }
    });
}
