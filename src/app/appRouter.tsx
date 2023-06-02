import {createBrowserRouter, Navigate} from "react-router-dom";
import {AppLayout} from "@/app/AppLayout.tsx";
import {PrivateRoute} from "@/app/routes/PrivateRoute.tsx";
import {ChatPage} from "@/pages/ChatPage";
import {PublicRoute} from "@/app/routes/PublicRoute.tsx";
import {SignUpPage} from "@/pages/SignUpPage";
import {SignInPage} from "@/pages/SignInPage";
import {ErrorPage} from "@/pages/ErrorPage";

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <PrivateRoute>
          <ChatPage/>
        </PrivateRoute>
      },
      {
        path: '/signUp',
        element: <PublicRoute>
          <SignUpPage/>
        </PublicRoute>
      },
      {
        path: '/signIn',
        element: <PublicRoute>
          <SignInPage/>
        </PublicRoute>
      },
      {
        path: '*',
        element: <Navigate to={'/not-found-404'}/>
      },
      {
        path: '/not-found-404',
        element: <ErrorPage/>
      },
    ]
  },
]);
