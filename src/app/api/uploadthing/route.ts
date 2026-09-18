import { getAuthOrigin } from "@/auth";
import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
    callbackUrl: `${getAuthOrigin()}/api/uploadthing`,
  },
});
