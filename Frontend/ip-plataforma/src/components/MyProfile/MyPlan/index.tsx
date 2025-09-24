import styles from "../styles.module.scss";
import { useEffect, useState } from "react";
import { fetchDataPlan, PlanItem } from "@/services/fetchDataPlan";

const MyPlan = () => {
  const [plano, setPlano] = useState<PlanItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const userPlanId = "dcee9637-6b39-4005-a65c-9e4dfd156410" 

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await fetchDataPlan();
        if (!data) {
          throw new Error("Dados do plano não encontrados.");
        }
        setPlano(data);
      } catch (error) {
        setErro(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
    console.log("Plano", plano);  
  }, []);

  if (loading) {
    return <p>Carregando seus dados...</p>;
  }
  if (erro) {
    return <p>Ocorreu um erro ao carregar os dados: {erro}</p>;
  }

  return (
    <>
      <h3>Meu Plano</h3>
      {(() => {
        const userPlan = plano?.find((p) => p.ID === userPlanId);
        return userPlan ? (
          <div key={userPlan.ID} className={styles.container_right_content}>
            <h4 className={styles.container_right_content_title}>
              {userPlan.PLAN}
            </h4>
            <div className={styles.container_right_content_info}>
              <h4>Beneficios :</h4>
              <div>
                <p className={styles.container_right_content_info_text}>
                  Plays : {userPlan.PLAYS}/mês
                </p>
                <p>
                  Ativo : {userPlan.STATUS ? "sim" : "não"}
                </p>
                <p>
                  Limite de vídeos: {userPlan.VIDEO_LIMIT}
                </p>
                <p>
                  Preço: {userPlan.PRICE.toLocaleString("pt-BR",{ style: "currency", currency: "BRL" })}
                </p>
                <p>
                  Preço por click: {userPlan.PLAYS_PRICE.toLocaleString("pt-BR",{ style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Plano do usuário não encontrado.</p>
        );
      })()}
    </>
  );
};

export default MyPlan;
