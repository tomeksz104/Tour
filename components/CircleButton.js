"use client";

const CircleButton = ({ onClick, className, children, ariaLabel = null }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-full p-1.5 shadow-sm duration-300 hover:scale-110 pointer-events-auto ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
export default CircleButton;
