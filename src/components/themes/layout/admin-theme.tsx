"use client";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/contexts/useAuth";
import Loading from "../../loading";
import Menu from "../menu/menu";

interface AdminThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AdminTheme = ({ children, ...rest }: AdminThemeProps) => {
  const { user } = useAuth();

  if (!user) <Loading />;

  return (
    <div
      {...rest}
      className={twMerge(
        "flex flex-row w-full h-screen overflow-hidden bg-grenadier-600 p-2",
        rest.className
      )}
    >
      <Menu />
      <div className="flex shadow-lg flex-col items-center w-full h-full overflow-auto px-8 pt-8 pb-10 bg-white rounded-3xl">
        <div className="sm:max-w-2xl lg:max-w-full w-full grow">{children}</div>
      </div>
    </div>
  );
};

export default memo(AdminTheme);
