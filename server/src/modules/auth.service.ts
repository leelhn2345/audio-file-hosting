import { Static } from "@sinclair/typebox";

import { LoginSchema } from "./auth.schema.js";

export async function login(data: Static<typeof LoginSchema>) {}

