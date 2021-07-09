import { TextIndex } from "../data/recipesTextIndex";

function isSubstringOf(
  needle: string,
  haystack: string,
  haystackIndex: TextIndex
): boolean {
  if (needle === "") {
    return true; // the empty string is a substring of any string
  }
  if (haystack === "") {
    return false; // an empty string has no substring (except the empty string, covered above)
  }
  let positions = haystackIndex[needle[0]] ?? [];

  for (let offset = 1; offset < needle.length; offset++) {
    if (positions.length === 0) {
      return false; // we know at this point that no match can occur
    }
    const currentChar = needle[offset];
    positions = positions.filter(
      position => haystack[position + offset] === currentChar
    );
  }
  return positions.length > 0;
}

export default isSubstringOf;
