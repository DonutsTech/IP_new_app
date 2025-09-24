import styles from "./styles.module.scss";
import AnimatedCounter from "../AnimatedCounter";
import { metricsData } from "../../data/metrics";

const Counter = () => {
  return (
    <div className={styles.section} aria-label="Seção de Dados da plataforma Interactiplay"
    id="counter">
        {metricsData.map((metric) => (
          <AnimatedCounter
            key={metric.id}
            finalValue={metric.finalValue}
            type={metric.type}
            label={metric.label}
            prefix={metric.prefix}
            duration={2}
          />
        ))}
    </div>
  );
};

export default Counter;
