"use client";

import { Button } from "@/components/ui/button";
import { ValidateInput } from "@/components/validate-input";
import { useAuth } from "@/contexts/useAuth";
import { signInUserSchema, type signInUserSchemaFormProps } from "@/validations/user-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signInUserSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = useCallback(
    async (data: signInUserSchemaFormProps) => {
      const response = await login(data);
      if (response) router.push("/dashboard");
    },
    [login, router]
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Login</h1>
        <form className="space-y-4">
          <div>
            <ValidateInput
              {...register("email")}
              errorMessage={errors.email?.message}
              placeholder="Digite seu email"
              className="w-full"
            />
          </div>
          <div>
            <ValidateInput
              {...register("password")}
              type="password"
              errorMessage={errors.password?.message}
              placeholder="Digite sua senha"
              className="w-full"
            />
          </div>
          <Button
            variant="default"
            className="w-full py-2 px-4 font-bold mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit(handleSignIn)}
          >
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
