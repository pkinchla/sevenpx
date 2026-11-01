## Getting Started

This project uses fresh and deno. You can get started here:
https://fresh.deno.dev/docs/getting-started

To get the project up and running you will need some SVGS and some optional ENV
variables for managing content through contentful.

1. create a .env file at the root of the project with the following:

```bash
SPACE_ID=contentful-space-id
ACCESS_TOKEN=contentful-access-token
CONTENT_ENTRY=contentful-content-entry
```

2. Then create a folder of SVGS in `./svg/` (still the root of the project).
3. run the `deno task process:drawings` to generate some json for the
   application.

_Tip: It is good to include a title for use on naming each drawing. Though, it
will fallback to the filename if no title is provided._

You can now run the app in development using `deno task start`. For building the
app for production use `deno task build`.

## Deploying

The app is deployed to Cloudflare Workers.

1. Log in to Cloudflare: `deno run -A npm:wrangler login`
2. Add the Contentful variables as Worker secrets (one-time):

```bash
deno run -A npm:wrangler secret put SPACE_ID
deno run -A npm:wrangler secret put ACCESS_TOKEN
deno run -A npm:wrangler secret put CONTENT_ENTRY
```

3. Run `deno task preview` to try the production build in the local Workers
   runtime, then `deno task deploy` to build and deploy.

## My instance

[sevenpx](https://sevenpx.design/)
