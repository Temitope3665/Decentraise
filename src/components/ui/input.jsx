/* eslint-disable react/prop-types */
import * as React from "react"

import { cn } from "../../../src/utils"

const Input = React.forwardRef(({ className, error, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-text-fuchsia-500 px-3 py-2 text-sm ring-o file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus:ring-1 focus-visible:ring-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 bg-[#2D293A]",
        error &&
        'border-error outline-error outline border-[0.5px]',
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
