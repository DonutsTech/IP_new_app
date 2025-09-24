/* eslint-disable @typescript-eslint/no-unused-expressions */
import styles from "./styles.module.scss";
import PlanCards from "../PlanCards";
import { useEffect, useState } from "react";
import { getPlans } from "@/service/plansService";
import type { PlansProps } from "@/service/plansService";

const Plan = () => {
  const [planos, setPlanos] = useState<PlansProps[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      // console.log('Retorno da API de planos:', data);
      setPlanos(data.reverse());
    };
    fetchPlans();
  }, []);

  return (
    <section id="plan" className={styles.section} aria-label="Seção de Planos do site Interactiplay">
      <div className={styles.header}>
        <h2>Planos</h2>
        <p>Conheça nossos planos e escolha o que mais se adeque a você!</p>
      </div>
      <div className={styles.container}>

        {
          planos.length !== 0 && (planos.map((plan) => (
            plan.PLAN !== "14 dias Grátis" && (
              <PlanCards key={plan.ID} plan={plan} />
            )
          )))
        }
      </div>
    </section>
  );
};
// <PlanCards key={plan.ID} plan={plan} />

export default Plan;
