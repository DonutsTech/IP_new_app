import styles from "./styles.module.scss";

const ContentPrivacy = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.content_title}>Política de Privacidade</h1>

      <p>Última atualização: 23 de Agosto de 2025</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida
        ultricies sapien, nec viverra eros bibendum id. Sed id dapibus magna.
        Suspendisse at quam justo. Duis nec magna erat.
      </p>

      <h2>1. Coleta de Informações</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere
        consectetur dui, in facilisis mauris malesuada sit amet. Integer nec
        lectus at est tincidunt faucibus. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae.
      </p>

      <h2>2. Uso das Informações</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        convallis, risus ac interdum cursus, ex felis sodales purus, vitae
        consequat arcu est id mauris. Proin ac risus eget sapien sodales varius.
      </p>

      <h2>3. Compartilhamento de Dados</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Aliquam erat volutpat. Curabitur fermentum tincidunt dolor vel
        lacinia.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        tristique, turpis et dapibus fermentum, neque erat tincidunt felis, sit
        amet varius sapien mauris a eros. Integer tempor convallis viverra.
      </p>

      <h2>5. Segurança</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        viverra pharetra nisl, nec rhoncus metus pretium vel. Aliquam erat
        volutpat.
      </p>

      <h2>6. Direitos do Usuário</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac lacus at
        ipsum tempor fringilla. Morbi fermentum bibendum eros, vitae varius
        ligula euismod nec.
      </p>

      <h2>7. Alterações nesta Política</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
        nulla vitae sem porttitor maximus. Vivamus at mattis lorem. Proin ac
        arcu id ligula feugiat luctus.
      </p>

      <h2>Contato</h2>
      <p className={styles.content_pEmail}>
        Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato: <a className={styles.content_link} href="mailto:email@exemplo.com">email@exemplo.com</a>
      </p>
<br /><br />
    </div>
  );
};

export default ContentPrivacy;
