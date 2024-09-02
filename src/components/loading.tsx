"use client";
import Image from "next/image";
import { memo } from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow bg-slate-900/20"></div>
      <div className="fixed top-0 left-0 z-50 flex w-full h-full grow">
        <div className={`flex gap-2 w-full h-full items-center justify-center z-50 relative`}>
          <Image priority={true} src="/assets/brand/u-primary.svg" alt="Logo de carregamento" width={500} height={500} className="w-40 h-40 animate-pulse" />
        </div>
      </div>
    </>
  )
};

export default memo(Loading);