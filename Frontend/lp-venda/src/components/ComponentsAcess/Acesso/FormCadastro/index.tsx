"use client";

import React from "react";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import Link from "next/link";
import CheckBox from "@/components/ComponentsAcess/Acesso/FormCadastro/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormCadastro from "@/hooks/useFormCadastro";
import InputForm from "@/components/ComponentsAcess/InputForm";
import InputPassword from "@/components/ComponentsAcess/InputPassword";
import ErrorMessage from "@/components/ComponentsAcess/ErrorMessage";

const FormCadastro = () => {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setShowRepeatPassword,
    passwordFocus,
    setPasswordFocus,
    errorMessage,
    isTermsAccepted,
    setIsTermsAccepted,
    handleSubmit,
    setAccessType,
  } = useFormCadastro();

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>
      <p>Cadastre-se para ter acesso a todos os recursos do site.</p>
      <div className={styles.registerContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputForm
            icon={faUser}
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputForm
            icon={faEnvelope}
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            icon={faPhone}
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e)}
          />
          <InputPassword
            password={password}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showRepeatPassword={showRepeatPassword}
            setShowRepeatPassword={setShowRepeatPassword}
            passwordFocus={passwordFocus}
            setPasswordFocus={setPasswordFocus}
          />
          <CheckBox
            checked={isTermsAccepted}
            onChange={(checked) => setIsTermsAccepted(checked)}
          />

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <button
            type="submit"
            className={styles.form_cadastroButton}
            disabled={!isTermsAccepted}
          >
            Cadastrar
          </button>
        </form>

        <p className={styles.registerContainer_signupText}>
          Já possui uma conta?
          <Link
            title="Ir para a página de login"
            href="/acess"
            onClick={() => {
              setAccessType("login");
            }}
            className={styles.registerContainer_signupText_signupLink}
          >
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormCadastro;