'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { useState } from 'react';
import ModalHelp from '../ModalHelp';


const Help = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div 
        className={styles.helpButton}
        onClick={() => setModalOpen(true)}
      >
        <FontAwesomeIcon 
          icon={faCircleQuestion} 
          className={styles.helpButton_icon}
        />
      </div>
      {
        modalOpen && (
          <ModalHelp 
            onClose={() => setModalOpen(false)}
          />
        )
      }
    </>
  )
};

export default Help;
