/* eslint-disable @next/next/no-img-element */

'use client'

import { useIsMobile } from '@/context/isMobileContext';
import styles from './styles.module.scss'
import { faPowerOff, faSquareCaretDown, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../public/media/images/logo_white_dg.svg'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useState } from 'react';
import classNames from 'classnames';


const Menu = () => {

  const { isMobile } = useIsMobile();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const user = {
    // NAME: USER.NAME || "John Doe",
    NAME: "Donut's Tech",
    // AVATAR: USER.AVATAR || "https://github.com/DonutsTech.png",
    AVATAR: "https://github.com/DonutsTech.png",
  };


  return (
    <>
      <div className={styles.menuDesk} >
        <Link
          href="/"
          className={styles.menuDesk_link}
        >
          <Image
            className={styles.menuDesk_link_logo}
            src={logo}
            alt="Logo"
            width={936}
            height={157}
            draggable={false}
            loading={'lazy'}
          />
        </Link>
        <nav className={styles.menuDesk_nav}>
          <Link 
            href={"/"}
            className={styles.menuDesk_nav_link}
          >
            Flow
          </Link>
          <Link
            href={"/"}
            className={styles.menuDesk_nav_link}
          >
            Meus Videos
          </Link>
          <Link
            href={"/"}
            className={styles.menuDesk_nav_link}
          >
            Campanhas
          </Link>
        </nav>

        <div className={styles.menuDesk_user}>
          <img
            className={styles.menuDesk_user_avatar}
            src={user.AVATAR}
            alt={user.NAME}
            width={40}
            height={40}
            draggable={false}
            loading={'lazy'}
          />
          <div
            className={classNames({
              [styles.menuDesk_user_menu]: true,
              [styles.menuDesk_user_menu_open]: dropDownOpen
            })}
            onClick={() => setDropDownOpen(!dropDownOpen)}
          >
            <p className={styles.menuDesk_user_menu_name}>{user.NAME}</p>
            <FontAwesomeIcon
              icon={faSquareCaretDown}
              className={styles.menuDesk_user_menu_icon}
            />
          </div>

          <div className={classNames({
            [styles.menuDesk_user_menu_dropdown]: true,
            [styles.menuDesk_user_menu_dropdown_open]: dropDownOpen
          })}>
            <Link
              href={'/perfil'}
              className={styles.menuDesk_user_menu_dropdown_link}
              onClick={(e: MouseEvent) => {
                // e.preventDefault();
                setDropDownOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faUserAstronaut}
                className={styles.menuDesk_user_menu_dropdown_icon}
              />
              <p
                className={styles.menuDesk_user_menu_dropdown_text}>
                Meu Perfil 
              </p>
            </Link>
            <Link
              href={'/'}
              className={styles.menuDesk_user_menu_dropdown_link}
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                setDropDownOpen(false);
              }}>
              <FontAwesomeIcon icon={faPowerOff}
                className={styles.menuDesk_user_menu_dropdown_icon}
              />
              <p
                className={styles.menuDesk_user_menu_dropdown_text}>
                Sair
              </p>
            </Link>

          </div>
        </div>

      </div>
    </>
  )
};

export default Menu;
