export default function formatReviewWord(count) {
  if (count === 1) {
    return "opinia";
  } else if (count > 1 && count < 5) {
    return "opinie";
  } else if (count >= 5 || count === 0) {
    return "opinii";
  }
}

export function formatWord(count, words) {
  if (!Array.isArray(words) || words.length < 3) {
    throw new Error("Words array must contain at least three elements.");
  }

  const [singular, pluralNominative, pluralGenitive] = words;

  if (count === 1) {
    return singular;
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return pluralNominative;
  } else {
    return pluralGenitive;
  }
}
