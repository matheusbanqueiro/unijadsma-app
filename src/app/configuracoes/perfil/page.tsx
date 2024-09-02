"use client";

import CustomTabs from "@/components/custom-tabs";
import Loading from "@/components/loading";
import AdminTheme from "@/components/themes/layout/admin-theme";
import { useAuth } from "@/contexts/useAuth";
import { MapPinIcon, User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const tabs = [
    {
      name: "Perfil",
      href: "/configuracoes/perfil",
      icon: User,
      current: false,
      coming: false,
    },
    {
      name: "Administradores",
      href: "/configuracoes/administradores",
      icon: MapPinIcon,
      current: false,
      coming: false,
    }
  ];

  if (!user) return <Loading />

  return (
    <AdminTheme>
      <CustomTabs tabs={tabs} />

    </AdminTheme>
  );
}
export default Profile;