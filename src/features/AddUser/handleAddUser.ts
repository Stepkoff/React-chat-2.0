import {User} from "@/app/globalTypes.ts";
import {setDoc, doc, updateDoc} from "firebase/firestore";
import {fireDb} from "@/app/firebaseConfig";


export const handleAddUser = async (currentUser: User, friend: User) => {
  const combinedId = currentUser.uid > friend.uid ? currentUser.uid + friend.uid : friend.uid + currentUser.uid;
  try {
    await setDoc(doc(fireDb, 'chats', combinedId), {
      messages: [],
    });
    updateDoc(doc(fireDb, 'userChats', currentUser.uid), {
      [combinedId+'.date']: new Date(),
      [combinedId+'.userInfo']: friend,
    });
    updateDoc(doc(fireDb, 'userChats', friend.uid), {
      [combinedId+'.date']: new Date(),
      [combinedId+'.userInfo']: currentUser,
    });
  } catch (err) {
    console.log(err)
  }
}