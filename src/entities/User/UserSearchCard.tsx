import {User} from "@/app/globalTypes.ts";
import {Avatar, AvatarImage, AvatarFallback} from "@/shared/ui/avatar.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {handleAddUser} from "@/features/AddUser";
import {useAppSelector} from "@/shared/model";
import {useEffect, useState} from "react";
import {doc, getDoc} from 'firebase/firestore';
import {fireDb} from "@/app/firebaseConfig";

type UserSearchCardProps = {
  user: User
}
export const UserSearchCard = ({user}:UserSearchCardProps) => {
  const [isFriend, setIsFriend] = useState<boolean>(true);
  const currentUser = useAppSelector(state => state.authSlice.currentUser);

  useEffect(() => {
    //@ts-ignore
    const combinedId = currentUser?.uid > user.uid ? currentUser?.uid + user.uid : user.uid + currentUser?.uid;
    getDoc(doc(fireDb, 'chats', combinedId))
      .then(data => {
        if(data.data()) {
          setIsFriend(true)
        } else {
          setIsFriend(false)
        }
      })
  }, [])

  const handleAdd = () => {
    handleAddUser(currentUser as User, user)
    setIsFriend(true)
  }
  if(isFriend) return null
  return (
    <div className={'p-1 rounded border h-16 bg-background mb-2 flex gap-4 items-center'}>
      <Avatar className={'h-12 w-12'}>
        <AvatarImage className={'object-cover '} src={user.photoUrl} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className={'h-full flex-1 '}>
        <p className={'flex flex-col '}>
          <span className={'first-letter:uppercase inline-block'}>{user.firstName}</span>
          <span className={'first-letter:uppercase inline-block'}>{user.lastName}</span>
        </p>
      </div>
      <div>
         <Button onClick={handleAdd} className={'p-2'}>Add</Button>
      </div>
    </div>
  );
};
