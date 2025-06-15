import { atomWithStorage } from "jotai/utils";

type User = {
  name: string;
  email: string;
};

export const userAtom = atomWithStorage<User | undefined>(
  "userSession",
  undefined,
);
