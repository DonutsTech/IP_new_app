import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface PasswordObligationListProps {
  password: string;
}

const PasswordObligationList: React.FC<PasswordObligationListProps> = ({
  password,
}) => {
  const isLengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className={styles.passwordTooltip}>
      <strong>Sua senha deve conter:</strong>
      <ul>
        <li className={classNames({ [styles.correct]: isLengthValid })}>
          Mínimo de 8 caracteres
        </li>
        <li className={classNames({ [styles.correct]: hasUpperCase })}>
          Pelo menos uma letra maiúscula
        </li>
        <li className={classNames({ [styles.correct]: hasLowerCase })}>
          Pelo menos uma letra minúscula
        </li>
        <li className={classNames({ [styles.correct]: hasNumber })}>
          Pelo menos um número
        </li>
        <li className={classNames({ [styles.correct]: hasSpecialChar })}>
          Pelo menos um caractere especial
        </li>
      </ul>
    </div>
  );
};

export default PasswordObligationList;