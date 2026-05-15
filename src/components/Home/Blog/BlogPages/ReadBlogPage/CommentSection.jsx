import { FaPaperPlane } from "react-icons/fa";
import React from "react";

const CommentSection = () => {
  const style = {
    fontFamily: "Times New Roman",
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-md">
      {/* Comment Section Heading */}
      <div id="respond" className="comment-respond">
        <h3
          id="reply-title"
          className="text-lg md:text-xl font-bold text-gray-600 my-4"
          style={style}
        >
          Leave a Reply
          <small>
            <a
              rel="nofollow"
              id="cancel-comment-reply-link"
              href="#"
              className="text-red-600 hover:underline hidden"
            >
              Cancel reply
            </a>
          </small>
        </h3>

        {/* Comment Form */}
        <form
          id="commentform"
          className="comment-form border-2 border-gray-300 rounded-lg p-4"
        >
          <div className="mb-4">
            <textarea
              name="comment"
              id="comment"
              placeholder="Write a comment..."
              className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 py-2 px-4 border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition duration-300"
            >
              <FaPaperPlane />
              <span>Comment</span>
            </button>
          </div>
        </form>
      </div>

      {/* Hidden input for parent comment ID */}
      <input type="hidden" name="comment_parent" id="comment_parent" value="" />
    </div>
  );
};

export default CommentSection;
