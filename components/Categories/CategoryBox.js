import React from "react";

const CategoryBox = ({ icon, title, color }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 transition cursor-pointer group ${color[0]} hover:${color[1]}`}
    >
      {React.cloneElement(icon, {
        className: ` h-5 w-5`,
      })}
      <div className="text-xs">{title}</div>
    </div>
  );
};

export default CategoryBox;
// ${selected ? "border-b-neutral-800" : "border-transparent"}
// ${selected ? "text-neutral-800" : "text-neutral-500"}
