import {User} from "@/app/globalTypes.ts";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {Input} from "@/shared/ui/input.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {Image, X} from 'lucide-react';
import {useAppSelector} from "@/shared/model";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {fireDb, fireStorage} from "@/app/firebaseConfig";
import {updateDoc, doc, arrayUnion} from 'firebase/firestore';
import {v4 as uuid} from 'uuid';

export const ChatInput = ({user}: {user: User | null}) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const authData = useAppSelector(state => state.authSlice.authData);
  const chatId = useAppSelector(state => state.chatSlice.chatId);

  useEffect(() => {
    setMessage('');
    setFile(null);
    if(fileRef.current) fileRef.current.value='';
  }, [user]);

  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault()
    if(!file && !message) return
    if(file) {
      const storageRef = ref(fireStorage, uuid());
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(fireDb, 'chats', chatId as string), {
        messages: arrayUnion({
          id: uuid(),
          message: message,
          senderId: authData?.uid,
          date: new Date(),
          img: downloadUrl,
        })
      });
    } else {
      await updateDoc(doc(fireDb, 'chats', chatId as string), {
        messages: arrayUnion({
          id: uuid(),
          message: message,
          senderId: authData?.uid,
          date: new Date(),
        })
      });
    }
    await updateDoc(doc(fireDb, "userChats", authData?.uid as string), {
      [chatId + '.lastMessage'] :{
        message,
      },
      [chatId + '.date']: new Date()
    });
    await updateDoc(doc(fireDb, "userChats", user?.uid as string), {
      [chatId + '.lastMessage'] :{
        message,
      },
      [chatId + '.date']: new Date()
    });
    setMessage('');
    setFile(null);
    if(fileRef.current) fileRef.current.value='';
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  }

  const handleRemoveImage = () => {
    setFile(null);
    if(fileRef.current) fileRef.current.value='';
  }

  return (
    <form className={'p-2 border flex-col flex gap-2'} onSubmit={handleSubmit}>
      {file && <div className={'flex'}>
          <div className={'relative'}>
              <img src={URL.createObjectURL(file)} className={'w-24 h-24 object-cover'} alt="userPicture"/>
              <div
                  className={'absolute cursor-pointer bg-background rounded h-6 w-6 right-1 top-1 z-10 grid place-items-center'}
                  onClick={handleRemoveImage}
              >
                  <X className={'text-primary h-5'}/>
              </div>
          </div>
      </div>}
      <div className={'flex gap-2'}>
        <div className={'flex-col flex-1 relative'}>
          <Input className={'pr-[45px]'} value={message} onChange={(e) => setMessage(e.target.value)} />
          <input
            id={'file'}
            type={'file'}
            ref={fileRef}
            onChange={handleChangeFile}
            className={'hidden'}
          />
          <label
            htmlFor="file"
            className={'absolute top-1 right-1 text-accent-foreground'}
          >
            <Image className={'h-8 w-8'}/>
          </label>
        </div>
        <Button type={'submit'} >Send</Button>
      </div>
    </form>
  )
}
