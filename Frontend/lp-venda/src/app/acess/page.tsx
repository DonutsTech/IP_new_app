'use client'


import Menu from '@/components/ComponentsAcess/Menu';
import './page.scss';
import Acesso from "@/components/ComponentsAcess/Acesso";
import { Suspense } from "react";
import { UserProvider } from '@/context/UserContext';

export default function Acess() {
  return (
    <>
      <UserProvider>
        <Menu />
        <Suspense fallback={
          <div className='loading'>
            <p>
              Carregando...
            </p>

          </div>
        }>
          <Acesso />
        </Suspense>
      </UserProvider>
    </>
  );
}
