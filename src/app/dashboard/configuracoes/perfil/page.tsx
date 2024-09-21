"use client";

import CustomTabs from "@/components/custom-tabs";
import Loading from "@/components/loading";
import AdminTheme from "@/components/themes/layout/admin-theme";
import { Button } from "@/components/ui/button";
import { ValidateInput } from "@/components/validate-input";
import { useAuth } from "@/contexts/useAuth";
import { updateUserSchema, UpdateUserSchemaFormProps } from "@/validations/user-validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { MapPinIcon, User } from "lucide-react";
import { useEffect } from "react";
import UserPassowrdUpdateForm from "@/components/user/update-password-user-form";

const Profile = () => {
  const { user, userUpdate } = useAuth();
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
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  const handleUpdateUser = async (
    payload: UpdateUserSchemaFormProps
  ) => {
    if (!user) return;
    const response = await userUpdate(payload);

  };
  

  useEffect(() => {
    if (!user) return;
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
  }, [user, setValue]);

  if (!user) return <Loading />

  return (
    <AdminTheme>
      <CustomTabs tabs={tabs} />
      <main className="flex-col md:flex-row md:flex items-start gap-20 mt-20">
        <div className="w-fit bg-grenadier-600/80 py-20 px-16 rounded-full text-6xl fonte-bold text-white justify-start items-start">
          <Avatar className="">
            {user.avatar}
          </Avatar>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="gap-1 flex flex-col">
            <h1 className="font-semibold text-neutral-800">Informações Principais</h1>
            <h2 className="font-regular text-sm text-neutral-400">Estas informações são importantes para sua entrada no site.</h2>
          </div>
          <ValidateInput
            {...register("name")}
            errorMessage={errors.name?.message}
            placeholder="Digite o nome"
            className=""
          />
          <ValidateInput
            {...register("email")}
            errorMessage={errors.email?.message}
            placeholder="Digite o email"
            className=""
          />
          <ValidateInput
            {...register("phone")}
            errorMessage={errors.phone?.message}
            placeholder="Digite o telefone"
            maxLength={11}
            className=""
          />
          <div className="justify-end flex">
            <Button className="px-7" type="submit" onClick={handleSubmit(handleUpdateUser)}>
              Atualizar
            </Button>
          </div>
          <hr />
          <UserPassowrdUpdateForm />
        </div>
      </main>
    </AdminTheme>
  );
}
export default Profile;