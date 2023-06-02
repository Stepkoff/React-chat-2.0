import {RouterProvider} from 'react-router-dom';
import {LoadingSpinner} from "@/shared/ui/LoadingSpinner.tsx";
import {appRouter} from "@/app/appRouter.tsx";
import {useAuthState} from "@/features/Auth";

export const AppEntry = () => {
  const {isLoading} = useAuthState();
  if(isLoading) return <LoadingSpinner/>

  return (<RouterProvider router={appRouter}/>);
};




