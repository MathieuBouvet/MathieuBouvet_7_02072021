import { useState } from "react";
import cx from "classnames";

import MainSearchBox from "./components/MainSearchBox";
import {
  IngredientFilter,
  UstensilFilter,
  ApplianceFilter,
} from "./components/AdvancedFilter";
import RecipeTag from "./components/RecipeTag";

import useList from "./hooks/useList";

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
            recipes={recipes}
            onTagClick={appendIngredient}
            selectedTags={selectedIngredients}
          />
          <ApplianceFilter
            recipes={recipes}
            onTagClick={appendAppliance}
            selectedTags={selectedAppliances}
          />
          <UstensilFilter
            recipes={recipes}
            onTagClick={appendUstensil}
            selectedTags={selectedUstensils}
          />
        </div>
      </header>
      <main>content</main>
    </>
  );
};

export default App;
