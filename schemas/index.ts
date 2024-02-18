import * as z from 'zod';

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  })
}) 

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  })
}) 

// no ponemos minimo de caracteres porque puede ser que haya una contraseña vieja de pocos caracter
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string())
}) 

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
  name: z.string().min(4, {
    message: "Name minimum 4 characters required"
  })
}) 