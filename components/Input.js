import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { disabled = false, className, isInvalid = false, ...props },
  ref
) {
  return (
    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
      <input
        ref={ref}
        disabled={disabled}
        className={`${className} bg-transparent pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none transition ${
          isInvalid ? "border-red-400" : ""
        }`}
        {...props}
      />
    </div>
  );
});

export default Input;
