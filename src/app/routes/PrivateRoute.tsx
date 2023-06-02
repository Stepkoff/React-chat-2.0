import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "@/shared/model";

type PrivateRouteProps = {
  children: JSX.Element,
}
export const PrivateRoute = ({children}:PrivateRouteProps) => {
  const authData = useAppSelector(state => state.authSlice.authData);
  const location = useLocation();
  const url = new URLSearchParams();
  url.set('redirect', location.pathname + location.search);
  return authData ? children : <Navigate to={{pathname: '/signIn', search: url.toString()}}/>
};

// export const PrivateRoute = ({children}:PrivateRouteProps) => {
//   const authData = useAppSelector(state => state.authSlice.authData);
//   return authData ? children : <Navigate to={'/signIn'}/>
// };