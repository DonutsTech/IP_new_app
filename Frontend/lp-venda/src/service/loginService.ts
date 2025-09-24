
export interface loginProps {
  EMAIL: string;
  HASHED_PASSWORD: string;
}


const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

export const loginService = async (data: loginProps) => {
  const response = await fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};