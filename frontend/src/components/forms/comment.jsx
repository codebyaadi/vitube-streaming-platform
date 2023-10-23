import React, { useEffect, useState } from "react";
import { addComment, getComments } from "../../api/video/addComment";
import useUserInfoFromToken from "../../hooks/userinfo";
import { toast } from "sonner";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContext, setReplyContext] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false); // Added state for showing/hiding replies
  const user = useUserInfoFromToken();

  const handleCommentSubmit = async () => {
    try {
      await addComment(newComment, user.userId, videoId);
      fetchComments();
      setNewComment("");
      toast.success("Comment Posted")
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      await addComment(replyText, user.userId, videoId, commentId);
      setReplyContext(null);
      setReplyText("");
      fetchComments();
      toast.success("Reply Posted")
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const fetchComments = async () => {
    try {
      const comments = await getComments(videoId);
      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="flex flex-col justify-start">
      <span className="border-t border-[#3E3E3E] mx-1 my-4"></span>
      <h2>Comments</h2>
      <div className="flex flex-col justify-end items-end">
        <textarea
          name="comment"
          id="comment-area"
          cols="3"
          placeholder="Add a Comment..."
          className="bg-[#1F1F1F] w-full rounded px-3 py-2 outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-red-500 py-3 px-4 rounded-sm text-sm mt-2 w-32"
          onClick={handleCommentSubmit}
        >
          Post
        </button>
      </div>
      <div className="w-full">
        {comments.map((comment) => (
          <div key={comment._id}>
            <div
              id="user-info"
              className="flex justify-start content-center items-center"
            >
              <div className="block">
                <img
                  className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
                  src={comment.postedBy.profilePicture}
                  alt={comment.postedBy.profilePicture}
                />
              </div>
              <div className="h-10 flex flex-col justify-center ml-2 leading-none">
                <span className="p-0 m-0 font-medium text-sm text-gray-500">
                  {comment.postedBy.username}
                </span>
              </div>
            </div>
            <div id="text">{comment.text}</div>
            <div className="flex justify-start">
              <button
                className="hover:bg-gray-500/50 py-2 px-3 rounded-sm text-xs mt-2 text-slate-400 font-medium"
                onClick={() => setReplyContext(comment._id)}
              >
                Reply
              </button>
              <button
                className="hover:bg-gray-500/50 py-2 px-3 rounded-sm text-xs mt-2 text-slate-400 font-medium"
                onClick={toggleReplies}
              >
                <span className="mr-1">{comment.replies.length}</span>
                {showReplies ? "Hide Replies" : "Replies"}
              </button>
            </div>
            {replyContext === comment._id && (
              <div className="flex flex-col justify-end items-end mx-4">
                <textarea
                  name="reply"
                  cols="1"
                  rows="1"
                  placeholder="Add a Reply..."
                  className="bg-transparent w-full rounded px-3 mt-2 outline-none text-sm h-6"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <span className="w-full border-t border-slate-500/60 mx-1"></span>
              <div className="flex justify-start gap-2">
              <button
                  className="hover:bg-gray-500/50 py-2 px-3 rounded-sm text-xs mt-2 w-32 text-slate-400"
                  onClick={() => setReplyContext(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-gray-500/50 py-2 px-3 rounded-sm text-xs mt-2 w-32 text-slate-400"
                  onClick={() => handleReplySubmit(comment._id)}
                >
                  Post Reply
                </button>
              </div>
              </div>
            )}
            {showReplies && comment.replies && comment.replies.length > 0 && (
              <div className="pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply._id}>
                    <div id="user-info" className="flex justify-start content-center items-center">
                      <div className="block">
                        <img
                          className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
                          src={reply.postedBy.profilePicture}
                          alt={reply.postedBy.profilePicture}
                        />
                      </div>
                      <div className="h-10 flex flex-col justify-center ml-2 leading-none">
                        <span className="p-0 m-0 font-medium text-sm text-gray-500">
                          {reply.postedBy.username}
                        </span>
                      </div>
                    </div>
                    <div id="text" className="text-sm font-normal">{reply.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
