'use client'

import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from '@/context/UserContext';
import { useAccessType } from "@/context/AccessTypeContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface DeniedProps {
  onFinish?: () => void;
}

const Denied = ({ onFinish }: DeniedProps) => {
  const [count, setCount] = useState(10);
  const { user } = useUser();
  const { setAccessType, setSelectedPlan } = useAccessType();
  const searchParams = useSearchParams();

  useEffect(() => {
    setAccessType('deny');
    const userId = searchParams.get('token');
    if (userId) {
      user.id = userId;
    }
    // Remove os params da URL
    const url = new URL(window.location.href);
    url.searchParams.delete('userId');
    window.history.replaceState({}, '', url.toString());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      setAccessType('planos');
      setSelectedPlan(null);
      if (onFinish) onFinish();
    }

    return () => clearInterval(interval);
  }, [count, setAccessType, setSelectedPlan, onFinish]);

  const handleClick = () => {
    setAccessType('planos');
    if (onFinish) onFinish();
  }

  return (
    <div className={styles.denied}>
      <h2>Algo deu errado <FontAwesomeIcon icon={faFaceFrownOpen} /></h2>
      <br />
      <p>Você será redirecionado para a página de planos.</p>
      <button onClick={handleClick}> ok {count}</button>
    </div>
  );
};

export default Denied;