import cx from "classnames";

import { FaRegTimesCircle } from "react-icons/fa";

import styles from "./recipeTag.module.css";

interface Props {
  label: string;
  onRemove?: (label: string) => void;
  className?: string;
}

const RecipeTag = ({ label, onRemove = () => {}, className = "" }: Props) => {
  return (
    <li className={cx(styles.recipeTag, className)}>
      {label}
      <button onClick={() => onRemove(label)} className={styles.removeButton}>
        <FaRegTimesCircle />
      </button>
    </li>
  );
};

export default RecipeTag;
