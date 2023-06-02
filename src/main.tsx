import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppEntry} from './app/AppEntry.tsx';
import {Provider} from "react-redux";
import './index.css'
import {store} from "@/app/appStore.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppEntry />
    </Provider>
  </React.StrictMode>,
)

