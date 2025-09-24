import styles from './styles.module.scss';
import FaqItem from '../FaqItem';
import { faq } from '../../data/faq';


const Faq = () => {
    return (
        <section id='faq' className={styles.section} aria-label='Seção de Perguntas Frequentes do site Interactiplay'>
            <div className={styles.container}>
                <h2 className={styles.faqTitle}>Perguntas Frequentes</h2>
                <div className={styles.faqList}>
                    {faq.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Faq;