
export interface CheckoutService {
  ID_PLAN: string;
  ID_USER: string;
}

export const postCheckout = async (checkoutData: CheckoutService) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkoutData),
  });
};
