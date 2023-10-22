import { useState } from "react";
import Dropdown from "../Dropdown";
import InputError from "../InputError";
import CommentForm from "./CommentForm";

const Comment = ({ comment, onEditComment, onDeleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitEdit = () => {
    onEditComment();
    setIsEditing(false);
  };

  const commentCreatedAt = new Date(comment.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  return (
    <article className="p-4 lg:p-6 mb-6 text-base text-2xl bg-white border border-gray-100 rounded-lg">
      <div className="flex">
        <div className="w-full">
          <footer className="flex justify-between items-center mb-2 w-full">
            <div className="flex items-center">
              <img
                className="mr-2 h-6 w-6 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-800"
                src={comment.user.avatar ? comment.user.avatar : "/avatar.svg"}
                alt={
                  comment.user.username
                    ? comment.user.username
                    : comment.user.email
                }
              />
              <p className="inline-flex flex-col md:flex-row md:items-center items-start mr-3 text-sm text-gray-900 ">
                <span className="font-semibold">
                  {comment.user.username
                    ? comment.user.username
                    : comment.user.email}
                </span>
                <time
                  className="text-xs text-gray-600 md:ml-2"
                  dateTime={commentCreatedAt}
                  title={commentCreatedAt}
                >
                  {commentCreatedAt}
                </time>
              </p>
            </div>

            <Dropdown
              button={
                <button
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50   "
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
                  </svg>
                </button>
              }
              items={
                <>
                  {" "}
                  <button
                    onClick={handleEditComment}
                    className="flex w-full items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>

                    <span className="mx-1">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteComment(comment._id)}
                    className="flex w-full items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>

                    <span className="mx-1">Remove</span>
                  </button>
                </>
              }
            />
          </footer>
          {!isEditing && <p className="text-gray-500 ">{comment.content}</p>}
          {isEditing && (
            <CommentForm
              commentContent={comment?.content}
              commentId={comment._id}
              placeId={comment.placeId}
              onCommentAdd={handleSubmitEdit}
              onCancelEdit={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default Comment;
