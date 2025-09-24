import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";


const ValidationEmailCard: React.FC = () => {

    const param = useSearchParams();
    const token = param.get('token') || '';

    console.log("Token from URL:", token);

    useEffect(() => {
        const validateEmail = async () => {
          if(token){
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-email`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              console.log("Response status:", response.status);

              if (!response.ok) {
                throw new Error('Failed to validate email');
              }

              const data = await response.json();
            } catch (error) {
              console.error("Error validating email:", error);
            }
          }
        };

        validateEmail();
    }, [token]);

  return (
    <div className={styles.card}>
      <h2 className={styles.card_successTitle}>Email validado com sucesso!</h2>
      <button
        className={styles.card_successButton}
        onClick={() => (window.location.href = "/acess")}
      >
        Voltar ao Login
      </button>
    </div>
  );
};

export default ValidationEmailCard;
