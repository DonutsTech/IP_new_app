"use client";
import { useEffect, useState } from "react";
import DotBG from "../DotBG";
import styles from "./styles.module.scss";
import { useIsMobileVideo } from "@/context/isMobileContext";
import BtnDefault from "../BtnDefault";
import { useAccessType } from "@/context/AccessTypeContext";

const Hero = () => {
  const isMobile = useIsMobileVideo();
  const [mounted, setMounted] = useState(false);

  const { setAccessType, setPromo } = useAccessType();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="Seção Hero do site Interactiplay"
    >
      <div className={styles.dotBGWrapper}>
        <DotBG
          dotSize={4}
          gap={16}
          baseColor="#000125"
          activeColor="#5B71B9"
          proximity={88}
          shockRadius={128}
          shockStrength={16}
          resistance={500}
          returnDuration={0.8}
        />
      </div>

      <div className={styles.hero_container}>
        <h1 className={styles.hero_container_title}>
          Edite seu VSL e aumente as suas conversões
        </h1>

        <h3 className={styles.hero_container_description}>
          A melhor ferramenta para infroprodutores. Desenvolvido para você
          vender mais.
        </h3>

        <BtnDefault
          label="Impulsionar as minhas Vendas"
          href="/acess"
          onClick={() => {
            setAccessType("cadastro");
            setPromo(false);
          }}
        />

        <div className={styles.hero_container_videoWrapper}>
          {
          mounted && (
            isMobile ? (
              <iframe
            srcDoc={`
              <video 
                src="/media/videos/mobileTeste.mp4" 
                autoplay 
                muted 
                loop 
                playsinline 
                style="width:100%; height:100%; border-radius:16px; object-fit:cover;">
                Seu navegador não suporta vídeo.
              </video>
            `}
            scrolling="no"
            allowFullScreen
            title="VideoLocal"
            className={styles.hero_container_videoMobile}
          />
            ) : (
              <iframe
            srcDoc={`
              <div id="interactPlayer" 
                data-id="0197fa85-af38-77db-9c33-6feea6f75433" 
                style="margin:0 auto; width:100%; height:100%; overflow:hidden;"></div>
              <script src="https://d2o4sllvj1jr8r.cloudfront.net/PlayerJs/player.min.js" defer></script>
            `}
            scrolling="no"
            allowFullScreen
            title="InteractPlayer"
            className={styles.hero_container_videoDesk}
          />
            )
          )
        }
          {/* <source src='/media/videos/exemple.mp4' type='video/mp4' /> */}
          
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
