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

const hopefullyOptimizedFilterBuilder =
  (search: string) =>
  (recipe: Recipe): boolean => {
    const recipeIndex = recipesIndex[recipe.id];
    const lowerCasedSearch = search.toLowerCase();

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
    return isNameMatching() || isDescriptionMatching() || isIngredientsMatching();
  };
