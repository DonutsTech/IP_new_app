export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface PlanItem {
  ID: string;
  PLAN: string;
  PLAYS: number;
  PLAYS_PRICE: number;
  PRICE: number;
  STATUS: boolean;
  VIDEO_LIMIT: number;
  STRIPE_PLAN_ID: string;
  STRIPE_PLAN_PRICE: string;
  userPlanId : string;
}


export const fetchDataPlan = async () => {
  try {
    const response = await fetch(`${API_URL}/plans`);

    if (!response.ok) {
      throw new Error("Falha ao buscar os dados do plano");
    }
    const data = response.json();

    return data;
  } catch (error) {
    console.error(
      "Ocorreu um erro ao buscar os dados do plano, ERRO :" + error
    );
    return null;
  }
}