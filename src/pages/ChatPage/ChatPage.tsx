import {useEffect} from "react";
import {onSnapshot, doc} from 'firebase/firestore';
import {Navigate} from "react-router-dom";
import {setCurrentUser} from '@/features/Auth';
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {Sidebar} from "@/widgets/Sidebar";
import {cn} from "@/shared/lib";
import {ChatContainer} from "@/entities/Chat";
import {fireDb} from "@/app/firebaseConfig";

export const ChatPage = () => {
  const dispatch = useAppDispatch();
  const {isSelected} = useAppSelector(state => state.chatSlice);
  const authData = useAppSelector(state => state.authSlice.authData);
  useEffect(() => {
    const unsub = onSnapshot(doc(fireDb, 'users', authData?.uid as string), (doc) => {
      const data = doc.data()
      if(data) {
        dispatch(setCurrentUser({
          email: data.email,
          uid: data.uid,
          photoUrl: data.photoUrl,
          firstName: data.firstName,
          lastName: data.lastName
        }));
      }
    });
    return () => unsub();
  }, [])
  if(!authData) return <Navigate to={'/signIn'}/>
  return (
    <div className={'bg-background mx-auto overflow-hidden rounded-2xl max-w-[1200px] w-full shadow-3xl dark:shadow-accent border border-foreground flex h-[480px] xl:h-[600px]'}>
      <div className={cn('md:max-w-[280px] flex-auto', isSelected ? 'hidden md:block' : null)}>
        <Sidebar/>
      </div>
      <div className={cn('md:flex flex-auto hidden text-xl', isSelected ? 'flex': null)}>
        <ChatContainer/>
      </div>
    </div>
  );
};
