'use client';

// import Image from "next/image";
// import styles from "./page.module.css";

import Contact from "@/components/Contact";
import Counter from "@/components/Counter";
import Diference from "@/components/Diference";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Plan from "@/components/Plan";
import { useEffect } from "react";



export default function Home() {

  return (
    <>
      <Menu />
      <Hero />
      <Diference />
      <Features />
      <Counter />
      <Plan />
      <Contact />
      <Faq />
    </>
  );
}
