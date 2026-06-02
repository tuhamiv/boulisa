import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/Home.tsx"),
  route("signup", "routes/auth/Signup.tsx"),
  route("login", "routes/auth/Login.tsx"),
] satisfies RouteConfig;
