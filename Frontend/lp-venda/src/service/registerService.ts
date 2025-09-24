export interface RegisterUser {
  NAME: string;
  EMAIL: string;
  PHONE: string;
  HASHED_PASSWORD: string;
}

export const postRegister = async (user: RegisterUser) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log("Status HTTP:", res.status);
  if (!res.ok) {
    console.error("Erro ao registrar usuário:", await res.text());
    throw new Error("Falha no cadastro");
  } else {
    const data = await res.json();
    // console.log("Resposta do backend se cadastrou no banco de dados:", data);
    return data;
  }
};
