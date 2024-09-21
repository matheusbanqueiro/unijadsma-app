"use client"
import { memo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAdministratorsSchema, type RegisterAdministratorsSchemaFormProps } from "@/validations/user-validate";
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
    resolver: zodResolver(registerAdministratorsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: ""
    },
  });

  const handleRegisteradministrators = async (data: RegisterAdministratorsSchemaFormProps) => {
    const response = await adminStore(data);
  };

  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger>
          <Button className="gap-2 rounded-full">
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
            {...register("phone")}
            errorMessage={errors.phone?.message}
            placeholder="Digite o telefone"
            maxLength={11}
            className="w-full"
          />
          <ValidateInput
            {...register("password")}
            type="password"
            errorMessage={errors.password?.message}
            placeholder="Digite a senha"
            className="w-full"
          />

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                variant="default"
                className=""
                onClick={handleSubmit(handleRegisteradministrators)}
              >
                Finalizar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};
export default memo(AdministratorsCreateForm);