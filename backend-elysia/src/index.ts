import { Elysia } from "elysia";
import { users } from "@/handlers/users.handler";

const app = new Elysia()
    .get("/", () => "Hello Elysia + Vitube")
    .use(users)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
