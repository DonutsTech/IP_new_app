'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import FlowPlataform from './FlowPlataform';
import MenuAcervo from './MenuAcervo';
import { DndContext } from '@dnd-kit/core';
import { useRef } from 'react';


const Flow = () => {
  const menuAcervoRef = useRef<{ closeMenu: () => void }>(null);

  const handleCloseMenu = () => {
    if (menuAcervoRef.current) {
      menuAcervoRef.current.closeMenu();
    }
  };

  return (
      <section className={styles.flow}>
        <DndContext>
          <MenuAcervo ref={menuAcervoRef} />
          <h2 className={styles.flow_title}>Flow</h2>
          <div className={styles.flow_name}>
            <label htmlFor="campanha_name"><FontAwesomeIcon icon={faPencil} /></label>
            <input type="text" id="campanha_name" placeholder="Nome da campanha" />
          </div>
          <FlowPlataform onVideoDropped={handleCloseMenu} />
        </DndContext>
      </section>
  )
};

export default Flow;
