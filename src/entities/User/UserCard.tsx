import {Chat} from "@/app/globalTypes.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar.tsx";
import moment from 'moment';
import {setChatWithUser} from '@/entities/Chat';
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {cn} from "@/shared/lib";

type UserCardType = {
  chat: Chat
  chatId: string
}
export const UserCard = ({chat, chatId}:UserCardType) => {
  const dispatch = useAppDispatch();
  const time = moment(chat.date.seconds * 1000).fromNow();
  const userUid = useAppSelector(state => state.chatSlice.user?.uid);

  const handleSelectChat = () => {
    dispatch(setChatWithUser({user: chat.userInfo, chatId: chatId}))
  }
  return (
    <div
      onClick={handleSelectChat}
      className={cn('p-1 cursor-pointer rounded border h-16 bg-background mb-2 flex gap-2 items-center', userUid === chat.userInfo.uid && 'bg-accent')}
    >
      <Avatar className={'h-12 w-12 '}>
        <AvatarImage className={'object-cover'} src={chat.userInfo.photoUrl} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className={'h-full flex flex-col w-full justify-between'}>
        <div className={'flex justify-between max-w-[189px] '}>
          <span className={'text-sm  whitespace-nowrap overflow-hidden overflow-ellipsis'}>
            <span className={'inline-block first-letter:uppercase'}>{chat.userInfo.firstName}</span>&nbsp;
            <span className={'inline-block first-letter:uppercase'}>{chat.userInfo.lastName}</span>
          </span>
          <span className={'text-[12px] text-gray-500 whitespace-nowrap'}>{time}</span>
        </div>
        {
          chat.lastMessage?.message && <div className={'text-sm text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[189px] '}>
            {chat.lastMessage?.message} 
            </div>
        }
      </div>
    </div>
  );
};
