import { Recipe } from "../data/types";

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
  return recipes.filter(naiveFilterBuilder(search));
}

/**
 * 
 * @param search the user inputed searched terms
 * @returns A partially applied function, ready to be passed to Array.filter  
 *  The returned function returns true if recipe matches the searched term
 */
const naiveFilterBuilder =
  (search: string) =>
  (recipe: Recipe): boolean => {
    const searchFor = search.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(searchFor) ||
      recipe.description.toLowerCase().includes(searchFor) ||
      recipe.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(searchFor)
      )
    );
  };
