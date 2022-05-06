import clsx from "clsx";
import React from "react";

const Title = ({ children, className = "" }) => {
  return (
    <div className="flex items-center">
      <div className="border-b border-white border-opacity-30 flex-1" />
      <h1 className={clsx(className, "px-3")}>{children}</h1>
      <div className="border-b border-white border-opacity-30 flex-1" />
    </div>
  );
};

export default Title;
