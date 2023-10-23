import Comment from "../models/Comments.js"
import User from "../models/Users.js";

// // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         ADD COMMENT CONTROLLER                            * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const addComment = async (req, res) => {
  try {
    const { text, postedBy, video, parentComment } = req.body;

    if (parentComment) {
      // This is a reply
      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      if (!postedBy) {
        return res.status(401).json({ message: "You must be logged in to post a comment" });
      }

      const newComment = new Comment({
        text,
        postedBy,
        video,
        parentComment,
      });
      await newComment.save();

      // Update the parent comment to include the reply
      parent.replies.push(newComment._id);
      await parent.save();

      res.status(201).json(newComment);
    } else {
      // This is a top-level comment

      if (!postedBy) {
        return res.status(401).json({ message: "You must be logged in to post a comment" });
      }

      const newComment = new Comment({
        text,
        postedBy,
        video,
      });
      await newComment.save();
      res.status(201).json(newComment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to post comment!" });
  }
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         GET COMMENT CONTROLLER                            * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const getComments = async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ video: videoId, parentComment: null }) // Only top-level comments, not replies
      .populate({
        path: "postedBy",
        model: User,
        select: "fullName username profilePicture",
      })
      .populate({
        path: "replies",
        populate: {
          path: "postedBy",
          model: User,
          select: "fullName username profilePicture",
        },
      });

    res.status(200).json(comments || []);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the comments.' });
  }
}
