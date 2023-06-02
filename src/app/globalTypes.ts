export interface User {
  email: string,
  firstName: string,
  lastName: string,
  photoUrl: string,
  uid: string,
}
export interface Chat{
  date: {
    seconds: number,
    nanoseconds: number,
  },
  lastMessage?: {
    message: string
  }
  userInfo: User
}

export interface Message {
  date: {
    seconds: number,
    nanoseconds: number,
  },
  id: string,
  img?: string,
  message: string,
  senderId: string,
}