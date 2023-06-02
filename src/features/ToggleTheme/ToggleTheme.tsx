import {Sun, Moon, Laptop} from 'lucide-react'
import {
  Menubar,
  MenubarTrigger,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarSeparator
} from "@/shared/ui/menubar.tsx";
import {useEffect, useState} from "react";

export const ToggleTheme = () => {
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<'light'|'dark'| 'system'>(
    //@ts-ignore
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
  );
  const onWindowMatch = () => {
    if(localStorage.theme === 'dark' || (!(theme in localStorage) && darkQuery.matches)) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }
  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark')
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        onWindowMatch()
        break;
    }
  }, [theme]);
  darkQuery.addEventListener('change', (e)=> {
    if(!('theme' in localStorage)) {
      if(e.matches) {
        element.classList.add('dark')
      } else {
        element.classList.remove('dark')
      }
    }
  })
  const setLightTheme = () => {
    setTheme('light')
  }
  const setDarkTheme = () => {
    setTheme('dark')
  }
  const setSystemPreferences = () => {
    setTheme('system')
  }
  return (
    <div className={'flex fixed bottom-8 right-6 cursor-pointer'}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Sun/>
          </MenubarTrigger>
          <MenubarContent side={'top'} align={'end'}>
            <MenubarItem onClick={setLightTheme}><Sun className={'mr-3'}/>Light</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={setDarkTheme}><Moon className={'mr-3'}/>Dark</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={setSystemPreferences}><Laptop className={'mr-3'}/>System</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
