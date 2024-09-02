"use client";

import { memo } from "react";
import Link from "next/link";
import { LayoutDashboard, UserPen, LogOut } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/useAuth";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Loading from "@/components/loading";

const Menu = ({ showMenu = false }) => {
  const { logout, user } = useAuth();

  const menu = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      link: "/dashboard",
      coming: false,
    },
    {
      icon: UserPen,
      name: "Cadastros",
      link: "/cadaster",
      coming: false,
    }
  ];

  const shortcuts = [
    {
      name: "Configurações",
      link: "/configuracoes",
    },
    {
      name: "Assinatura",
      link: "/assinatura",
    },
    {
      name: "Perfil",
      link: "/perfil",
    },
  ];

  const pathname = usePathname();

  if (!user) return <Loading />

  return (
    <>
      <div
        className={`w-72 h-screen z-10 hidden absolute top-0 left-0 md:relative md:block ${showMenu ? "" : "hidden"
          }`}
      >
        <div>
          <div className="h-24 items-center justify-center flex">
            <Image
              src="/assets/brand/uni-secondary.svg"
              alt="Logo Unijadsma"
              width={600}
              height={600}
              className="w-[130px]"
            />
          </div>

          <div className="flex flex-col gap-2 pl-4 pr-8">
            {menu.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={`inline-flex items-center px-4 py-3 transition duration-300 ease-in-out relative rounded-full hover:text-white hover:bg-white/15 ${pathname === item.link
                  ? "bg-white/15 text-white"
                  : "text-white/80"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 ${pathname === item.link
                    ? ""
                    : ""
                    }`}
                />
                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-semibold ml-2 ${item.coming ? "line-through" : ""
                      } ${pathname === item.link
                        ? ""
                        : ""
                      }`}
                  >
                    {item.name}
                  </span>
                </div>

              </Link>
            ))}
          </div>
        </div>

        <Link href="/configuracoes/perfil" className="flex flex-col gap-5 pl-4 pr-8 mt-20 hover:opacity-80">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback className="text-white">{user.avatar}</AvatarFallback>
            </Avatar>
            <h3 className="text-xs text-white font-semibold">
              {user.name}
            </h3>
          </div>

          <button className="gap-2 flex transition duration-300 ease-in-out hover:text-white text-grenadier-900 font-semibold text-sm" onClick={() => logout()}>
            <LogOut className="w-5 h-5" />
            <h3>Sair</h3>
          </button>
        </Link>

      </div>
    </>
  );
};

export default memo(Menu);
