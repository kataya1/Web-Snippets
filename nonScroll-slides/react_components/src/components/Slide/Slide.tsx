import React from "react";
import styles from "./Slide.module.css";

const Slide = ({ id, children }) => {
  return <section className={styles.slide}>{children}</section>;
};

export default Slide;
