import { atomWithStorage } from "jotai/utils";

export interface UserData {
  name: string;
  email: string;
}

export const userAtom = atomWithStorage<UserData | undefined>(
  "userSession",
  undefined,
);
