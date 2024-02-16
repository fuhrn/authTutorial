// import { auth } from "./auth"
// las siguientes 3 lineas son las que corrigen el problema de usar auth.
import authConfig from "@/auth.config"
import NextAuth from "next-auth";
import { 
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // para hacer pruebas de funcionamiento del middleware
  // const isLoggedIn = !!req.auth;
  // console.log("ROUTE: ", req.nextUrl.pathname);
  // console.log("isLoggedIn: ", isLoggedIn);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // estas rutas siempre se pueden acceder, este logueado o no el user
  if (isApiAuthRoute) {
    return null;
  }

  // si la ruta solicitada es login o register y el user ya esta logueado, redirigir a /settings
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // si la ruta llega a esta instancia, permito acceder todo con return null;
  return null;
})



// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}