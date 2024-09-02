import { z } from "zod";

export const signInUserSchema = z.object({
  email: z
    .string()
    .nonempty("O campo de email é obrigatório"),
  password: z
    .string()
    .min(8, "O campo de senha deve conter no minimo 8 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});
export const RegisterAdministratorsSchema = z.object({
  name: z
  .string()
  .nonempty("O campo de nome é obrigatório"),
  email: z
    .string()
    .nonempty("O campo de email é obrigatório"),
  password: z
    .string()
    .min(8, "O campo de senha deve conter no minimo 8 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});

export type signInUserSchemaFormProps = z.infer<typeof signInUserSchema>;
export type RegisterAdministratorsSchemaFormProps = z.infer<typeof RegisterAdministratorsSchema>;