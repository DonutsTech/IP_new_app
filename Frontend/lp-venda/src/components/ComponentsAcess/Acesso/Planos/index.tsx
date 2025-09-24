'use client';

import { useEffect, useState } from 'react';
import { useAccessType } from '@/context/AccessTypeContext';
import { useUser } from '@/context/UserContext';
import styles from './styles.module.scss';
import PlanoCard from './PlanoCard';
import { getPlans, PlansProps } from '@/service/plansService';
import { postCheckout } from '@/service/checkoutService';

const Planos = () => {

  const [planos, setPlanos] = useState<PlansProps[]>([]);
  const { promo, setAccessType } = useAccessType();
  const { user } = useUser();
  const userID = user.id;
  const [selectedPlanos, setSelectedPlanos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      setPlanos(data.reverse());
    };
    fetchPlans();
  }, []);


  const handleSubscribe = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (selectedPlanos.length === 0) {
      setErrorMessage("Por favor, selecione um plano para continuar.");
      return;
    }

    const planID = selectedPlanos[0];

    if (!planID) {
      setErrorMessage("plano não encontrado.");
      return;
    }

    if (!userID) {
      setErrorMessage("cliente não encontrado. Por favor, volte ao formulário.");
      setTimeout(() => {
        setAccessType('cadastro');
      }, 5000);
      return;
    }

    setLoading(true);

    try {
      const response = await postCheckout({
        ID_PLAN: planID,
        ID_USER: userID,
      });
      // Espera a resposta JSON
      const data = await response.json();
      console.log(data);

      if (!data) { return; }
      window.location.href = data.URL;
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

  return (
    <>
      <div className={styles.planoContainer}>
        <h2 className={styles.planoContainer_title}>Escolha seu plano!</h2>
  <p className={styles.planoContainer_description}>Olá {user.name?.split(' ')[0]}, escolha o plano que melhor se adeque a você!</p>
        <div className={styles.planoCards}>
          {planos
            .filter(plano => promo ? true : plano.PLAN !== '14 dias Grátis')
            .map((plano) => {
              const isPromo = plano.PLAN === '14 dias Grátis';
              const isSelected = selectedPlanos.includes(plano.ID);
              const notSelected = selectedPlanos.length > 0 && !isSelected;
              return (
                <PlanoCard
                  key={plano.ID}
                  title={plano.PLAN}
                  price={plano.PRICE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  plays={plano.PLAYS.toLocaleString('pt-BR')} 
                  videoLimit={plano.VIDEO_LIMIT.toString()}
                  playExtra={plano.PLAYS_PRICE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  selected={isSelected}
                  notSelected={notSelected}
                  onSelect={() => {
                    if (isPromo) {
                      const essencial = planos.find(p => p.PLAN === 'Essencial');
                      if (isSelected) {
                        setSelectedPlanos(selectedPlanos.filter(id => id !== plano.ID && id !== (essencial?.ID || '')));
                      } else {
                        setSelectedPlanos([plano.ID, essencial?.ID].filter(Boolean) as string[]);
                      }
                    } else {
                      const promoPlano = planos.find(p => p.PLAN === '14 dias Grátis');
                      const essencial = planos.find(p => p.PLAN === 'Essencial');
                      if (isSelected) {
                        if (promoPlano && plano.ID === essencial?.ID && selectedPlanos.includes(promoPlano.ID)) {
                          setSelectedPlanos(selectedPlanos.filter(id => id !== plano.ID && id !== promoPlano.ID));
                        } else {
                          setSelectedPlanos(selectedPlanos.filter(id => id !== plano.ID));
                        }
                      } else {
                        setSelectedPlanos([plano.ID]);
                      }
                    }
                  }}
                />
              );
            })}
        </div>

        <button
          className={styles.subscribeButton}
          onClick={handleSubscribe}
          disabled={selectedPlanos.length === 0 || loading}
        >
          {loading ? 'Processando...' : 'Assinar'}
        </button>

        {(errorMessage || successMessage) && (
          <div className={styles.messageContainer}>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default Planos;
