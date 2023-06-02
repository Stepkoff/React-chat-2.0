import {Input} from "@/shared/ui/input.tsx";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from 'firebase/firestore';
import {fireDb} from "@/app/firebaseConfig";
import {User} from "@/app/globalTypes.ts";
import {X} from 'lucide-react';
import {useAppSelector} from "@/shared/model";

type SearchBarProps = {
  setSearchUser: React.Dispatch<React.SetStateAction<User[]>>
}
export const SearchBar = ({setSearchUser}:SearchBarProps) => {
  const [userName, setUserName] = useState('');
  const currentUser = useAppSelector(state => state.authSlice.currentUser);
  const userChats = useAppSelector(state => state.chatSlice.userChats);

  const handleSearch = async() => {
    if(!userName) return
    const searchName = userName.toLowerCase();
    const usersRef = collection(fireDb, 'users');

    // const q = query(usersRef, or(
    //   where('firstName', '==', userName.toLowerCase()),
    //   where('lastName', '==', userName.toLowerCase()),
    // ));

    const q1 = query(usersRef,
      where('firstName', '>=', searchName),
      where('firstName', '<', searchName + 'z'),
    );
    const q2 = query(usersRef,
      where('lastName', '>=', searchName),
      where('lastName', '<', searchName + 'z'),
    );
    try {
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
      querySnapshot1.forEach((doc) => {
        const user = doc.data() as User
        if(user.uid !== currentUser?.uid && !Object.values(userChats).find(el => el.userInfo.uid === user.uid)) {
          setSearchUser(prevState => [...prevState, user])
        }
      });
      querySnapshot2.forEach((doc) => {
        const user = doc.data() as User;
        if(user.uid !== currentUser?.uid && !Object.values(userChats).find(el => el.userInfo.uid === user.uid)) {
          setSearchUser((prevState) => {
            const existingObject = prevState.find((obj) => obj.uid ===user.uid);
            if(existingObject) return prevState;
            return [...prevState, user]
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchUser([])
      handleSearch();
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [userName])

  return (
    <div className={'flex-1 relative'}>
      <Input value={userName} onChange={(e) => setUserName(e.target.value)} type={'text'} />
      {userName && <button onClick={() => setUserName('')} className={'absolute top-2 right-2'}><X/></button>}
    </div>
  );
};
