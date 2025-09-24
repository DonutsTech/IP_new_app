'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useAccessType } from '@/context/AccessTypeContext';
import InputForm from '@/components/ComponentsAcess/InputForm';
import { useRouter } from 'next/navigation';

const FormForgotPassword: React.FC = () => {
  const { setAccessType } = useAccessType();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {


    e.preventDefault();
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Por favor, insira seu email.');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ EMAIL: email })
      });
      const data = await res.json();
      if (res.ok && data.MESSAGE && data.TOKEN ) {
        setSuccess(true);
        router.push(`/acess/resetpassword?token=${encodeURIComponent(data.TOKEN as string)}`);
      } else {
        setErrorMessage(data.error || 'Erro ao enviar email.');
      }
    } catch (err) {
      setErrorMessage('Erro ao enviar email.');
    }
  };

  return (
    <div className={styles.passwordResetContainer}>
      {success ? (
        <div className={styles.successContainer}>
          <h2 className={styles.title}>Email enviado!</h2>
          <p className={styles.description}>
            Verifique seu email e siga o link para redefinir sua senha.
          </p>
          <Link href='/acess' className={styles.form_backButton} onClick={() => setAccessType('login')}>
            Voltar para login
          </Link>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>Esqueceu sua senha?</h2>
          <p className={styles.description}>
            Digite abaixo o Email cadastrado para receber o link de redefinição de senha.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputForm
              icon={faEnvelope}
              type="email"
              placeholder="Endereço de Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <button type="submit" className={styles.form_resetButton}>
              Redefinir Senha
            </button>

            {errorMessage && (
              <p className={styles.errorMessage} style={{ color: 'red', marginTop: '8px', textAlign: 'center' }}>{errorMessage}</p>
            )}
          </form>
          <Link href='/acess' className={styles.form_backButton} onClick={() => setAccessType('login')}>
            Voltar
          </Link>
        </>
      )}
    </div>
  );
};

export default FormForgotPassword;