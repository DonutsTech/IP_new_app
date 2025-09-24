"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useAccessType } from "@/context/AccessTypeContext";
import InputForm from "@/components/ComponentsAcess/InputForm";
import { loginService } from "@/service/loginService";

const FormLogin: React.FC = () => {
  const { setAccessType } = useAccessType();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    const EMAIL = email;
    const HASHED_PASSWORD = password;

    loginService({ EMAIL, HASHED_PASSWORD })
      .then((res) => {
        console.log(res);
        if (res.accessToken) {
          // localStorage.setItem("accessToken", res.accessToken);
          // window.location.href = "/dashboard";
          alert("Login efetuado com sucesso!");
        }
      })
      .catch((err) => {
        console.log(err);
      });


  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <p>Faça login para ter acesso a todos os recursos do site.</p>
      <div className={styles.loginContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputForm
            icon={faEnvelope}
            type="email"
            placeholder="Endereço de Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            icon={faLock}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.form_forgotPassword}>
            <Link
              href="/acess"
              className={styles.form_forgotPassword_forgotPasswordLink}
              onClick={() => {
                setAccessType("forgotPassword");
              }}
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <button type="submit" className={styles.form_loginButton}>
            Login
          </button>
        </form>

        <p className={styles.loginContainer_signupText}>
          Ainda não possui uma conta?
          <Link
            title="Ir para a página de cadastro"
            href="/acess"
            onClick={() => {
              setAccessType("cadastro");
            }}
            className={styles.loginContainer_signupText_signupLink}
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;