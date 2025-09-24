import styles from "../styles.module.scss";

const UserData = () => {
  const user = {
    NAME: "Donut's Tech",
    EMAIL: "donuts@donuts.tech",
    PHONE: "(11) 99999-9999",
  };
  return (
    <>
      <h3>Meus dados</h3>
      <div className={styles.container_right_content}>
        <br />
        <br />
        <div className={styles.datacontainer}>
          <h4>Nome</h4>
          <p>{user.NAME}</p>
          <h4>Email</h4>
          <p>{user.EMAIL}</p>
          <h4>Telefone</h4>
          <p>{user.PHONE}</p>
        </div>
      </div>
    </>
  );
};

export default UserData;
