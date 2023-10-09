"use client";

import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import InputError from "../InputError";
import { useSession } from "next-auth/react";
import Button from "../Button";

import "./comment.css";

const CommentForm = ({
  commentContent,
  commentId,
  placeId,
  onCommentAdd,
  onCancelEdit,
  totalComments,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const commentTextareaRef = useRef(null);

  const url = commentId ? `/api/comment/${commentId}` : "/api/comment";
  const method = commentId ? "PATCH" : "POST";

  useEffect(() => {
    setContent(commentContent);
  }, [commentContent]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setError(false);
    setIsLoading(true);

    const requestBody = {
      commentId,
      content,
      placeId,
    };

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          requestBody,
        }),
      });

      if (response.ok) {
        const message = await response.json();

        toast.success(message);
        setContent("");

        onCommentAdd();
      } else {
        const { error } = await response.json();

        setError(error);
      }
    } catch (error) {
      console.log("ERROR 2");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentButtonCliked = () => {
    if (session) {
      setIsCommentButtonClicked(true);
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (isCommentButtonClicked && commentTextareaRef.current) {
      commentTextareaRef.current.focus();
    }
  }, [isCommentButtonClicked]);

  return (
    <>
      {!isCommentButtonClicked && totalComments === 0 && (
        <div className="flex justify-center border border-gray-200 mb-6 py-6 rounded-md">
          <div className="flex flex-col space-y-3">
            <div className="commentTeaser relative mx-auto bg-green-500">
              <div className="commentTeaser-icon commentTeaser-icon--ask absolute"></div>
              <div className="commentTeaser-icon commentTeaser-icon--like absolute"></div>
              <div className="commentTeaser-icon commentTeaser-icon--check absolute"></div>
            </div>
            <p className="text-gray-700 text-xl font-semibold">
              Questions? Opinions? Suggestions?
            </p>
            <Button onClick={handleCommentButtonCliked} className={`text-sm`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-3 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Be the first to comment
            </Button>
          </div>
        </div>
      )}
      {(isCommentButtonClicked || totalComments > 0 || commentId) && (
        <div className="flex">
          {!commentId && (
            <div className="mr-3 shrink-0 hidden sm:block">
              <img
                className="h-8 w-8 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-800"
                src={
                  session?.user.avatar
                    ? session.user.avatar
                    : "/assets/icons/avatar.svg"
                }
                alt={
                  session?.user.username
                    ? session?.user.username
                    : session?.user.email
                }
              />
            </div>
          )}

          <form onSubmit={handleSubmitForm} className="mb-6 w-full">
            <div className="mb-4">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={commentTextareaRef}
                id="comment"
                rows="6"
                className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
                value={content ?? ""}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>

            <InputError messages={[error]} className="my-2" />

            <div className="flex items-center space-x-3">
              <Button isLoading={isLoading} className={`text-sm`}>
                {commentId ? "Update comment" : "Post comment"}
              </Button>
              {commentId && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="text-red-500 font-bold text-xs uppercase"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentForm;
