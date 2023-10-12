import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import User from "../models/Users.js";
import nodeMailer from "../utils/nodeMail.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         SIGN UP CONTROLLER                          * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

export const createUser = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ message: "Fill up the all details" });
        }

        if (existingUserEmail) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        await nodeMailer({userEmail: email})
        return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in user sign-up:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         LOG IN CONTROLLER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        console.log(user);
        console.log(user._id);

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.fullName,
                email: user.email,
                username: user.username,
                profile: user.profilePicture,
            },
            secretKey,
            { expiresIn: "1h" }
        );

        // Set the "SameSite" attribute to "None" for the "token" cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // You should use HTTPS in production for security
            sameSite: "None", // Set SameSite to None for cross-origin cookies
            maxAge: 3600000, // 1 hour expiration time
        });

        return res
            .status(200)
            .json({ message: "Successfully logged in...", success: true, token });
    } catch (error) {
        console.error("Error while login:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         UPDATE CONTROLLER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

export const updateUser = async (req, res) => {
    try {
        const { userId, username, name } = req.body;
        const image = req.file;
        console.log(image);
        if (!image) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        // Convert the file buffer to a data URL //
        const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

        // Upload data URL to Cloudinary and get the image URL
        const uploadedImage = await cloudinary.v2.uploader.upload(dataUrl);

        if (!uploadedImage.secure_url) {
            return res.status(500).json({ message: 'Image upload failed.' });
        }

        const user = await User.findById(userId);

        if (!userId) {
            return res.status(404).json({ message: "User not found." });
        }

        if (username) {
            user.username = username;
        }

        if (name) {
            user.fullName = name;
        }

        user.profilePicture = uploadedImage.secure_url;

        await user.save();
        return res.status(200).json({ message: "Changes updated successfull", data: user });
    } catch (error) {
        console.error("Error while updating profile:", error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                       VERIFY OTP CONTROLLER                         * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

export const verifyOtp = async (req, res) => {
    try {
        const { email, enteredOtp } = req.body;
        console.log(email);
        console.log(enteredOtp);

        const user = await User.findOne({ email });

        if (!user) { // Check if user is not found, not email
            return res.status(404).json({ message: "User not found" });
        }

        const otp = user.emailOTP;
        console.log(otp)

        if (enteredOtp == otp) { // Use strict equality (===) for comparison
            user.isEmailVerified = true;
            await user.save(); // Save the user with the updated email verification status
            return res.status(200).json({ message: "Email is verified." });
        } else {
            return res.status(401).json({ message: "Incorrect OTP" });
        }
    } catch (error) {
        console.error("Error while updating profile:", error);
        return res.status(500).json({ message: "Something went wrong." });
    }
};
