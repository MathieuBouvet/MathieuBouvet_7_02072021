import { TextIndex } from "../data/recipesTextIndex";
import { TRIGGER_SEARCH_LENGTH } from "../config";

/**
 * 
 * @param needle we search for the needle
 * @param haystack in the haystack
 * @param haystackIndex with help from the haystack index
 * @returns true if needle is in haystack, false if not
 */
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
  const startingSubString = needle.substr(0, TRIGGER_SEARCH_LENGTH); // the first substring of length TRIGGER_SEARCH_LENGTH

  let positions = haystackIndex[startingSubString] ?? []; // positions is where the needle could be matching

  // iterate over the character of the needle, but we can skip the TRIGGER_SEARCH_LENGTH first characters, because we initilized the starting positions with them in the two lines above
  for (let offset = TRIGGER_SEARCH_LENGTH; offset < needle.length; offset++) {
    if (positions.length === 0) {
      return false; // there are no more possible positions, therefore needle is not in haystack
    }

    // every iteration, we read the next character of the needle
    // campare it to the haystack possible positions
    // and refine the possible positions
    const currentChar = needle[offset];
    positions = positions.filter(
      position => haystack[position + offset] === currentChar // compare the current character of the needle with the possible position
    );
  }
  // Once all the characters of the needle has been read,
  // if there are some possible positions,
  // then needle is in haystack (at least once)
  // if not, needle is not in haystack
  return positions.length > 0;
}

export default isSubstringOf;
