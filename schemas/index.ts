import * as z from 'zod';
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  // con refine puedo hacer validaciones personalizadas. Por ejemplo, 
  // si el password es requerido, pero el newPassword no, entonces el password
  // es requerido tambien
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

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