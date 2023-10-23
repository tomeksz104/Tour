import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { disabled = false, icon, className, isInvalid = false, ...props },
  ref
) {
  return (
    <div className="relative w-full flex items-center text-gray-400 focus-within:text-green-500">
      {icon && (
        <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3">
          {icon}
        </span>
      )}

      <input
        ref={ref}
        disabled={disabled}
        className={`${className} outline-none w-full rounded-md border border-gray-200 py-2.5 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500
        ${icon ? "pl-14 pr-4" : "px-4"}
        ${isInvalid ? "ring-2 ring-red-400" : ""}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;
