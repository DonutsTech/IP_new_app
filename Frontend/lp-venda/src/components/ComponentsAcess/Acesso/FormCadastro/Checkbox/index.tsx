"use client";

import styles from "./styles.module.scss";
import ModalTermos from "@/components/ComponentsAcess/Acesso/FormCadastro/ModalTermos";
import { useState } from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        Li e aceito os
        <span className={styles.linkModal} onClick={() => { onChange(false); setModalOpen(true); }}>termos de privacidade</span>
      </label>
      <ModalTermos isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <br />
    </div>
  );
};

export default CheckBox;
