import { useState } from "react";

import MainSearchBox from "./components/MainSearchBox/MainSearchBox";

import styles from "./app.module.css";
import logo from "./logo.png";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <header>
        <img src={logo} alt="les petits plats" className={styles.appLogo} />
        <h1 className={styles.appTitle}>Les petits plats</h1>
        <MainSearchBox value={searchValue} onChange={setSearchValue} />
      </header>
      <main></main>
    </>
  );
};

export default App;
