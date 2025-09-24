'use client'

import { MouseEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo_white_dg.svg';
import user from '@/assets/images/USER.svg';
import menuIcon from '@/assets/icons/logo_menu_mobile.svg';
import { useIsMobile } from '@/context/isMobileContext';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAccessType } from '@/context/AccessTypeContext';


const Menu = () => {
  const { isMobile } = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const { setAccessType, setPromo } = useAccessType();

  useEffect(() => {
    setMounted(true);
  }, []);


  const navLinkList = [
    {
      title: "Recursos",
      href: "#features"
    }, {
      title: "Preços",
      href: "#plan"
    }, {
      title: "Contato",
      href: "#contact"
    }
  ]



  if (!mounted) return null;
  return (
    <>
      {isMobile ? (
        <>
          <div
            className={styles.menuMobile_btn}
            onClick={() => setOpen(!open)}
          >
            <Image
              src={menuIcon}
              width={24}
              height={24}
              alt='Menu Icon'
              draggable={false}
              loading='lazy'
            />
          </div>
          <div
            className={classNames({
              [styles.menuMobile_overlay]: true,
              [styles.open]: open
            })}
            onClick={() => setOpen(false)}
          />
          <div className={classNames({
            [styles.menuMobile]: true,
            [styles.open]: open
          })}>
            <FontAwesomeIcon 
              icon={faXmark} 
              width={24}
              className={styles.menuMobile_closeIcon}
              onClick={() => setOpen(false)}
            />

            <div className={styles.menuMobile_content}>
              <Link 
                href={'/'}
                className={styles.menuMobile_content_logo}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setOpen(false);
                }}
              >
                <Image
                  src={logo}
                  width={238}
                  height={40}
                  alt='Logo da Interactiplay'
                  draggable={false}
                  loading='lazy'
                />
              </Link>

              {navLinkList.map((link) => (
                <Link 
                  key={link.title} 
                  href={link.href} 
                  className={styles.menuMobile_content_link}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              ))}

              <div className={styles.menuMobile_content_user}>
                <Link 
                  href={'/acess'}
                  className={styles.menuMobile_content_user_cadastro}
                  onClick={() => {
                    setOpen(false)
                    setAccessType('cadastro')
                    setPromo(false)
                  }}
                >
                  Cadastre-se
                </Link>
                <Link 
                  href={'/acess'}
                  className={styles.menuMobile_content_user_login}
                  onClick={() => {
                    setOpen(false)
                    setAccessType('login')
                    setPromo(false)
                  }}
                >
                  Login
                  <Image
                    src={user}
                    width={20}
                    height={24}
                    alt='Icon de usuario'
                    draggable={false}
                  />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.menuDesk}>
          <Link
            href={"/"}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={styles.menuDesk_logo}
          >
            <Image
              src={logo}
              width={238}
              height={40}
              alt='Logo da Interactiplay'
              draggable={false}
              loading='lazy'
            />
          </Link>

          <nav className={styles.menuDesk_nav}>
            {navLinkList.map((link) => (
              <Link key={link.title} href={link.href} className={styles.menuDesk_nav_link}>
                {link.title}
              </Link>
            ))}
          </nav>

          <div className={styles.menuDesk_acess}>
            <Link
              href={'/acess'}
              className={styles.menuDesk_acess_cadastro}
              onClick={() => {
                setAccessType('cadastro')
                setPromo(false)
              }}
            >
              Cadastre-se
            </Link>
            <Link
              href={'/acess'}
              className={styles.menuDesk_acess_login}
              onClick={() => {
                setAccessType('login')
                setPromo(false)
              }}
            >
              Login
              <Image
                src={user}
                width={20}
                height={24}
                alt='Icon de usuario'
                draggable={false}
                loading='lazy'
              />
            </Link>
          </div>
        </div>
      )}
    </>
  )
};

export default Menu;
