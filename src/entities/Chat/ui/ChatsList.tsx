import {useAppDispatch, useAppSelector} from "@/shared/model";
import {useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {fireDb} from "@/app/firebaseConfig";
import {setUserChats} from "@/entities/Chat";
import {UserCard} from "@/entities/User";

export const ChatList = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.authSlice.authData);
  const userChats = useAppSelector(state => state.chatSlice.userChats);
  useEffect(() => {
    const unsub = onSnapshot(doc(fireDb, 'userChats', authData?.uid as string), (doc) => {
      if(doc.exists()) {
        const data = doc.data()
        dispatch(setUserChats(data))
      }
    })
    return () => {
      unsub()
    }

  }, [])
  return <>
    {Object.entries(userChats).sort((a, b) => b[1].date.seconds - a[1].date.seconds).map(chat => {
      return <UserCard key={chat[0]} chat={chat[1]} chatId={chat[0]}/>
    })}
  </>
}