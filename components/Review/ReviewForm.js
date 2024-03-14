"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Ratings } from "@/components/ui/ratings";
import { Form } from "../ui/form";
import { RotateCw } from "lucide-react";

import { insertReview, updateReview } from "@/actions/menage/reviewManager";

import "./review.css";

const initialState = { message: null, errors: {} };

const ReviewForm = ({
  comment,
  placeId,
  onCommentAdd,
  onCancelEdit,
  totalComments,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      rating: comment?.rating ? comment.rating : null,
      content: comment?.content ? comment.content : null,
    },
  });
  const commentTextareaRef = useRef(null);
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const upsertReview = comment?.id
    ? updateReview.bind(null, comment.id)
    : insertReview.bind(null, placeId);
  const [state, dispatch] = useFormState(upsertReview, initialState);

  const watchRatingField = form.watch("rating");

  const handleCommentButtonCliked = () => {
    if (session) {
      setIsCommentButtonClicked(true);
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (state.success === true) {
      if (comment?.id) onCommentAdd();
      form.setValue("rating", null);
      form.setValue("content", null);
      setIsLoading(false);
      toast.success(state.message);
    } else if (state.success === false) {
      setIsLoading(false);
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (isCommentButtonClicked && commentTextareaRef.current) {
      commentTextareaRef.current.focus();
    }
  }, [isCommentButtonClicked]);

  const handleRatingChange = (rating) => {
    form.setValue("rating", rating);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);

    dispatch(data);
  };

  return (
    <>
      {!isCommentButtonClicked && totalComments === 0 && (
        <div className="flex justify-center border border-gray-200 mb-6 py-6 rounded-md">
          <div className="flex flex-col space-y-3 px-4">
            <div className="commentTeaser relative mx-auto bg-green-500">
              <div className="commentTeaser-icon commentTeaser-icon--ask absolute"></div>
              <div className="commentTeaser-icon commentTeaser-icon--like absolute"></div>
              <div className="commentTeaser-icon commentTeaser-icon--check absolute"></div>
            </div>
            <div>
              <p className="text-gray-700 text-xl font-semibold text-center">
                Byłeś już w tym miejscu?
              </p>
              <p className="text-sm">
                Dodaj swoją opinię i daj znać innym co sądzisz o tym miejscu!
              </p>
            </div>

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
              Bądź pierwszym recenzentem
            </Button>
          </div>
        </div>
      )}
      {(isCommentButtonClicked || totalComments > 0 || comment?.id) && (
        <>
          <div className="flex">
            {!comment?.id && (
              <div className="mr-3 shrink-0 hidden sm:block">
                <Image
                  src={
                    session?.user.image
                      ? session?.user.image
                      : "/images/user-avatar.png"
                  }
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="flex-shrink-0 object-cover rounded-full w-8 h-8"
                  alt={`
                  ${
                    session?.user.username
                      ? session?.user.username
                      : session?.user.email
                  } avatar
                `}
                />
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                // onSubmit={form.handleSubmit(dispatch)}
                className="mb-6 w-full"
              >
                <div className="mb-4">
                  <label htmlFor="comment" className="sr-only">
                    Twoja opinia
                  </label>
                  <textarea
                    ref={commentTextareaRef}
                    {...form.register("content")}
                    rows="6"
                    className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
                    placeholder="Napisz opinię..."
                    required
                  ></textarea>
                </div>

                <div className="space-y-2 mb-5">
                  <p className="font-medium text-sm">Twoja ocena:</p>
                  <Ratings
                    rating={watchRatingField}
                    variant="yellow"
                    onRatingChange={handleRatingChange}
                  />
                </div>

                <div className="grid grid-cols-2 space-x-3">
                  {comment?.id && (
                    <Button
                      onClick={onCancelEdit}
                      type="button"
                      variant="outline"
                      className="w-full text-red-500 hover:text-red-600 font-semibold"
                    >
                      Anuluj
                    </Button>
                  )}

                  <Button
                    disabled={isLoading}
                    className={`w-full bg-green-600 hover:bg-green-500 ${
                      !comment?.id && "col-span-2"
                    }`}
                  >
                    {isLoading ? (
                      <RotateCw className="absolute mr-2 h-4 w-4 animate-spin" />
                    ) : comment?.id ? (
                      "Zaaktualizuj opinię"
                    ) : (
                      "Prześlij opinię"
                    )}
                  </Button>
                  {/* <Button
                    disabled={pending}
                    className="w-full bg-green-600 hover:bg-green-500"
                  >
                    {pending ? (
                      <RotateCw className="absolute mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Zaloguj się"
                    )}
                  </Button> */}
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewForm;
