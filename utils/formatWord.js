export default function formatReviewWord(count) {
  if (count === 1) {
    return "opinia";
  } else if (count > 1 && count < 5) {
    return "opinie";
  } else if (count >= 5 || count === 0) {
    return "opinii";
  }
}
