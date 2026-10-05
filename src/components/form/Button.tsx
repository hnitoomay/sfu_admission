import React from "react";
import { classNames } from "../../lib/helper";
interface ButtonParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  type?: "button" | "submit" | "reset";
  samePadding?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  quaternary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  type = "button",
  samePadding = false,
  primary = false,
  secondary = false,
  tertiary = false,
  quaternary = false,
  onClick,
  isDisabled,
  className,
}: ButtonParams) {
  let buttonStyle = classNames(
    className
      ? className
      : "w-full px-8 cursor-pointer text-white-100 bg-primary font-medium rounded-lg text-sm"
  );

  if (primary) {
    buttonStyle = "bg-primary text-white-100";
  }

  if (secondary) {
    buttonStyle = "bg-gray-800 text-white-100";
  }

  if (tertiary) {
    buttonStyle = "text-gray-800 bg-white-100 border border-gray-800";
  }

  if (quaternary) {
    buttonStyle = "bg-black-100 text-white-100";
  }

  if (samePadding) {
    buttonStyle = classNames(buttonStyle, "px-2.5");
  }

  if (isDisabled) {
    buttonStyle = "w-full bg-gray-100 text-white-100";
  }

  buttonStyle = classNames(
    buttonStyle,
    className ? className : "",
    "transition-colors duration-300"
  );

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={buttonStyle}
    >
      {children}
    </button>
  );
}
