"use client";

import React, { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "./styles.module.scss";
import FormCadastro from "./FormCadastro";
import FormLogin from "./FormLogin";
import Planos from "./Planos";
import { useAccessType } from "@/context/AccessTypeContext";
import FormForgotPassword from "./FormForgotPassword";
import LottieDoodle from "@/components/LottieDoodle";
import logo from "@/assets/images/logo_white_dg.svg";
import Image from "next/image";
import Denied from "./Denied";
import { useState } from "react"
import FormNewPassword from "./FormNewPassword";

const Acesso = () => {
  const { accessType, selectedPlan, setAccessType } = useAccessType();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (paymentStatus === 'deny') {
      setAccessType('deny');
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url.toString());
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, [paymentStatus, setAccessType]);

  const renderAccessComponent = () => {
    if (selectedPlan) {
      return <FormCadastro />;
    }

    switch (accessType) {
      case "login":
        return <FormLogin />;
      case "cadastro":
        return <FormCadastro />;
      case "planos":
        return <Planos />;
      case "forgotPassword":
        return <FormForgotPassword />;
      case "deny":
        return <Denied />;
      case "done":
        return <FormLogin />;
      case "newPassword":
        return <FormNewPassword />;
      default:
        return <FormLogin />;
    }
  };

  if (!isReady) return null;

  return (
    <section className={styles.section} aria-label="Seção de Cadastro e Login">
      <div className={styles.section_content}>
        <div className={styles.section_content_left}>
          <div className={styles.section_content_left_animate}>
            <LottieDoodle />
          </div>
        </div>
        <div className={styles.section_content_overlay}></div>

        <div className={styles.section_content_right}>
          <Image
            src={logo}
            alt="Interactiplay Logo"
            className={styles.logo}
            draggable={false}
            width={300}
            priority
          />
          {renderAccessComponent()}
        </div>
      </div>
    </section>
  );
};

export default Acesso;
