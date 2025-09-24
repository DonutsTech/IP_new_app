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


const Menu = () => {
  const { isMobile } = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


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

              <div className={styles.menuMobile_content_nav}>
                <Link 
                  href={'/'}
                  className={styles.menuMobile_content_nav_link}
                  onClick={() => setOpen(false)}
                >
                  Home
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
                <Link 
                  href={'/'}
                  className={styles.menuDesk_nav_link}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
          </nav>
        </div>
      )}
    </>
  )
};

export default Menu;