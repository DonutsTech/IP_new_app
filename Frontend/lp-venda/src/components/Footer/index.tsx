'use client'
import styles from "./styles.module.scss";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import facebook from "../../../public/media/icons/logo-facebook.svg";
import instagram from "../../../public/media/icons/logo-instagram.svg";
import linkedin from "../../../public/media/icons/logo-linkedin.svg";
import twitter from "../../../public/media/icons/logo-twitter.svg";
import logo from "../../../public/media/icons/donutstechIcon.png";
import logoInteracti from "@/assets/images/logo_white_dg.svg";
import { useAccessType } from "@/context/AccessTypeContext";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void | null;
}

interface SocialLink extends FooterLink {
  imgIcon: StaticImageData;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {

  const { setAccessType } = useAccessType();

  const pagesLinks: FooterLink[] = [
    { label: "Início", href: "/#hero" },
    { label: "Recursos", href: "/#features" },
    { label: "Preços", href: "/#plan" },
    { label: "Contato", href: "/#contact" },
  ];

  const platformLinks: FooterLink[] = [
    { label: "Planos", href: "/#plan"},
    { label: "Cadastre-se", href: "/acess", onClick: () => {setAccessType('cadastro')}},
    { label: "Login", href: "/acess", onClick: () => {setAccessType('login')}},
  ];

  const aboutLinks: FooterLink[] = [
    { label: "Política de uso", href: "/policies" },
    { label: "Termos de privacidade", href: "/privacy" },
  ];

  const socialLinks: SocialLink[] = [
    { label: "Twitter", href: "#", imgIcon: twitter },
    { label: "Facebook", href: "#", imgIcon: facebook },
    { label: "Instagram", href: "#", imgIcon: instagram },
    { label: "LinkedIn", href: "#", imgIcon: linkedin },
  ];

  const sections: FooterSection[] = [
    { title: "Páginas", links: pagesLinks },
    { title: "Plataforma", links: platformLinks },
    { title: "Sobre", links: aboutLinks },
  ];

  return (
    <footer className={styles.footer} aria-label="Rodapé do site Interactiplay">
      <div className={styles.footer_content_wrapper}>
        <div className={styles.footer_brand}>
          <div className={styles.footer_logo}>
            <Image
              src={logoInteracti}
              alt="Logo da Interactiplay"
              draggable={false}
              loading='lazy'
            />
          </div>
          <p className={styles.footer_description}>
            Plataforma intuitiva para edição de vídeos para vendas.
          </p>
        </div>

        {sections.map((section, index) => (
          <div className={styles.footer_section} key={index}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    href={link.href}
                    onClick={link.onClick}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={`${styles.footer_section} ${styles.footer_social}`}>
          <h3>Redes Sociais</h3>
          <div className={styles.social_icons}>
            {socialLinks.map((link, index) => (
              <a href={link.href} key={index} aria-label={link.label}>
                <Image
                  src={link.imgIcon}
                  alt={`Ícone do ${link.label}`}
                  width={24}
                  height={24}
                  className={styles.social_icons_img}
                  draggable={false}
                  loading='lazy'
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer_copyright}>
        <p>&copy;InteractPlay - 2025 -Todos os direitos reservados</p>
        <a
          title="Acessar site da DonutsTech"
          target="__blank"
          href="https://www.donutstech.com.br/"
        >
          <p className={styles.footer_copyright_donuts}>
            Feito com amor e açucar - DonutsTech{" "}
            <Image
              src={logo}
              alt="Logo"
              width={24}
              height={19}
              className={styles.footer_copyright_donuts_img}
              draggable={false}
              loading='lazy'
            />
          </p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
