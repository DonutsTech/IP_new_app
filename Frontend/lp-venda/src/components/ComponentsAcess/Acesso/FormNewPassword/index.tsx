"use client";
import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import InputPassword from '@/components/ComponentsAcess/InputPassword';
import { isPasswordValid, getPasswordValidationMessage } from '@/util/PassWordValidation';
import { useParams, useSearchParams } from 'next/navigation';
import ValidationPasswordCard from '@/components/ComponentsAcess/Acesso/ValidationPasswordCard';
// import { useRouter } from 'next/router';

const FormNewPassword: React.FC = () => {
  const [code, setCode] = useState('');
  const codeRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repeatError, setRepeatError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  // const param = useParams();
  const param = useSearchParams();
  const token = param.get('token') || '';

  console.log("Token from URL:", token);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccessMessage(null);
    setPasswordError(null);
    setRepeatError(null);

    if (!code || code.length !== 4) {
      setCodeError('Informe o código de 4 dígitos');
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError(getPasswordValidationMessage(password) || 'Senha inválida.');
      return;
    }
    if (password !== repeatPassword) {
      setRepeatError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          HASHED_PASSWORD: password,
          CODE: code,
        }),
      });

      const data = await response.json();
      if (response.ok && data.MESSAGE) {
        setSuccessMessage(data.MESSAGE);
        setPasswordError(null);
        setRepeatError(null);
      } else {
        setGlobalError(data.MESSAGE || 'Erro ao redefinir senha.');
      }
    } catch (err) {
      setGlobalError('Erro de conexão. Tente novamente.');
    }
  };

  if (successMessage) {
    return <ValidationPasswordCard />;
  }

  return (
    <div className={styles.passwordResetContainer}>
      <h2 className={styles.title}>Redefinir Senha</h2>
      <p className={styles.description}>
        Informe o código recebido por e-mail e escolha uma nova senha.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_inputGroup}>
          <label htmlFor="code">Código recebido por e-mail</label>
          <input
            id="code"
            ref={codeRef}
            className={`${styles.form_inputGroup_input} ${styles.tokenInput}`}
            type="text"
            value={code}
            onChange={e => {
              setCodeError(null);
              const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
              setCode(val);
            }}
            required
            placeholder="Código (4 números)"
            inputMode="numeric"
            maxLength={4}
            pattern="[0-9]{4}"
          />
          {codeError && <p className={styles.errorMessage}>{codeError}</p>}
        </div>
        <div>
          <InputPassword
            password={password}
            setPassword={val => {
              setPasswordError(null);
              setPassword(val);
            }}
            repeatPassword={repeatPassword}
            setRepeatPassword={val => {
              setRepeatError(null);
              setRepeatPassword(val);
            }}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showRepeatPassword={showRepeatPassword}
            setShowRepeatPassword={setShowRepeatPassword}
            passwordFocus={passwordFocus}
            setPasswordFocus={setPasswordFocus}
          />
          {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
          {repeatError && <p className={styles.errorMessage}>{repeatError}</p>}
        </div>
        {globalError && <p className={styles.errorMessage} style={{marginTop: '8px', marginBottom: '8px', textAlign: 'center'}}>{globalError}</p>}
        <button type="submit" className={styles.form_resetButton}>
          Redefinir Senha
        </button>
      </form>
    </div>
  );
};

export default FormNewPassword;