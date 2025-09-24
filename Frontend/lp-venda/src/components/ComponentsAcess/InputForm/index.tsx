import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

interface InputFormProps {
  icon: IconDefinition;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const InputForm: React.FC<InputFormProps> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength,
}) => {
  return (
    <div className={styles.form_inputGroup}>
      <FontAwesomeIcon icon={icon} className={styles.inputIcon} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.form_inputGroup_input}
        maxLength={maxLength}
        required
      />
    </div>
  );
};

export default InputForm;