import {cn} from "@/shared/lib";
import {Dialog, DialogContent, DialogTrigger} from "@/shared/ui/dialog.tsx";
import moment from "moment/moment";
import {Message, User} from "@/app/globalTypes.ts";

interface UserMessageProps {
  message: Message
  user: User | null
  currentUser: User | null
}

export const UserMessage = ({message, user, currentUser}:UserMessageProps) => {
  const owner = message.senderId === currentUser?.uid;
  return (
    <div className={cn('relative mb-8 flex gap-3', owner ? 'flex-row-reverse' : 'flex-row')}>
      <div className={'w-12 h-12 flex-shrink-0'}>
        <img className={'h-12 w-12 object-cover rounded-full'} src={currentUser?.uid === message.senderId ? currentUser.photoUrl : user?.photoUrl} alt=""/>
      </div>
      <div className={cn('bg-accent flex flex-col gap-2 p-2', owner ? 'rounded-b rounded-tl' : 'rounded-b rounded-tr')}>
        {message.message && <div className={'max-w-2xl text-base'}>{message.message}</div>}
        {message.img && <div className={cn('flex', owner ? 'justify-end' : 'justify-start')}>
            <Dialog>
                <DialogTrigger><img className={'h-16 w-16 object-cover'} src={message.img} alt=""/></DialogTrigger>
                <DialogContent className={'flex justify-center'}>
                    <img className={' max-w-[400px] w-full'} src={message.img} alt=""/>
                </DialogContent>
            </Dialog>

        </div>}
      </div>
      <div className={cn('text-[12px] text-gray-500 absolute', owner ? '-bottom-6 right-16': '-bottom-6 left-16')}>
        {moment(message.date.seconds * 1000).isSame(new Date(), 'day') ?
          moment(message.date.seconds * 1000).fromNow()
          :
          moment(message.date.seconds * 1000).format('DD-MM-YYYY')
        }
      </div>
    </div>
  )
}