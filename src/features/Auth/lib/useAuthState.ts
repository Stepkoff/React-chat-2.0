import {useEffect, useState} from "react";
import {useAppDispatch} from "@/shared/model";
import {onAuthStateChanged} from "firebase/auth";
import {setAuthData} from '../';
import {fireAuth} from "@/app/firebaseConfig";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(fireAuth, (user) => {
      setIsLoading(true);
      if(user) {
        dispatch(setAuthData({
          email: user.email as string,
          uid: user.uid as string,
        }));
      } else {
        dispatch(setAuthData(null));
      }
      setIsLoading(false);
    });
  }, []);

  return {isLoading}
};
