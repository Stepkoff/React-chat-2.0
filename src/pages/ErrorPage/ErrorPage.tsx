import {Button} from "@/shared/ui/button.tsx";
import {Link} from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className={'grid place-items-center'}>
      <div className={'bg-background py-6 px-12 rounded-2xl border shadow-3xl flex flex-col'}>
        <span className={'text-7xl mb-6 text-center'}>404</span>
        <span className={'text-3xl mb-6'}>Page is not found</span>
        <Link to={'/'}>
          <Button className={'w-full'}>
            Back to main page
          </Button>
        </Link>
      </div>
    </div>
  );
};
