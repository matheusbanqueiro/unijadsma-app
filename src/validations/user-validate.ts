import { z } from "zod";

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const signInUserSchema = z.object({
  email: z
    .string()
    .nonempty("O campo de email é obrigatório"),
  password: z
    .string()
    .min(8, "O campo de senha deve conter no minimo 8 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});
export const registerAdministratorsSchema = z.object({
  name: z
  .string()
  .nonempty("O campo de nome é obrigatório"),
  email: z
    .string()
    .nonempty("O campo de email é obrigatório"),
    phone: z
    .string()
    .nonempty("O campo de telefone é obrigatório"),
  password: z
    .string()
    .min(8, "O campo de senha deve conter no minimo 8 caracteres")
    .nonempty("O campo de senha é obrigatório"),
});
export const updateUserSchema = z.object({
  name: z
  .string()
  .nonempty("O campo de nome é obrigatório"),
  email: z
    .string()
    .nonempty("O campo de email é obrigatório"),
    phone: z
    .string()
    .nonempty("O campo de telefone é obrigatório"),
});
export const updateUserPasswordSchema = z
  .object({
    new_password: z
      .string()
      .nonempty('O campo de senha é obrigatório')
      .min(8, 'O campo de email deve conter no minimo 8 caracteres'),
   confirm_password: z
      .string()
      .nonempty('O Campo confirmar senha é obrigatório.')
      .min(8, 'O campo de email deve conter no minimo 8 caracteres'),
  })
  .refine(
    ({confirm_password, new_password }) => new_password ===confirm_password,
    {
      message: 'A confirmação de senha é diferente de senha.',
      path: ['password_confirmation'],
    },
  );

export type SignInUserSchemaFormProps = z.infer<typeof signInUserSchema>;
export type RegisterAdministratorsSchemaFormProps = z.infer<typeof registerAdministratorsSchema>;
export type UpdateUserSchemaFormProps = z.infer<typeof updateUserSchema>;
export type UpdateUserPasswordSchemaFormProps = z.infer<typeof updateUserPasswordSchema>;