import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessType } from "@/context/AccessTypeContext";
import { useUser } from "@/context/UserContext";
import {
  isPasswordValid,
  getPasswordValidationMessage,
} from "@/util/PassWordValidation";
import { validarCelularBRCompleto } from "@/util/validatePhoneBR";
import { isValidName } from "@/util/NameValidation";
import { postRegister } from "@/service/registerService";
import { postCheckout } from "@/service/checkoutService";

const useFormCadastro = () => {
  const { setAccessType, selectedPlan } = useAccessType();
  const { setUser } = useUser();
  const router = useRouter();
  // abaixo estados do formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  //padroniza o email
  const formatMail = (email: string) => {
    setEmail(email.trim().toLowerCase());
  };

  //Máscara do telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let maskedValue = "";
    if (rawValue.length > 0) {
      maskedValue = "(" + rawValue.substring(0, 2);
    }
    if (rawValue.length > 2) {
      maskedValue += ") " + rawValue.substring(2, 7);
    }
    if (rawValue.length > 7) {
      maskedValue += "-" + rawValue.substring(7, 11);
    }
    setPhone(maskedValue);
  };

  // submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validações do formulário
    if (!isValidName(name)) {
      setErrorMessage(
        "Nome inválido. Use pelo menos 4 letras e apenas letras, espaços ou apóstrofo."
      );
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMessage(
        getPasswordValidationMessage(password) || "Senha inválida."
      );
      return;
    }

    if (!validarCelularBRCompleto(phone)) {
      setErrorMessage(
        "Telefone inválido. Informe um número de celular válido do Brasil."
      );
      return;
    }

    formatMail(email);

    // Validação do e-mail via backend
    try {
      const res = await fetch("/api/validate-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.valid) {
        setErrorMessage(
          "Erro ao validar e-mail. Por favor insira um e-mail válido."
        );
        return;
      }
    } catch {
      setErrorMessage(
        "Erro ao validar domínio do e-mail. Por favor insira um e-mail válido."
      );
      return;
    }

    //Cadastro no backend

    try {
      const data = await postRegister({
        NAME: name,
        EMAIL: email,
        PHONE: phone,
        HASHED_PASSWORD: password,
      });

      // console.log(data.ID);

      // salva no contexto
      setUser({
        id: data.ID,
        name,
        email,
      });

      // se houver plano, inicia checkout stripe
      if (selectedPlan) {
        // Caso 1: Usuário veio da LP e já escolheu o plano. Redireciona para o checkout.
        try {
          const check = await postCheckout({
            ID_PLAN: selectedPlan.ID,
            ID_USER: data.ID,
          });

          const checkoutData = await check.json();

          if (!checkoutData.url) return;

          window.location.href = checkoutData.url;

        } catch (error) {
          setErrorMessage("Erro ao redirecionar para o checkout.");
        }
      } else {
        // Caso 2: Usuário fez o cadastro diretamente. Redireciona para a tela de planos.
        setAccessType("planos");
        router.push("/acess");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao redirecionar para o checkout.");
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone: handlePhoneChange,
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
  };
};

export default useFormCadastro;
