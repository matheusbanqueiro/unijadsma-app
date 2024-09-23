"use client";

import { Button } from "@/components/ui/button";
import { ValidateInput } from "@/components/validate-input";
import { useAuth } from "@/contexts/useAuth";
import { signInUserSchema, type SignInUserSchemaFormProps } from "@/validations/user-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInUserSchemaFormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = useCallback(
    async (data: SignInUserSchemaFormProps) => {
      const response = await login(data);
      if (response) router.push("/dashboard");
    },
    [login, router]
  );

  const images = [
    "/assets/images/unijadsma-group1.jpg",
    "/assets/images/unijadsma-group2.jpg",
    "/assets/images/unijadsma-group3.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex min-h-screen">
      {/* Coluna Esquerda - Formulário */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
        <div className="text-center mb-8">
          <Image priority={true} src="/assets/brand/uni-primary.svg" alt="Logo unijadsma" width={200} height={200} />
        </div>
        <h1 className="text-4xl font-semibold text-neutral-800 mb-6 text-left">Bem-vindo(a) de volta!</h1>
        <p className="text-sm text-neutral-500 text-left mb-10">Entre com suas credenciais para acessar o painel.</p>
        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <ValidateInput
              {...register("email")}
              errorMessage={errors.email?.message}
              placeholder="Digite seu email"
              className=""
            />
          </div>
          <div>
            <ValidateInput
              {...register("password")}
              type="password"
              errorMessage={errors.password?.message}
              placeholder="Digite sua senha"
              className=""
            />
          </div>
          <Button
            variant="default"
            className="w-full py-3"
            onClick={handleSubmit(handleSignIn)}
          >
            Entrar
          </Button>
        </form>
      </div>

      {/* Coluna Direita - Imagem */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          priority={true}
          src={images[currentImageIndex]}
          alt="Grupo unijadsma"
          layout="fill"
          objectFit="cover"
          className="rounded-none"
        />
      </div>
    </main>
  );
}
