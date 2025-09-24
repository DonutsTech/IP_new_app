"use client";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useAccessType } from "../../context/AccessTypeContext";
import { PlansProps } from "@/service/plansService"
import Link from "next/link";
import classNames from "classnames";

interface PlanCardsProps {
  plan: PlansProps;
}

const PlanCards: React.FC<PlanCardsProps> = ({ plan }) => {
  const { setSelectedPlan, setAccessType } = useAccessType();

  const features = [plan.VIDEO_LIMIT];
  const playsIncluded = plan.PLAYS;
  const pricePerPlay = (plan.PLAYS_PRICE).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSelectPlan = () => {
    setSelectedPlan(plan);
    setAccessType("cadastro");
  };

  return (
    <div className={classNames({
      [styles.planCard]: true,
      [styles.popular]: plan.PLAN === "Profissional",
    })}>
      {plan.PLAN === "Profissional" && <div className={styles.popularBadge}>MAIS POPULAR</div>}
      <div className={styles.header}>
        <h2>{plan.PLAN}</h2>
        <p className={styles.price}>
          <span>{plan.PRICE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> /mês
        </p>
      </div>
      <div className={styles.content}>
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index}>
              <FontAwesomeIcon
                icon={faCheck}
                width={16}
                className={styles.checkmarkIcon}
              />{" "}
              limite de acervo {feature} vídeos
            </li>
          ))}
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              width={16}
              className={styles.checkmarkIcon}
            />{" "}
            {playsIncluded} Plays
            <FontAwesomeIcon
              icon={faCircleInfo}
              width={16}
              className={styles.infoIcon}
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCheck}
              width={16}
              className={styles.checkmarkIcon}
            />{" "}
            {pricePerPlay
              ? pricePerPlay
              : plan.PLAYS_PRICE}{" "}
            por play extra
          </li>
        </ul>
      </div>
      <Link href="/acess" onClick={handleSelectPlan}>
        Selecionar
      </Link>
    </div>
  );
};

export default PlanCards;