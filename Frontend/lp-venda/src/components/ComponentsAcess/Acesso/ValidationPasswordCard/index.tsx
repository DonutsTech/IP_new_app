import React from "react";
import styles from "./styles.module.scss";



const ValidationPasswordCard = () => {
  return (
  <div className={styles.card}>
    <h2 className={styles.card_successTitle}>Senha alterada com sucesso!</h2>
    <button
      className={styles.card_successButton}
      onClick={() => (window.location.href = "/acess")}
    >
      Voltar ao Login
    </button>
  </div>
  );
};

export default ValidationPasswordCard;
