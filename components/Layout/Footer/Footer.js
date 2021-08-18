import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.links}>
                <h5 className={styles.sectionTitle}>Enlaces Rápidos</h5>
                <p className={styles.link}>Términos y condiciones</p>
                <p className={styles.link}>Aviso de Privacidad</p>
                <p className={styles.link}>Términos de Servicio</p>
                <p className={styles.link}>Política de Devoluciones</p>
            </div>
            <div className={styles.newsletter}>
                <h5 className={styles.sectionTitle}>Boletín</h5>
                <div className={styles.input}>
                    <div className={styles.textArea}>Dirección de email</div>
                    <div className={styles.button}>Suscribirse</div>
                </div>
            </div>
            <div className={styles.contact}>
                <h5 className={styles.sectionTitle}>Contacto</h5>
                <p className={styles.adress}>
                    Dirección: Lic. José Benitez 645, Col. Obispado, Monterrey, Nuevo León, México, C.P. 64060
                </p>
            </div>
        </div>
    )
}