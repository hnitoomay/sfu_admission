import { ReactNode } from "react";
import { classNames } from "../lib/helper";

export default function AuthBgLayout({
  children,
  className,
  bgClassName,
}: {
  children: ReactNode;
  className?: string;
  bgClassName?: string;
}) {
  return (
    <div className="bg-cover bg-no-repeat sm:bg-[url('/img/auth/authbg-mobile.png')] md:bg-[url('/img/auth/authbg-update.png')]">
      <div
        className={classNames(
          bgClassName ? bgClassName : "",
          "flex w-full items-center justify-center bg-black-100/60 md:px-8 lg:px-18 xl:px-24 py-12"
        )}
      >
        <div
          className={classNames(
            className ? className : "",
            "rounded-xl bg-white-100 border border-gray-500/10 shadow-lg backdrop-blur-md"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
