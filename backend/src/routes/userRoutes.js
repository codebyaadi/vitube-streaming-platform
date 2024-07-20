import express from "express";
import multer from "multer";
import {
    createUser,
    logIn,
    updateUser,
    verifyOtp,
} from "../controllers/userControllers.js";

const router = express.Router();

const upload = multer();

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         SIGN UP ROUTE                         * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/signup", createUser);

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         LOG IN ROUTE                          * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/login", logIn);

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         UPDATE ROUTE                          * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.patch("/v1/update-profile", upload.single("image"), updateUser);

// // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           VERIFY EMAIL ROUTE                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/verify-email", verifyOtp);

export default router;
