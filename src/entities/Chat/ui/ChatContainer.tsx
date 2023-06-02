import { useAppSelector} from "@/shared/model";
import {Messages} from "@/entities/Chat";

export const ChatContainer = () => {
  const {isSelected} = useAppSelector(state => state.chatSlice);
  if(isSelected) return <Messages/>
  return (
    <div className={'w-full flex items-center justify-center'}>
      Select chat to start messaging
    </div>
  )
};





