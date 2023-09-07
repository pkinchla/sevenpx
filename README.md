## Getting Started

This project uses fresh and deno. You can get started here: https://fresh.deno.dev/docs/getting-started

To get the project up and running you will need some SVGS and some optional ENV variables for managing content through contentful.

1. create a .env file at the root of the project with the following:

```bash
SPACE_ID=contentful-space-id
ACCESS_TOKEN=contentful-access-token
CONTENT_ENTRY=contentful-content-entry
```

2. Then create a folder of SVGS in `./svg/` (still the root of the project).
3. run the `yarn draw` to generate some json for the application.

_Tip: It is good to include a title for use on naming each drawing. Though, it will fallback to the filename if no title is provided._

You can now run the app in development using `deno task start`. For building the app for production use `deno task build`.

## My instance

[sevenpx](https://sevenpx.design/)
