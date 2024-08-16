import Elysia, { t } from "elysia";
import cookie from "@elysiajs/cookie";
import prisma from "@/lib/db";
import { getRandomProfileImg } from "@/lib/utils";

export const users = new Elysia().use(cookie()).group("/user", (app) =>
    app
        .post(
            "/signup",
            async ({ body, set }) => {
                try {
                    const { fullname, username, email, password } = body;

                    const user = await prisma.user.findFirst({
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

                    if (user) {
                        set.status = 400;
                        return {
                            message: "User already exist",
                        };
                    }

                    const pImg = getRandomProfileImg();
                    const hashedPasswd = await Bun.password.hash(password);

                    const newUser = await prisma.user.create({
                        data: {
                            fullName: fullname,
                            username,
                            email,
                            password: hashedPasswd,
                            profilePicture: pImg,
                        },
                    });

                    set.status = 201;
                    return {
                        message: "User created successfully",
                        data: newUser,
                    };
                } catch (error) {
                    set.status = 500;
                    return {
                        message: "Something went wrong",
                    };
                }
            },
            {
                body: t.Object({
                    fullname: t.String(),
                    username: t.String(),
                    email: t.String(),
                    password: t.String(),
                }),
            }
        )
        .post(
            "/signin",
            async ({ body, set }) => {
                try {
                    const { email, password } = body;
                } catch (error) {}
            },
            {
                body: t.Object({
                    email: t.String(),
                    password: t.String(),
                }),
            }
        )
);
