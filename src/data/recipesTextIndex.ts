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
  [indexedSubString: string]: number[]; // each char of the string indexes position occurences
};

function buildIndex(str: string): TextIndex {
  const index: TextIndex = {};
  for (let i = 0; i < str.length - TRIGGER_SEARCH_LENGTH + 1; i++) {
    const subString = str.substr(i, TRIGGER_SEARCH_LENGTH).toLowerCase();
    if (index[subString] == null) {
      index[subString] = [];
    }
    index[subString].push(i);
  }
  return index;
}

function buildRecipeIndex(recipe: Recipe): IndexedRecipe {
  const { name, description, ingredients } = recipe;
  return {
    nameIndex: buildIndex(name),
    descriptionIndex: buildIndex(description),
    ingredientsIndex: ingredients.map(({ name }) => buildIndex(name)),
  };
}

const recipesIndex = recipes.reduce((recipesIndex, recipe) => {
  recipesIndex[recipe.id] = buildRecipeIndex(recipe);
  return recipesIndex;
}, {} as IndexedRecipes);

export { recipesIndex };
