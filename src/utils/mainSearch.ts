import { Recipe } from "../data/types";
import { recipesIndex } from "../data/recipesTextIndex";
import isSubstringOf from "../utils/isSubstringOf";

/**
 * 
 * @param recipes A list of Recipe to filter from
 * @param search the user inputed searched terms
 * @returns A list of Recipe matching the searched term
 */
export default function mainSearch(
  recipes: Recipe[],
  search: string
): Recipe[] {
  return recipes.filter(hopefullyOptimizedFilterBuilder(search));
}

/**
 * 
 * @param search the user inputed searched terms
 * @returns A partially applied function, ready to be passed to Array.filter  
 *  The returned function returns true if recipe matches the searched term
 */
const hopefullyOptimizedFilterBuilder =
  (search: string) =>
  (recipe: Recipe): boolean => {
    const recipeIndex = recipesIndex[recipe.id];
    const lowerCasedSearch = search.toLowerCase();

    // Uses isSubstringOf instead of String.includes, an optimized version
    const isNameMatching = () => isSubstringOf(
      lowerCasedSearch,
      recipe.name,
      recipeIndex.nameIndex
    );
    const isDescriptionMatching = () => isSubstringOf(
      lowerCasedSearch,
      recipe.description,
      recipeIndex.descriptionIndex
    );

    const isIngredientsMatching = () => recipe.ingredients.some((ingredient, i) =>
      isSubstringOf(
        lowerCasedSearch,
        ingredient.name,
        recipeIndex.ingredientsIndex[i]
      )
    );
    // These are function calls to take advantage of operator short circuiting and proper naming for readability
    return isNameMatching() || isDescriptionMatching() || isIngredientsMatching();
  };
