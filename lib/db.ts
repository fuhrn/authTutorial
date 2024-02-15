import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis is a new global object that is available in all environments. It is similar to window in the browser, but it is available in all environments, including Node.js. This means that you can use it in your Next.js API routes, for example.
// globalThis is not afected by hot reloads, so it is a good place to store the PrismaClient instance.
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}