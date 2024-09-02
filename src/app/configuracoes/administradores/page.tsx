"use client";

import CustomTabs from "@/components/custom-tabs";
import Loading from "@/components/loading";
import AdminTheme from "@/components/themes/layout/admin-theme";
import { useAuth } from "@/contexts/useAuth";
import { MapPinIcon, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AdministratorsCreateForm from "@/components/user/create-administrators-form";
import { useCallback, useEffect, useState } from "react";
import type { AdministratorsInterface } from "@/interfaces/administrators-interface";

const RegisterUser = () => {
  const { user, adminList } = useAuth();
  const [admin, setAdmin] = useState<AdministratorsInterface>();

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

  const handleGetAdmin = useCallback(async () => {
    if (!user) return;
    const response = await adminList();

    if (response) {
      setAdmin(response);
    }
  }, [user, adminList, setAdmin]);

  useEffect(() => {
    handleGetAdmin();
  }, [handleGetAdmin]);

  if (!user || !admin) return <Loading />

  return (
    <AdminTheme>
      <CustomTabs tabs={tabs} />
      <AdministratorsCreateForm />
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell className="text-right">Visualizar</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </AdminTheme>
  );
}
export default RegisterUser;