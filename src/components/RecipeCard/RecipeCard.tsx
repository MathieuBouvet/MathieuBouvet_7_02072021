import { FaRegClock } from "react-icons/fa";
import Highlight from "react-highlight-words";

import { Recipe } from "../../data/types";

import styles from "./recipeCard.module.css";

interface Props {
  recipe: Recipe;
  searchedTerm?: string;
}

const RecipeCard = ({ recipe, searchedTerm = "" }: Props) => {
  return (
    <section className={styles.recipeCard}>
      <div className={styles.recipeContent}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            <Highlight
              autoEscape
              searchWords={[searchedTerm]}
              textToHighlight={recipe.name}
            />
          </h2>
          <FaRegClock className={styles.clock} />
          {recipe.time}min
        </div>
        <div className={styles.details}>
          <ul>
            {recipe.ingredients
              .filter(ingredient => ingredient.quantity != null)
              .map(({ name, unit, quantity }) => (
                <li key={name}>
                  <b>
                    <Highlight
                      autoEscape
                      searchWords={[searchedTerm]}
                      textToHighlight={name}
                    />
                  </b>
                  : {quantity} {unit}
                </li>
              ))}
          </ul>
          <p className={styles.description}>
            <Highlight
              autoEscape
              searchWords={[searchedTerm]}
              textToHighlight={recipe.description}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecipeCard;
