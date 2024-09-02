import { cn } from "@/lib/utils";
import {
  ExclamationCircleIcon,
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface ValidateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  type?: string;
}

const ValidateInput = React.forwardRef<HTMLInputElement, ValidateInputProps>(
  ({ disabled = false, errorMessage, className, type, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);

    return (
      <div className="relative">
        <input
          disabled={disabled}
          type={inputType}
          className={cn(
            `flex h-10 w-full rounded-md bg-slate-50 ring-1 ring-grenadier-600 ring-offset-0 focus:outline-none focus:ring-2 ${
              errorMessage ? "ring-red-500/80" : "focus:ring-grenadier-600/80"
            }  px-3 py-2 text-sm text-brand-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400  disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {disabled && (
          <LockClosedIcon className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-400/50" />
        )}
        {errorMessage && (
          <ExclamationCircleIcon className="w-5 h-5 absolute right-4 top-2.5 text-red-500" />
        )}
        {errorMessage && (
          <div className="text-red-500 text-xs md:text-sm mt-1.5">
            {errorMessage}
          </div>
        )}
        {type === "password" && inputType === "password" && (
          <EyeIcon
            onClick={() => setInputType("text")}
            className={`w-5 h-5 absolute ${
              errorMessage ? "right-10" : "right-4"
            } top-2.5 text-neutral-600 cursor-pointer `}
          />
        )}
        {type === "password" && inputType === "text" && (
          <EyeSlashIcon
            onClick={() => setInputType("password")}
            className={`w-5 h-5 absolute  ${
              errorMessage ? "right-10" : "right-4"
            } top-2.5 text-neutral-600 cursor-pointer`}
          />
        )}
      </div>
    );
  }
);

ValidateInput.displayName = "ValidateInput";

export { ValidateInput };
