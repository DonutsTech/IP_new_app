"use client";
import React from "react";
import '../page.scss'
import ValidationEmailCard from "@/components/ComponentsAcess/Acesso/ValidationEmailCard";
import styles from "../../../components/ComponentsAcess/Acesso/styles.module.scss"
import logo from "@/assets/images/logo_white_dg.svg";
import Image from "next/image";

const ValidationEmail: React.FC = () => {
	


  return (
    <section className={styles.section} aria-label="Seção de Cadastro e Login">
			<div className={styles.section_content}>       
				<div className={styles.section_content_overlay}></div>

				<div className={styles.section_content_right}>
					<Image
						src={logo}
						alt="Interactiplay Logo"
						className={styles.logo}
						draggable={false}
						width={300}
						priority
					/>
					<ValidationEmailCard />
				</div>
			</div>
		</section>
  );
};

export default ValidationEmail;
