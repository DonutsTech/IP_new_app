'use client';

import styles from "./styles.module.scss";

const ContentPolicies = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.content_title}>Políticas de Uso</h1>

      <p>Última atualização: 23 de Agosto de 2025</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida
        ultricies sapien, nec viverra eros bibendum id. Sed id dapibus magna.
        Suspendisse at quam justo. Duis nec magna erat.
      </p>

      <h2>1. Aceitação das Condições</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere
        consectetur dui, in facilisis mauris malesuada sit amet. Integer nec
        lectus at est tincidunt faucibus. Ao acessar e usar nossos serviços,
        você concorda com estas políticas de uso.
      </p>

      <h2>2. Uso Permitido</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        habitasse morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. O usuário deve utilizar a plataforma apenas para fins legais e
        conformes às regras estabelecidas.
      </p>

      <h2>3. Conduta do Usuário</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac lacus at
        ipsum tempor fringilla. Morbi fermentum bibendum eros, vitae varius
        ligula euismod nec. É proibido realizar ações que prejudiquem a
        plataforma ou outros usuários.
      </p>

      <h2>4. Conteúdo Gerado pelo Usuário</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
        nulla vitae sem porttitor maximus. O usuário é responsável pelo conteúdo
        que publicar ou compartilhar. A plataforma reserva-se o direito de
        remover conteúdos que violem estas políticas.
      </p>

      <h2>5. Limitação de Responsabilidade</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        viverra pharetra nisl, nec rhoncus metus pretium vel. A plataforma não
        se responsabiliza por perdas ou danos decorrentes do uso do serviço.
      </p>

      <h2>6. Alterações nas Políticas</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at
        mattis lorem. Proin ac arcu id ligula feugiat luctus. As políticas podem
        ser atualizadas a qualquer momento, sendo recomendável revisá-las
        periodicamente.
      </p>

      <h2>7. Contato</h2>
      <p>
        Caso tenha dúvidas sobre estas Políticas de Uso, entre em contato:        <a className={styles.content_link} href="mailto:email@exemplo.com">
          email@exemplo.com
        </a>
      </p>

      <br />
      <br />
    </div>
  );
};

export default ContentPolicies;
