// Cloudflare Worker entry. Fresh's Vite plugin provides this virtual module to
// every server environment, including the Worker one created by the Cloudflare
// plugin, so it doesn't depend on a prior `_fresh/server.js` build.
export { default } from "fresh:server_entry";
