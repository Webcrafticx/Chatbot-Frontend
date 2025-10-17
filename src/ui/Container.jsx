import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`max-w-[1511px] mx-auto px-[clamp(20px,7vw,110px)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
