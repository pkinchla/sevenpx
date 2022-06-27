## Getting Started
This project uses yarn. First, install all the dependencies via `yarn`

To get the project up and running you will need some SVGS and some ENV variables.

1. create a .env.local file at the root of the project with the following: 

```bash
SPACE_ID=contentful-space-id
ACCESS_TOKEN=contentful-access-token
CONTENT_ENTRY=contentful-content-entry
```

2. Then create a folder of SVGS in `./svg/` (still the root of the project).
3. run the `yarn draw` to generate some json for the application. 

*Tip: It is good to include a title for use on naming each drawing. Though, it will fallback to the filename if no title is provided.*

You can now run the app in development using `yarn dev`. For building the app for production use `yarn build`.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
