import classNames from "classnames";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faFileVideo, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

type PlanoCardProps = {
  title: string;
  price: string;
  plays: string;
  videoLimit: string;
  playExtra: string;
  selected?: boolean;
  notSelected?: boolean;
  onSelect: () => void;
};


const PlanoCard: React.FC<PlanoCardProps> = ({
  title,
  price,
  plays,
  videoLimit,
  playExtra,
  selected,
  notSelected,
  onSelect,
}) => {
  return (
    <div
      className={classNames({
        [styles.planoCard]: true,
        [styles.selected]: selected,
        [styles.notSelected]: notSelected,
        [styles.promo]: title === '14 dias Grátis',
      })}
      onClick={onSelect}
    >
      {(title === '14 dias Grátis') ? 
      (<>
        <h3>{title}</h3>
        <div className={styles.planoFree}>
          <p><FontAwesomeIcon icon={faCirclePlay} />{plays} plays</p>
          <p><FontAwesomeIcon icon={faFileVideo} />{videoLimit} vídeos</p>
          {selected && (
            <p className={styles.msg}> Ao fim dos 14 dias</p>
          )}
        </div>
      </>)
      :
      (<>
        <div className={styles.planoInfo}>
          <h3>{title}</h3>
          <p><FontAwesomeIcon icon={faCirclePlay} />{plays} plays/Mês</p>
          <p><FontAwesomeIcon icon={faFileVideo} />{videoLimit} vídeos</p>
          {!(title === '14 dias Grátis') && (
            <p><FontAwesomeIcon icon={faMoneyBill} />{playExtra}</p>
          )}
        </div>
        <div className={styles.planoPrice}>{price}</div>
      </>)
      }
    </div>
  );
}

export default PlanoCard;