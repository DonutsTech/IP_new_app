import styles from "../styles.module.scss";
// import styles from "./styles.module.scss";

const HistoryPayment = () => {
  return (
    <>
      <h3>Histórico de Gastos</h3>
      <div className={styles.container_right_content}>
        <h4 className={styles.container_right_content_title}>
          Acompanhe e tenha controle de seus gastos
        </h4>
        <div className={styles.container_right_content_info}>
          <p className={styles.container_right_content_info_text}>
            Clique no botão abaixo e acesse seu histórico de gastos
          </p>
          <a
            target="__blank"
            title="Acessar histórico de gastos"
            className={styles.container_right_content_info_btn}
          >
            Histórico de Gastos
          </a>
        </div>
      </div>
    </>
  );
};

export default HistoryPayment;
