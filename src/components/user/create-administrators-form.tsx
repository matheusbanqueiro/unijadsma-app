"use client"
import { memo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAdministratorsSchema, type RegisterAdministratorsSchemaFormProps } from "@/validations/user-validate";
import { ValidateInput } from "../validate-input";
import { useAuth } from "@/contexts/useAuth";


const AdministratorsCreateForm = () => {

  const { adminStore } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterAdministratorsSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(RegisterAdministratorsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  const handleRegisteradministrators = async (data: RegisterAdministratorsSchemaFormProps) => {
    const response = await adminStore(data);
  };

  return (
    <div>
      
      <Dialog>
        <DialogTrigger >
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            <p>Adicionar Novo</p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo Administrador(a)</DialogTitle>
          </DialogHeader>
          <ValidateInput
            {...register("name")}
            errorMessage={errors.name?.message}
            placeholder="Digite o nome"
            className="w-full"
          />
          <ValidateInput
            {...register("email")}
            errorMessage={errors.email?.message}
            placeholder="Digite o email"
            className="w-full"
          />
          <ValidateInput
            {...register("password")}
            type="password"
            errorMessage={errors.password?.message}
            placeholder="Digite a senha"
            className="w-full"
          />
          <Button
            variant="default"
            className="w-full py-2 px-4 font-bold mt-4 bg-grenadier-600 text-white rounded hover:bg-grenadier-700 focus:outline-none focus:ring-2 focus:ring-grenadier-500"
            onClick={handleSubmit(handleRegisteradministrators)}
          >
            Finalizar
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  );
};
export default memo(AdministratorsCreateForm);