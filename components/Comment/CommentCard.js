"use client";

import { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useToast } from "@/hooks/useToast";
import useConfirm from "@/hooks/useConfirm";

const CommentCard = ({ place }) => {
  const toast = useToast();
  const { confirm } = useConfirm();
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comment/place/${place._id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();

        setComments(data);
      } else {
        console.error("Failed to fetch comments.", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch comments.", error);
    }
  }, [place._id]);

  useEffect(() => {
    fetchComments();
  }, [place._id]);

  const handleDeleteComment = async (id) => {
    const isConfirmed = await confirm(
      "Are you sure you want to remove this comment?"
    );

    if (isConfirmed) {
      // setError(false);
      // setIsLoading(true);

      try {
        const response = await fetch(`/api/comment/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const message = await response.json();
          toast.success(message);
          fetchComments();
        } else {
          const { error } = await response.json();
          console.log("ERROR ELSEQ");
          // setError(error);
        }
      } catch (error) {
        console.log("EROR CATCH");
        console.log(error);
        // setError(error);
      }
      // } finally {
      //   setIsLoading(false);
      // }
    }
  };

  return (
    <section class="bg-white py-8 lg:py-16 antialiased">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-700 md:text-2xl">
          Discussion ({comments.length})
        </h2>
      </div>

      <CommentForm
        placeId={place._id}
        totalComments={comments.length}
        commentsonCommentAdd={fetchComments}
      />

      {comments.map((comment, index) => (
        <Comment
          comment={comment}
          key={index}
          onEditComment={fetchComments}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </section>
  );
};

export default CommentCard;
