import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/media/images/DT_logo_footer.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <p>©InteractPlay - 2025 -Todos os direitos reservados</p>
        <Link
          className={styles.link}
          target="__blank"
          href="https://www.donutstech.com.br"
          title="Acessar site da DonutsTech"
        >
          <p>
            Feito com amor e açucar - DonutsTech{" "}
            <Image
              src={logo}
              alt="Logo"
              width={24}
              height={24}
              draggable={false}
              loading="lazy"
              className={styles.logo}
            />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
