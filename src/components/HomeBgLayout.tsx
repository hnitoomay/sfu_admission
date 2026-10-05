import { ReactNode } from "react";
import HomeCard from "./HomeCard";

export default function HomeBgLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-cover bg-no-repeat md:bg-[url('/img/auth/authbg-update-2.jpg')] sm:bg-[url('/img/auth/authbg-mobile-update.png')] sm:h-[400px] md:h-auto">
        <div className="flex w-full sm:h-full md:h-5/6 items-center justify-center bg-black-100/60">
          <div className="box-border flex w-full max-w-[1440px] justify-center self-center px-4 py-10 md:w-10/12 md:p-16">
            {children}
          </div>
        </div>
      </div>

      <HomeCard />
    </>
  );
}
