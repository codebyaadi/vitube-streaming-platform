import nodemailer from "nodemailer";
import User from "../../db/models/Users.js";
import * as dotenv from "dotenv"
import generateOTP from "./generateOtp.js"

dotenv.config();

const nodeMailer = async ({ userEmail }) => {
    const otp = generateOTP();
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.NODEMAIL_USER,
            pass: process.env.NODEMAIL_PASS,
        },
    });

    const mailOptions = {
        from: "ayanokojikiyo@outlook.com",
        to: userEmail, // Remove the curly braces
        subject: "Verify OTP",
        text: `Your verification code is ${otp}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);

        // Save the OTP to the user document
        const user = await User.findOne({ email: userEmail });

        if (user) {
            // Update the user document with the OTP
            user.emailOTP = otp;
            await user.save();
        } else {
            // Handle the case where the user with the provided email is not found
            console.error("User not found for email:", userEmail);
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default nodeMailer;
