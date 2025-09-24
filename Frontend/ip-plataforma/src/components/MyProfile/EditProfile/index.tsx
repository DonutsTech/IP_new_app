import styles from "../styles.module.scss";

const EditProfile = () => {
  const user = {
    NAME: "Donut's Tech",
    EMAIL: "donuts@donuts.tech",
    PHONE: "(11) 99999-9999",
  };
  return (
    <>
      <h3>Edite suas Informações</h3>
      <div className={styles.container_right_content}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" placeholder={user.NAME} />
        <label htmlFor="phone">Telefone</label>
        <input type="tel" id="phone" name="phone" placeholder={user.PHONE} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={user.EMAIL}
          disabled
        />
        <span>
          Não é permitido alterar o email, qualquer duvida entre em contato com
          o suporte.
        </span>

        <button type="submit" className={styles.btn}>
          Salvar
        </button>
      </div>
    </>
  );
};

export default EditProfile;
