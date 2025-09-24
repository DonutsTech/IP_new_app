'use client';

import { useEffect, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from "./styles.module.scss";
import ContentPrivacy from "@/components/ComponentsPrivacy/Content";
import ContentPolicies from "@/components/ComponentsPolicies/Content";

interface ModalTermosProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTermos = ({ isOpen, onClose }: ModalTermosProps) => {
  // Fecha com ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (typeof window === 'undefined' || !document.body) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div
        className={styles.overlay_modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.overlay_modal_header}>
          <button
            type="button"
            className={styles.overlay_modal_closeBtn}
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className={styles.overlay_modal_content}>
          <ContentPolicies />
          <hr className={styles.overlay_modal_hr} />
          <ContentPrivacy />
        </div>
        <div className={styles.overlay_modal_footer}>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalTermos;
