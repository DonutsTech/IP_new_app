import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className={styles.errorMessage}>
      <FontAwesomeIcon icon={faCircleExclamation} />
      {message}
    </p>
  );
};

export default ErrorMessage;