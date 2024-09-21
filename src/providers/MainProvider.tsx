"use client";

import { AuthProvider } from "@/contexts/useAuth";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <>
      <NextTopLoader
        color="#c2d9f5"
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={false}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #e27c00,0 0 5px #e27c00"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <AuthProvider>
        {children}
      </AuthProvider>

    </>
  );
};

export default MainProvider;
