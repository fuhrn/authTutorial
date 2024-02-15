import * as z from 'zod';

// no ponemos minimo de caracteres porque puede ser que haya una contraseña vieja de pocos caracter
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
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