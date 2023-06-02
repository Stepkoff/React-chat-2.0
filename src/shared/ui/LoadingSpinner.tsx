
export const LoadingSpinner = () => {
  return (
    <div className={'absolute z-40 top-0 left-0 right-0 bottom-0 grid place-items-center bg-[rgba(162,158,158,0.3)]'}>
      <div className={'w-[100px] h-[100px] border-[10px] border-solid border-gray-400 rounded-full border-t-stone-800 animate-spin'}></div>
    </div>
  );
};

