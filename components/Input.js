import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { disabled = false, icon, className, isInvalid = false, ...props },
  ref
) {
  return (
    <div className="relative w-full flex items-center text-gray-400 focus-within:text-green-500">
      {icon && (
        <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700">
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

    // <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
    //   <input
    //     ref={ref}
    //     disabled={disabled}
    //     className={`${className} bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none transition ${
    //       isInvalid ? "border-red-400" : ""
    //     }`}
    //     {...props}
    //   />
    // </div>
  );
});

export default Input;
