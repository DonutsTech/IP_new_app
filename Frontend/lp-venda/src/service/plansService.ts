
export interface PlansProps {
    ID: string,
    PLAN: string,
    PLAYS: number,
    PLAYS_PRICE: number,
    PRICE: number,
    STATUS: boolean,
    VIDEO_LIMIT: number
}
const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

export const getPlans = async () => {
  const res = await fetch(`${API_ROOT}/plans`);
  const data = await res.json();
  return data;
}