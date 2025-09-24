import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./styles.module.scss";
import PasswordObligationList from "../PasswordObrigationList";
import { isPasswordValid } from "@/util/PassWordValidation";

interface InputPasswordProps {
  password: string;
  setPassword: (password: string) => void;
  repeatPassword: string;
  setRepeatPassword: (repeatPassword: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showRepeatPassword: boolean;
  setShowRepeatPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordFocus: boolean;
  setPasswordFocus: (focus: boolean) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
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
}) => {
  const isPasswordCompleted = isPasswordValid(password);

  return (
    <>
      <div
        className={classNames({
          [styles.form_inputGroup]: true,
          [styles.form_inputGroup_password]: true,
        })}
      >
        <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.form_inputGroup_input}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <button
          type="button"
          className={styles.form_inputGroup_password_showPasswordButton}
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Ocultar senha" : "Revelar senha"}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
        {
          passwordFocus && !isPasswordCompleted && (
            <PasswordObligationList password={password} />
          )
        }
      </div>

      <div
        className={classNames({
          [styles.form_inputGroup]: true,
          [styles.form_inputGroup_repeatPassword]: true,
          [styles.form_inputGroup_repeatPassword_correct]:
            repeatPassword != "" && repeatPassword === password,
        })}
      >
        <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
        <input
          type={showRepeatPassword ? "text" : "password"}
          placeholder="Repita sua Senha"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className={styles.form_inputGroup_input}
          required
        />
        <button
          type="button"
          className={styles.form_inputGroup_password_showPasswordButton}
          onClick={() => setShowRepeatPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showRepeatPassword ? "Ocultar senha" : "Revelar senha"}
        >
          {showRepeatPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      </div>
    </>
  );
};

export default InputPassword;