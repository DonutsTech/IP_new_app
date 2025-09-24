import FormCadastro from "../Form";
import styles from "./styles.module.scss";

const Contact = () => {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-label="Seção de Contato do site Interactiplay"
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Transforme sua Edição de Vídeo com a InteractiPlay!</h2>
          <p>
            Preencha o formulário para receber orientação personalizada sobre
            como a InteractPlay pode revolucionar sua edição de vídeo!
          </p>
        </div>
        <div className={styles.right}>
          <FormCadastro />
        </div>
      </div>
    </section>
  );
};

export default Contact;
