"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import {
  faAlignLeft,
  faCircleXmark,
  faFileArrowDown,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classNames from "classnames";
import FormHelp from "../FormHelp";
import logo from "../../../public/media/images/logo_default_og.svg";
import Image from "next/image";
import Faq from "../Faq";

interface ModalHelpProps {
  onClose: () => void;
}

const ModalHelp = ({ onClose }: ModalHelpProps) => {
  const [option, setOption] = useState<"default" | "contato">("default");

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles.modal_header_icon}
            onClick={onClose}
          />
          <h2 className={styles.modal_header_title}>Conheça o Interactiplay</h2>
        </div>
        <div className={styles.modal_body}>
          {option === "default" && <p>Esta é a opção padrão.</p>}
          {option === "contato" && (
            <>
              <Faq />
              <FormHelp />
            </>
          )}
        </div>
        <div className={styles.modal_footer}>
          <Image
            src={logo}
            alt="Logo"
            className={styles.modal_footer_logo}
            width={936}
            height={158}
            loading="lazy"
            draggable={false}
          />
          <button
            className={classNames({
              [styles.modal_footer_button]: true,
              [styles.modal_footer_button_video]: true,
            })}
            disabled={option === "default"}
            onClick={() => setOption("default")}
          >
            Tutorial Interativo
            <FontAwesomeIcon
              icon={faPlay}
              className={styles.modal_footer_button_icon}
            />
          </button>
          <button
            className={classNames({
              [styles.modal_footer_button]: true,
              [styles.modal_footer_button_form]: true,
            })}
            disabled={option === "contato"}
            onClick={() => setOption("contato")}
          >
            Central de ajuda
            <FontAwesomeIcon
              icon={faAlignLeft}
              className={styles.modal_footer_button_icon}
            />
          </button>
          <button
            className={classNames({
              [styles.modal_footer_button]: true,
              [styles.modal_footer_button_download]: true,
            })}
            onClick={() => console.log("Baixar Manual")}
          >
            Manual de uso
            <FontAwesomeIcon
              icon={faFileArrowDown}
              className={styles.modal_footer_button_icon}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalHelp;
