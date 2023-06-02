import {Chat, User} from "@/app/globalTypes.ts";

export interface ChatSlice {
  isSelected: boolean,
  chatId: string | null,
  user: User | null,
  userChats: ChatMap | {}
}
export interface ActionSetChat {
  user: User,
  chatId: string
}

export interface ChatMap {
  [key: string]: Chat
}