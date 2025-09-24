import MyProfile from "@/components/MyProfile";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <MyProfile />
    </div>
  );
}
