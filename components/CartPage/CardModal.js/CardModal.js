import styles from './CardModal.module.scss'

import CloseIcon from '@material-ui/icons/Close';


export default function CardModal ({closeCardModal}) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.lateralBlock}></div>
                <div className={styles.title}>
                    Selecciona la tarjeta que quieras regalar
                </div>
                <div className={styles.lateralBlock}>
                    <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} onClick={closeCardModal} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.cardBox}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Birthday</div>
                </div>
                <div className={styles.cardBox}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Love</div>
                </div>
                <div className={styles.cardBox}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Just Because</div>
                </div>
            </div>
        </div>
    )
}