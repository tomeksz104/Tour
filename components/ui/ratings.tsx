import React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-500",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  onRatingChange: any;
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
}

const Ratings = ({ onRatingChange, ...props }: RatingsProps) => {
  const {
    rating,
    totalStars = 5,
    size = 20,
    fill = true,
    Icon = <Star />,
    variant = "default",
  } = props;

  const fullStars = Math.floor(rating);
  const partialStar = rating % 1 > 0 && (
    <PartialStar
      fillPercentage={rating % 1}
      size={size}
      className={cn(ratingVariants[variant].star)}
      Icon={Icon}
      onClick={(isHalf) => handleStarClick(fullStars, isHalf)}
    />
  );

  const handleStarClick = (index: any, isHalf: any) => {
    let newRating: any;

    console.log(index);
    console.log(isHalf);

    if (index === 0 && isHalf) {
      // Dla lewej połowy pierwszej gwiazdki przełączaj między 0 a 0.5
      newRating = rating === 0.5 ? 0 : 0.5;
    } else {
      // Dla pozostałych gwiazdek oblicz ocenę normalnie
      newRating = isHalf ? index + 0.5 : index + 1;
    }

    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className={cn("flex items-center gap-2")} {...props}>
      {[...Array(totalStars)].map((_, i) => (
        <div key={i} style={{ cursor: "pointer", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: "50%",
              height: "100%",
            }}
            onClick={() => handleStarClick(i, true)}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              right: 0,
              height: "100%",
            }}
            onClick={() => handleStarClick(i, false)}
          />
          {i < fullStars
            ? React.cloneElement(Icon, {
                size,
                className: cn(
                  fill ? "fill-current" : "fill-transparent",
                  ratingVariants[variant].star
                ),
              })
            : i === fullStars && partialStar
            ? partialStar
            : React.cloneElement(Icon, {
                size,
                className: cn(ratingVariants[variant].emptyStar),
              })}
        </div>
      ))}
    </div>
  );
};

const PartialStar = ({ fillPercentage, size, className, Icon, onClick }) => {
  return (
    <div>
      {/* <div style={{ position: "relative", display: "inline-block" }}> */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: "50%",
          height: "100%",
        }}
        onClick={() => onClick(true)} // Kliknięcie na lewą połowę
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          right: 0,
          height: "100%",
        }}
        onClick={() => onClick(false)} // Kliknięcie na prawą połowę
      />
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
        onClick={() => onClick(true)} // Kliknięcie na lewą połowę
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export { Ratings };
