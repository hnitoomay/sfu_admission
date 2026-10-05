import { ReactNode } from "react";

export default function RootBgLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-cover bg-no-repeat md:bg-[url('/img/auth/graduation.webp')] sm:bg-[url('/img/auth/graduation-mobile.png')] flex items-center justify-center">
        <div className="flex w-full md:h-5/6 items-center justify-center bg-black-100/60">
          <div className="flex justify-center self-center sm:px-4 w-10/12 sm:py-10 md:py-52">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
