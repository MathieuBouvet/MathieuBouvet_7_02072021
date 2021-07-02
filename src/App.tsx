import { useState } from "react";
import cx from "classnames";

import MainSearchBox from "./components/MainSearchBox";
import {
  IngredientFilter,
  UstensilFilter,
  ApplianceFilter,
} from "./components/AdvancedFilter";
import RecipeTag from "./components/RecipeTag";
import Recipecard from "./components/RecipeCard";

import useList from "./hooks/useList";

import mainSearch from "./utils/mainSearch";

import { recipes } from "./data/recipes";

import styles from "./app.module.css";
import logo from "./logo.png";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const [selectedIngredients, appendIngredient, removeIngredient] =
    useList<string>();
  const [selectedAppliances, appendAppliance, removeAppliance] =
    useList<string>();
  const [selectedUstensils, appendUstensil, removeUstensil] = useList<string>();

  const hasSelectedTags =
    selectedIngredients.length !== 0 ||
    selectedAppliances.length !== 0 ||
    selectedUstensils.length !== 0;

  const searchedRecipes =
    searchValue.length < 3 ? recipes : mainSearch(recipes, searchValue);

  const recipesMatchingTagSelection = searchedRecipes.filter(recipe => {
    const ingredientsMatch = selectedIngredients.every(ingredientTag =>
      recipe.ingredients.find(ingredient => ingredient.name === ingredientTag)
    );

    const appliancesMatch = selectedAppliances.every(
      applianceTag => recipe.appliance === applianceTag
    );

    const ustensilsMatch = selectedUstensils.every(ustensilTag =>
      recipe.ustensils.find(ustensil => ustensil === ustensilTag)
    );

    return ingredientsMatch && appliancesMatch && ustensilsMatch;
  });

  return (
    <>
      <header>
        <img src={logo} alt="les petits plats" className={styles.appLogo} />
        <h1 className={styles.appTitle}>Les petits plats</h1>
        <MainSearchBox value={searchValue} onChange={setSearchValue} />
        {hasSelectedTags && (
          <ul className={styles.tagContainer}>
            {selectedIngredients.map(ingredient => (
              <RecipeTag
                key={`ingredient-${ingredient}`}
                label={ingredient}
                onRemove={removeIngredient}
                className={cx(styles.tag, styles.ingredientTag)}
              />
            ))}
            {selectedAppliances.map(appliance => (
              <RecipeTag
                key={`appliance-${appliance}`}
                label={appliance}
                onRemove={removeAppliance}
                className={cx(styles.tag, styles.applianceTag)}
              />
            ))}
            {selectedUstensils.map(ustensil => (
              <RecipeTag
                key={`ustensil-${ustensil}`}
                label={ustensil}
                onRemove={removeUstensil}
                className={cx(styles.tag, styles.ustensilTag)}
              />
            ))}
          </ul>
        )}

        <div className={styles.advancedFilterContainer}>
          <IngredientFilter
            recipes={recipesMatchingTagSelection}
            onTagClick={appendIngredient}
            selectedTags={selectedIngredients}
          />
          <ApplianceFilter
            recipes={recipesMatchingTagSelection}
            onTagClick={appendAppliance}
            selectedTags={selectedAppliances}
          />
          <UstensilFilter
            recipes={recipesMatchingTagSelection}
            onTagClick={appendUstensil}
            selectedTags={selectedUstensils}
          />
        </div>
      </header>
      <main className={styles.recipeContainer}>
        {recipesMatchingTagSelection.map(recipe => (
          <Recipecard key={recipe.id} recipe={recipe} />
        ))}
      </main>
    </>
  );
};

export default App;
