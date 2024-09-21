"use client"
import { memo, useCallback } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPasswordSchema, type UpdateUserPasswordSchemaFormProps } from "@/validations/user-validate";
import { ValidateInput } from "../validate-input";
import { useAuth } from "@/contexts/useAuth";


const UserPassowrdUpdateForm = () => {
  const { userUpdatePassword } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUserPasswordSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: ""
    },
  });

  const handleUpdatePasswordUser = async (data: UpdateUserPasswordSchemaFormProps) => {
    const response = await userUpdatePassword(data);
  };

  return (
    <main className="flex-col md:flex-row md:flex items-center gap-20">
      <div className="flex flex-col gap-4 flex-1">
        <div className="gap-1 flex flex-col">
          <h1 className="font-semibold text-neutral-800">Atualize sua Senha</h1>
          <h2 className="font-regular text-sm text-neutral-400">Atualize sua senha associada à sua conta.</h2>
        </div>
        <ValidateInput
          {...register("new_password")}
          errorMessage={errors.new_password?.message}
          type="password"
          placeholder="Digite uma nova senha"
          className=""
        />
        <ValidateInput
          {...register("confirm_password")}
          errorMessage={errors.confirm_password?.message}
          type="password"
          placeholder="Confirme a nova senha"
          className=""
        />
        <div className="justify-end flex">
          <Button className="px-7" onClick={handleSubmit(handleUpdatePasswordUser)}>
            Atualizar
          </Button>
        </div>
      </div>
    </main>
  );
};
export default memo(UserPassowrdUpdateForm);