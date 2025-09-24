import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useAccessType } from '@/context/AccessTypeContext';

export interface Plano {
  id: string;
  title: string;
  price: string;
  plays: string;
  videoLimit: string;
  playExtra: string;
}

const planosData: Plano[] = [
  {
    id: 'price_1RS0ZXHs4q3jg2YIJWSBIDmn',
    title: 'Essencial',
    price: 'R$ 89,90',
    plays: '6000 Plays',
    videoLimit: 'limite de acervo 20 vídeos',
    playExtra: 'Play adicional 0,05',
  },
  {
    id: 'price_1RS0ajHs4q3jg2YIJvRrQ4zm',
    title: 'Profissional',
    price: 'R$ 249,90',
    plays: '25000 Plays',
    videoLimit: 'limite de acervo 50 vídeos',
    playExtra: 'Play adicional 0,03',
  },
  {
    id: 'price_1RykTQHs4q3jg2YIjzyIno8D',
    title: 'Empresarial',
    price: 'R$ 499,90',
    plays: '50000 Plays',
    videoLimit: 'limite de acervo 100 vídeos',
    playExtra: 'Play adicional 0,02',
  }
];

const planoPromocionalData: Plano = {
  id: 'price_1RRwpvHs4q3jg2YIiKOWlGvo',
  title: '14 dias Grátis',
  price: 'R$ 0,00',
  plays: '1000 Plays',
  videoLimit: 'limite de acervo 10 vídeos',
  playExtra: 'Plano exclusivo',
};

const usePlanos = () => {
  const { promo: promoContext } = useAccessType();
  const { user } = useUser();
  const [selectedPlanos, setSelectedPlanos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isPromocao = typeof window !== 'undefined' && promoContext;
  const planosParaExibir = isPromocao ? [planoPromocionalData, ...planosData] : planosData;
  const customerEmail = user.email;
  const customerName = user.name;

  const handleSelectPlan = (plano: Plano) => {
    const isPromo = plano.title === '14 dias Grátis';
    const isSelected = selectedPlanos.includes(plano.id);
    const essencial = planosParaExibir.find(p => p.title === 'Essencial');
    const promo = planosParaExibir.find(p => p.title === '14 dias Grátis');

    if (isPromo) {
      if (isSelected) {
        setSelectedPlanos(selectedPlanos.filter(id => id !== plano.id && id !== (essencial?.id || '')));
      } else {
        setSelectedPlanos([plano.id, essencial?.id].filter(Boolean) as string[]);
      }
    } else {
      if (isSelected) {
        if (promo && plano.id === essencial?.id && selectedPlanos.includes(promo.id)) {
          setSelectedPlanos(selectedPlanos.filter(id => id !== plano.id && id !== promo.id));
        } else {
          setSelectedPlanos(selectedPlanos.filter(id => id !== plano.id));
        }
      } else {
        setSelectedPlanos([plano.id]);
      }
    }
  };

  const handleSubscribe = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (selectedPlanos.length === 0) {
      setErrorMessage("Por favor, selecione um plano para continuar.");
      return;
    }
    if (!customerEmail) {
      setErrorMessage("E-mail do cliente não encontrado. Por favor, volte ao formulário.");
      return;
    }

    setLoading(true);

    const planoParaAssinar = selectedPlanos[0];

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planoParaAssinar,
          customerEmail,
          name: customerName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ocorreu um erro na subscrição.");
      }

      const data = await response.json();

      if (data.checkout_session_url) {
        window.location.href = data.checkout_session_url;
      } else {
        setSuccessMessage(data.message || "Assinatura gratuita criada com sucesso!");
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    planosParaExibir,
    selectedPlanos,
    loading,
    errorMessage,
    successMessage,
    handleSubscribe,
    handleSelectPlan,
  };
};

export default usePlanos;