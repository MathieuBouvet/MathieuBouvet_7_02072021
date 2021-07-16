import { TextIndex } from "../data/recipesTextIndex";
import { TRIGGER_SEARCH_LENGTH } from "../config";

function isSubstringOf(
  needle: string,
  haystack: string,
  haystackIndex: TextIndex
): boolean {
  if (needle.length < TRIGGER_SEARCH_LENGTH) {
    throw new TypeError(
      `"needle" must be longer than ${TRIGGER_SEARCH_LENGTH}, as defined in from TRIGGER_SEARCH_LENGTH constant in config.js`
    );
  }
  if (haystack === "" || needle.length > haystack.length) {
    return false; // the empty string has no substring, and a longer needle cannot be a substring of haystack
  }
  const startingSubString = needle.substr(0, TRIGGER_SEARCH_LENGTH);

  let positions = haystackIndex[startingSubString] ?? [];

  for (let offset = TRIGGER_SEARCH_LENGTH; offset < needle.length; offset++) {
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
