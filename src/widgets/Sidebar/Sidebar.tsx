import {AlignJustify} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/shared/ui/sheet.tsx';
import {Button} from "@/shared/ui/button.tsx";
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {Avatar, AvatarImage, AvatarFallback} from "@/shared/ui/avatar.tsx";
import {signOut} from 'firebase/auth';
import {fireAuth} from '@/app/firebaseConfig';
import {Skeleton} from '@/shared/ui/skeleton.tsx';
import {ScrollArea} from "@/shared/ui/scroll-area.tsx";
import {UserSearchCard} from "@/entities/User";
import {SearchBar} from "@/features/SearchUser";
import {useState} from "react";
import {User} from "@/app/globalTypes.ts";
import {Separator} from "@/shared/ui/separator.tsx";
import {ChatList, removeUserChats, removeChatWithUser} from "@/entities/Chat";
import {logOutUser} from '@/features/Auth';

export const Sidebar = () => {
  const currentUser = useAppSelector(state => state.authSlice.currentUser);
  const [searchUsers, setSearchUsers] = useState<User[]>([]);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    dispatch(removeChatWithUser());
    dispatch(removeUserChats());
    signOut(fireAuth);
  }
   return (
    <div className={'red flex flex-col h-full border-r'}>
      <div className={'p-2 flex items-center gap-2'}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'secondary'} className={'p-2'}>
              <AlignJustify size={'36'}/>
            </Button>
          </SheetTrigger>
          <SheetContent position={'left'} size={'content'}>
            <SheetHeader className={'mb-8'}>
              <SheetTitle className={'flex justify-center'}>
                  <Avatar className={'h-24 w-24'}>
                    <AvatarImage className={'object-cover'} src={currentUser?.photoUrl} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
              </SheetTitle>
              <SheetTitle className={'text-center min-w-[270px]'}>
                {!currentUser?.firstName ?
                  <Skeleton className={'h-7'}></Skeleton>
                  :
                  <>
                    <span className={'inline-block first-letter:uppercase'}>{currentUser?.firstName}</span>&nbsp;
                    <span className={'inline-block first-letter:uppercase'}>{currentUser?.lastName}</span>
                  </>
                }
              </SheetTitle>
              <SheetDescription className={'text-center'}>
                {!currentUser?.email ?
                  <Skeleton className={'h-5'}></Skeleton>
                  :
                  <span>{currentUser.email}</span>
                }
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button className={'w-full'} onClick={logOut}>Sign out</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <SearchBar setSearchUser={setSearchUsers} />
      </div>
      <ScrollArea className={'pr-2 pb-2 pl-2'}>
        {!!searchUsers.length && <div>
          <p className={'mb-1'}>Search Result:</p>
          <div>
            {searchUsers.map(user => <UserSearchCard key={'searchUser'+user.uid} user={user}/>)}
              <Separator className={'mb-2'} />
          </div>
        </div>}
        <ChatList/>
      </ScrollArea>
    </div>
  );
};

