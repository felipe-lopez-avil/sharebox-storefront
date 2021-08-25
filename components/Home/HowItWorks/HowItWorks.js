
import styles from './HowItWorks.module.scss'
import { IoMdGift, IoMdPaperPlane } from 'react-icons/io'
import { CgCardHearts } from 'react-icons/cg'
import { BiPaperPlane } from 'react-icons/bi'

export default function HowItWorks() {
    return(
        <div className={styles.HowItWorks}>
            <div className={styles.title}>
                <h3>¿Cómo funciona?</h3>
            </div>
            <div className={styles.steps}>
                <div className={styles.stepRow}>
                    <div className={styles.step}>
                        <IoMdGift className={styles.icon} />
                        <h4>Selecciona un Regalo</h4>
                    </div>
                    <div className={styles.step}>
                        <CgCardHearts className={styles.icon}/>
                        <h4>Personaliza tu Mensaje</h4>
                    </div>
                </div>
                <div className={styles.stepRow}>
                    <div className={styles.step}>
                        <BiPaperPlane className={styles.icon}/>
                        <h4>Envía y Comparte Felicidad</h4>
                    </div>
                    <div className={styles.step}>
                        <CgCardHearts className={styles.icon}/>
                        <h4>Personaliza tu Mensaje</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}