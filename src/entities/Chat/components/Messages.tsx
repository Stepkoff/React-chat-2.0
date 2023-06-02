import {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {Message} from "@/app/globalTypes.ts";
import {doc, onSnapshot} from "firebase/firestore";
import {fireDb} from "@/app/firebaseConfig";
import {Button} from "@/shared/ui/button.tsx";
import {ChatInput, removeChatWithUser, UserMessage} from "@/entities/Chat";
import {ArrowLeftIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar.tsx";

export const Messages = () => {
  const user = useAppSelector(state => state.chatSlice.user);
  const currentUser = useAppSelector(state => state.authSlice.currentUser);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const chatId = useAppSelector(state => state.chatSlice.chatId);
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    onSnapshot(doc(fireDb, 'chats', chatId as string), (doc) => {
      if(doc.exists()) setMessages(doc.data().messages)
    })
  }, [user, chatId])

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages])

  return (
    <div className={'w-full flex flex-col'}>
      <header className={'bg-accent gap-2 pl-2 h-12 flex items-center'}>
        <Button className={'flex md:hidden p-2 h-full border-r rounded-none'} variant={'secondary'} onClick={() => dispatch(removeChatWithUser())}><ArrowLeftIcon/>
        </Button>
        <div className={'flex items-center gap-2 py-1'}>
          <Avatar className={''}>
            <AvatarImage className={'object-cover'} src={user?.photoUrl} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <span className={'first-letter:uppercase'}>{user?.firstName}</span> <span className={'first-letter:uppercase'}>{user?.lastName}</span>
        </div>
      </header>

      <div className={'flex-1 overflow-y-scroll flex-col scrollbar-thin scrollbar-thumb-accent scrollbar-track-background p-2'}>
        {messages.map(message => (
          <UserMessage currentUser={currentUser} message={message} user={user} key={message.id}/>
        ))}
        <div ref={ref}></div>
      </div>

      <ChatInput user={user} />
    </div>
  )
}