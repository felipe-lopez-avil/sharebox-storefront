
import styles from './HowItWorks.module.scss'
import { IoMdGift, IoMdPaperPlane } from 'react-icons/io'
import { CgCardHearts } from 'react-icons/cg'
import { BiPaperPlane } from 'react-icons/bi'

export default function HowItWorks() {
    return(
        <div className={styles.HowItWorks}>
            <div className={styles.title}>
                <p>¿Cómo funciona?</p>
            </div>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <IoMdGift className={styles.icon} />
                    <h4>SELECCIONA UN REGALO</h4>
                </div>
                <div className={styles.step}>
                    <CgCardHearts className={styles.icon}/>
                    <h4>PERSONALIZA TU MENSAJE</h4>
                </div>
                <div className={styles.step}>
                    <BiPaperPlane className={styles.icon}/>
                    <h4>ENVÍA Y COMPARTE FELICIDAD</h4>
                </div>
            </div>
        </div>
    )
}