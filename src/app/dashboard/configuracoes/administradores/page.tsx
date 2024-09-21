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
import { Avatar } from "@/components/ui/avatar";

const RegisterUser = () => {
  const { user, adminList } = useAuth();
  const [admin, setAdmin] = useState<AdministratorsInterface[]>([]);

  const tabs = [
    {
      name: "Perfil",
      href: "/dashboard/configuracoes/perfil",
      icon: User,
      current: false,
      coming: false,
    },
    {
      name: "Administradores",
      href: "/dashboard/configuracoes/administradores",
      icon: MapPinIcon,
      current: false,
      coming: false,
    }
  ];

  const handleGetAdmin = useCallback(async () => {
    if (!user) return;

    const response = await adminList();

    if (response) {
      setAdmin(Array.isArray(response) ? response : [response]);
    }
  }, [user, adminList]);

  useEffect(() => {
    handleGetAdmin();
  }, [handleGetAdmin]);


  if (!user) return <Loading />

  return (
    <AdminTheme>
      <CustomTabs tabs={tabs} />
      <AdministratorsCreateForm />
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admin.map((administrator) => (
            <TableRow key={administrator.uuid}>
            <TableCell className="">
              <Avatar className="bg-grenadier-600 text-white justify-center items-center">
                {administrator.avatar}
              </Avatar>
            </TableCell>
            <TableCell>{administrator.name}</TableCell>
            <TableCell>{administrator.email}</TableCell>
            <TableCell>{administrator.phone}</TableCell>
            <TableCell className="text-right">Visualizar</TableCell>
          </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </AdminTheme>
  );
}

export default RegisterUser;
