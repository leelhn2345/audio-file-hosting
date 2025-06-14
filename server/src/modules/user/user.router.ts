import { Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { FastifyRequest } from "fastify/types/request.js";

import { UserSchema } from "./user.schema.js";

import { getUserSession } from "@utils/session.js";

import { getUserData, putUserData } from "./user.service.js";

const tags = ["user"];

export async function userRouter(server: FastifyInstance) {
  server.get("/user", {
    schema: {
      tags,
      response: { 200: UserSchema },
    },
    handler: async (req, reply) => {
      const user = getUserSession(req);
      const data = await getUserData(user);
      reply.send(data);
    },
  });

  server.put("/user", {
    schema: {
      tags,
      body: UserSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof UserSchema> }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const data = await putUserData(req.body, user);
      req.userSession.value = data;
      reply.send({ message: "User data successfully updated." });
    },
  });

  server.delete("/user", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {
      const user = getUserSession(req);
      reply.send({ message: "User data successfully deleted." });
    },
  });
}
