import {Outlet} from 'react-router-dom';
import {ToggleTheme} from "@/features/ToggleTheme";
import {Footer} from "@/widgets/Footer";

export const AppLayout = () => {
  return (
    <>
      <main className={'min-h-section grid place-items-center px-2 py-2'}>
        <Outlet/>
      </main>
      <ToggleTheme/>
      <Footer/>
    </>
  );
};