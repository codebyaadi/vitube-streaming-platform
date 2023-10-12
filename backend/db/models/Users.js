import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String, // You can use a String to store the URL or file path of the profile picture.
        default: "https://res.cloudinary.com/dqcejxdbf/image/upload/v1695815974/DreamShaper_v7_A_businessman_3_gxwm8c.jpg", // You can set a default profile picture if none is provided.
    },
    emailOTP: {
        type: String, // Store the OTP for email verification
    },
    isEmailVerified: {
        type: Boolean,
        default: false, // You can use this field to track whether the email is verified or not.
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
