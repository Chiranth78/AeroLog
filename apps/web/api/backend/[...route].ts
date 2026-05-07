// The API bundle is compiled just before the Next.js build on Vercel.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import app from "../../../api/dist/app.js";
import type { IncomingMessage, ServerResponse } from "node:http";

export default function handler(request: IncomingMessage & { url?: string }, response: ServerResponse) {
  if (request.url) {
    request.url = request.url.replace(/^\/api\/backend/, "") || "/";
  }

  return app(request, response);
}
