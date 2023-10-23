import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           ADD COMMENT ROUTE                         * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/addcomment", addComment);

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           GET COMMENT ROUTE                         * //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.get("/v1/getcomments/:videoId", getComments);

export default router;
