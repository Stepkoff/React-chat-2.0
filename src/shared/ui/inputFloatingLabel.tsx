import React from "react";

import { cn } from "@/shared/lib/utils.ts"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  id: string
  label: string
}

const InputFloatingLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
      <div className={'relative'}>
        <input
          type={type}
          className={cn("flex text-md h-10 w-full rounded-md border-2 border-input bg-transparent px-3 py-2 ring-offset-background file:text-background file:border-0 file:bg-foreground file:text-sm file:rounded file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer", className)
          }
          id={id}
          placeholder={' '}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={'tracking-wider bg-background pointer-events-none absolute text-md text-gray-700 duration-200 transform -translate-y-4 scale-[.80] top-1 z-1 origin-[0]  px-1 peer-focus:px-1 dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-4 left-3 '}
        >
          {label}
        </label>
      </div>

    )
  }
)
InputFloatingLabel.displayName = "Input"

export { InputFloatingLabel }
