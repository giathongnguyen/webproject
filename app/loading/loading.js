import React from "react";
import styles from "./pokeball.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.pokeball}></div>
    </div>
  );
};

export default Loading;
