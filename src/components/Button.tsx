import React from "react";
import { classNames } from "../lib/helper";

interface ButtonParams {
  children: JSX.Element | string;
  type?: "button" | "submit" | "reset";
  samePadding?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function MainButton({
  children,
  type = "button",
  samePadding = false,
  secondary = false,
  tertiary = false,
  onClick,
  className,
}: ButtonParams) {
  let buttonStyle =
    "sm:w-full md:w-2/5 text-white-100 bg-primary font-medium rounded-lg sm:text-base md:text-xl px-5 sm:p-2.5 md:py-2.5";

  if (secondary) {
    buttonStyle =
      "sm:w-full md:w-2/5 text-white-100 bg-gray-800 font-medium rounded-lg sm:text-base md:text-xl px-5 sm:p-2.5 md:py-2.5";
  }

  if (tertiary) {
    buttonStyle =
      "sm:w-full md:w-2/5 text-gray-800 bg-white-100 border border-gray-800 font-medium rounded-lg sm:text-base md:text-xl px-5 sm:p-2.5 md:py-2.5";
  }

  if (samePadding) {
    buttonStyle = classNames(buttonStyle, "px-2.5");
  }

  buttonStyle = classNames(
    buttonStyle,
    className
      ? className
      : "transition-colors duration-300"
  );

  return (
    <button type={type} onClick={onClick} className={buttonStyle}>
      {children}
    </button>
  );
}
