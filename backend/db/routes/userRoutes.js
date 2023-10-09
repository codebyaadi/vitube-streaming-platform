import express from "express";
import { createUser, logIn, updateUser } from "../controllers/userControllers.js";

const router = express.Router();

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         SIGN UP ROUTE                         * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/signup", createUser);

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         LOG IN ROUTE                          * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/login", logIn)

// // // // // // // // // // // // // // // // // // // // // // // //
// *                         UPDATE ROUTE                          * //
// // // // // // // // // // // // // // // // // // // // // // // //

router.patch("/v1/update-profile", updateUser)

export default router;