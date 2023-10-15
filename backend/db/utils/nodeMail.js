import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

export const nodeMailer = async ({ userEmail, otp }) => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAIL_USER,
        to: userEmail,
        subject: "Verify OTP",
        text: `Your verification code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Re-throw the error to handle it in the caller.
    }
};