export default function createSlug(title) {
  return title
    .toLowerCase() // Converts all characters to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Deletes all characters except letters, numbers and spaces
    .trim() // Removes spaces at the beginning and end of a string
    .replace(/\s+/g, "-") // Converts spaces to dashes
    .replace(/-+/g, "-"); // Removes multiple hyphens
}
