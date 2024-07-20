import prisma from "@/lib/db";
import Elysia, { t } from "elysia";

export const users = new Elysia().group('/user', (app) =>
    app.post(
        "/signup",
        async ({ body, set }) => {
            try {
                const { fullname, username, email, password } = body;

                const user = await prisma.users.findFirst({
                    where: {
                        OR: [
                            {
                                email,
                            },
                            {
                                username,
                            },
                        ],
                    },
                });

                if (!fullname || !username || !email || !password) {
                    set.status = 400;
                    return {
                        message: "Fill up all the details",
                    };
                }
            } catch (error) {}
        },
        {
            body: t.Object({
                        fullname: t.String(),
                        username: t.String(),
                        email: t.String(),
                        password: t.String()
            }),
        }
    )
);
