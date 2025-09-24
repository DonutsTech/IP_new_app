"use client";

import styles from "../../../components/ComponentsAcess/Acesso/styles.module.scss"
import logo from "@/assets/images/logo_white_dg.svg";
import Image from "next/image";
import FormNewPassword from "@/components/ComponentsAcess/Acesso/FormNewPassword";
import '../page.scss'


const ResetPassword = () => {

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
					<FormNewPassword />
				</div>
			</div>
		</section>
	);
};


export default ResetPassword;
