import {User} from "@/app/globalTypes.ts";

export interface authData {
  email: string,
  uid: string,
}
export interface AuthSlice {
  authData: authData | null,
  currentUser: User | null
}