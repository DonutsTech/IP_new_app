"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./styles.module.scss";

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  mercado: string;
}

const FormCadastro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    mercado: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log("Dados do formulário enviados:", formData);

    alert("Formulário enviado!");

    setFormData({
      nome: "",
      email: "",
      whatsapp: "",
      mercado: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__group}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.form__group}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.form__group}>
        <label htmlFor="whatsapp">WhatsApp</label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          placeholder="Digite seu WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.form__group}>
        <label htmlFor="mercado">Escolha o seu Setor</label>
        <select
          id="mercado"
          name="mercado"
          value={formData.mercado}
          onChange={handleChange}
          required
        >
          <option value="">Selecionar</option>
          <option value="automotivo">Produtores de infoprodutos</option>
          <option value="imobiliario">Nutracêuticos</option>
          <option value="varejo">Afiliados Profissionais</option>
          <option value="servicos">Coprodutores</option>
          <option value="saude">Agências de Lançamento</option>
        </select>
      </div>

      <button type="submit" className={styles.submit__button}>
        Enviar
      </button>
    </form>
  );
};

export default FormCadastro;