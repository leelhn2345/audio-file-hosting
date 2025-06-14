import { FastifyRequest } from "fastify";

import { getUserSession } from "@utils/session.js";

// Define the regex to match excluded routes
export const excludedRoutesRegex = new RegExp(
  [
    "^/api/health$",
    "^/docs(\\/.*)?$", // `/docs/*`
    "^/file(\\/.*)?$", // `/file/*`
    "^/auth(\\/.*)?$", // `/auth/*`
  ].join("|"),
);

export async function authenticationMiddleware(req: FastifyRequest) {
  if (excludedRoutesRegex.test(req.url)) return;
  getUserSession(req);
  req.userSession.touch();
}
