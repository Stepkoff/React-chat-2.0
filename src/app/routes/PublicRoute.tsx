import {Navigate} from "react-router-dom";
import {useAppSelector} from "@/shared/model";

type PublicRouteProps = {
  children: JSX.Element
}
// export const PublicRoute = ({children}:PublicRouteProps) => {
//   const authData = useAppSelector(state => state.authSlice.authData);
//   const location = useLocation();
//   const url = new URLSearchParams(location.search.slice(1));
//   return authData ? <Navigate to={url.get('redirect') || '/'}/> : children
// };

export const PublicRoute = ({children}:PublicRouteProps) => {
  const authData = useAppSelector(state => state.authSlice.authData);
  return authData ? <Navigate to={'/'}/> : children
};