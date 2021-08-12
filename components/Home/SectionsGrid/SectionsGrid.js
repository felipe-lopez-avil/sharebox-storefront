import styles from './SectionsGrid.module.scss'
import Image from 'next/image'

export default function SectionsGrid() {
    return (
        <div className={styles.container}>
            <div className={styles.leftCol}>
                <div className={styles.mainSection}>
                    <div className={styles.sectionHeader}>
                        <h4>Kits armados y Ready To Go!</h4>
                        <button>Ir a Ready To Go</button>
                    </div>
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.upperSection}>
                    <div className={`${styles.halfSectionHeader} ${styles.textRight}`}>
                        <h4>Encuentra la Box Perfecta para cada ocasión</h4>
                        <button>Box To Go</button>
                    </div>
                </div>
                <div className={styles.downSection}>
                    <div className={styles.halfSectionHeader}>
                        <h4>Pequeños detalles para demostrar tu afecto</h4>
                        <button>Out of The Box</button>
                    </div>
                </div>
            </div>
        </div>
    )
}