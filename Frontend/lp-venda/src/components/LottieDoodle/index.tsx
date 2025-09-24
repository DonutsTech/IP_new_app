import React from "react";
import Lottie from "lottie-react";
import animationData from "@/data/animation.json";
import styles from "./styles.module.scss";

const LottieDoodle: React.FC = () => (
  <div className={styles.lottieWrapper}>
    <Lottie
      animationData={animationData}
      loop
      rendererSettings={{
        preserveAspectRatio: "xMidYMid meet",
        imagePreserveAspectRatio: "xMidYMid meet",
      }}
    />
  </div>
);

export default LottieDoodle;