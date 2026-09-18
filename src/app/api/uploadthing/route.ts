import { getAuthOrigin } from "@/auth";
import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
  config: {
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    uploadthingAppId:
      process.env.UPLOADTHING_APP_ID ??
      process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
    callbackUrl: `${getAuthOrigin()}/api/uploadthing`,
  },
});
