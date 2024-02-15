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