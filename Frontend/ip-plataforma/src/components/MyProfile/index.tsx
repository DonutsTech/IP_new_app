"use client";

import { useState, useRef, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import UserData from "./UserData";
import EditProfile from "./EditProfile";
import HistoryPayment from "./HistoryPayment";
import MyPlan from "./MyPlan";


const MyProfile = () => {
  const user = {
    NAME: "Donut's Tech",
    AVATAR: "https://github.com/DonutsTech.png",
  };

  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeSection, setActiveSection] = useState("data");

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
    }
  };

  const renderRightContent = () => {
    switch (activeSection) {
      case "data":
        return <UserData />;
      case "editProfile":
        return <EditProfile />;
      case "billingHistory":
        return <HistoryPayment />;
      case "plan":
        return <MyPlan />;
      default:
        return <UserData />;
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div
            className={styles.avatarContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleAvatarClick}
          >
            <img
              src={user.AVATAR}
              alt="avatar"
              width={160}
              height={160}
              className={styles.avatarImage}
            />
            {isHovered && (
              <div className={styles.overlay}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className={styles.editIcon}
                />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <h4 className={styles.name}>{user.NAME}</h4>
          <div className={styles.btns}>
            <button
              className={styles.btn}
              onClick={() => setActiveSection("editProfile")}
            >
              Editar Informações de Perfil
            </button>
            <button
              className={styles.btn}
              onClick={() => setActiveSection("billingHistory")}
            >
              Histórico de Gastos
            </button>
            <button
             className={styles.btn}
             onClick={() => setActiveSection("plan")}
             >Meu Plano</button>
          </div>
        </div>
        <div className={styles.container_right}>{renderRightContent()}</div>
      </div>
    </div>
  );
};

export default MyProfile;
