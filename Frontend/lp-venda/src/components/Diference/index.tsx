'use client'

import Image from 'next/image';
import styles from './styles.module.scss';

import interfaceI from '../../assets/icons/interface.svg';
import recursos from '../../assets/icons/recursos.svg';
import renderizacao from '../../assets/icons/renderizacao.svg';
import BtnDefault from '../BtnDefault';
import { useAccessType } from '@/context/AccessTypeContext';


const Diference = () => {
  const { setAccessType, setPromo } = useAccessType();

  const diferenceData = [
    {
      img: interfaceI,
      title: 'interface intuitiva',
      text: 'Edição eficiente, acessível a iniciantes, sem necessidade de habilidades técnicas avançadas.'
    },
    {
      img: recursos,
      title: 'Recursos Avançados',
      text: 'Usabilidade simples e vasta gama de recursos avançados para criar vídeos profissionais e criativos.'
    },
    {
      img: renderizacao,
      title: 'Renderização Rápida',
      text: 'Renderização rápida e eficiente permitindo compartilhamento instantâneo.'
    }
  ];

  return (
    <section id='diference' className={styles.diference} aria-label='Seção Diferença do site Interactiplay'>
      <div className={styles.diference_container}>
        <div className={styles.diference_container_content}>
          {diferenceData.map((item, index) => (
            <div key={index} className={styles.diference_container_content_item}>
              <Image
                className={styles.diference_container_content_item_img}
                src={item.img}
                alt={item.title}
                width={64}
                height={64}
                draggable={false}
                loading='lazy'
              />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.diference_container_content_button}>
          <BtnDefault
            href='/acess'
            label='Experimente Grátis por 14 dias'
            onClick={() => {
              setAccessType('cadastro')
              setPromo(true)
            }}
          />
        </div>
      </div>
    </section>
  )
};

export default Diference;
