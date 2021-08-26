import { recipes } from "./recipes";
import { Recipe } from "./types";
import { TRIGGER_SEARCH_LENGTH } from "../config";

export type IndexedRecipes = {
  [recipeId: number]: IndexedRecipe;
};

export type IndexedRecipe = {
  nameIndex: TextIndex;
  descriptionIndex: TextIndex;
  ingredientsIndex: TextIndex[];
};

export type TextIndex = {
  [indexedSubString: string]: number[]; 
  /* each substring of TRIGGER_SEARCH_LENGTH length indexes its position occurences in the string
    for example, with TRIGGER_SEARCH_LENGTH = 3, the string "aabcdaabce" is indexed like this :
    {
      aab: [0, 5],
      abc: [1, 6],
      bcd: [2],
      cda: [3],
      daa: [4]
    }
  */
};

/**
 * 
 * @param str the string to build the index of
 * @returns the string index
 */
function buildIndex(str: string): TextIndex {
  const index: TextIndex = {};
  
  // iterate over the characters of str
  for (let i = 0; i < str.length - TRIGGER_SEARCH_LENGTH + 1; i++) {
    const subString = str.substr(i, TRIGGER_SEARCH_LENGTH).toLowerCase();
    if (index[subString] == null) {
      // initialize the position array when substring is seen for the first time
      index[subString] = [];
    }
    index[subString].push(i); // save the position of the substring in the position array
  }
  return index;
}

/**
 * Build all the indexes of a given recipe
 * @param recipe the recipe to build the indexes of
 * @returns an object containing all the indexes of the relevant recipe attributes (the name, the description, and all the ingredients)
 */
function buildRecipeIndex(recipe: Recipe): IndexedRecipe {
  const { name, description, ingredients } = recipe;
  return {
    nameIndex: buildIndex(name),
    descriptionIndex: buildIndex(description),
    ingredientsIndex: ingredients.map(({ name }) => buildIndex(name)),
  };
}

/* Build the indexes of all recipes
  Contains all recipe indexes, indexed by the recipe ids
*/
const recipesIndex = recipes.reduce((recipesIndex, recipe) => {
  recipesIndex[recipe.id] = buildRecipeIndex(recipe);
  return recipesIndex;
}, {} as IndexedRecipes);

export { recipesIndex };
