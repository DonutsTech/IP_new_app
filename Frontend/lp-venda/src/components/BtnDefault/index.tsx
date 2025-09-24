'use client'

import styles from './styles.module.scss';
import Image from 'next/image';
import arrow from '../../assets/icons/arrow.svg';
import Link from 'next/link';

interface BtnDefaultProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const BtnDefault = ({ label, onClick, href='/' }: BtnDefaultProps) => {
  return (
    <Link className={styles.btnDefault} onClick={onClick} href={href}>
      {label}
      <Image
        src={arrow}
        alt="Seta icon"
        width={24}
        height={24}
        className={styles.btnDefault_arrow}
        draggable={false}
        loading='lazy'
      />
    </Link>
  );
};

export default BtnDefault;