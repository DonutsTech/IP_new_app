import ContentPolicies from '../../ComponentsPolicies/Content';
import styles from './styles.module.scss'
import BtnDefault from "@/components/BtnDefault";

const Policies = () => {
  return (
    <section aria-label='Seção de Política de Uso da plataforma interactiPlay' className={styles.section}>
      <ContentPolicies />
      <BtnDefault href="/" label="Voltar para a página inicial" />
    </section>
  )
}

export default Policies;
