import ContentPrivacy from "../Content";
import styles from "./styles.module.scss";
import BtnDefault from "@/components/BtnDefault";

const Privacy = () => {
  return (
    <section
      aria-label="Seção de termos de privacidade da plataforma interactiPlay"
      className={styles.section}
    >
      <ContentPrivacy />
      <BtnDefault href="/" label="Voltar para a página inicial" />
    </section>
  );
};

export default Privacy;
