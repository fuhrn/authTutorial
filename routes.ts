/**
 * This file contains all the routes that are public and can be accessed without authentication
 * @type {string[]}
 */

// no estoy incluyendo /auth/login y /auth/register porque esas rutas son para autenticacion
// y no deben ser publicas en todos los casos. Solo deben ser publicas si el user no esta logueado
// y si el user esta logueado, redirigir a /settings. Esto lo controlo en el middleware
export const publicRoutes = [
  "/"
];

/**
 * This file contains all the routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth/";

/**
 * The default redirect route after a user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";