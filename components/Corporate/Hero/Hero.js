import styles from './Hero.module.scss'

export default function Hero () {
    return (
        <div className={styles.heroSection} id="inicio">
            <div className={styles.heroImage}>
                <img src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Main_3b.png?v=1628265752"/>
            </div>
            <div className={styles.heroContent}>
                <h1>Tu generador <br/> de experiencias</h1>
                <div className={styles.separator}></div>
                <p>
                    Somos el mejor aliado de tu Negocio o Institución.
                    Creamos experiencias únicas, a través de BOXES personalizadas
                    para tus clientes, colaboradores y cualquier ocasión.
                </p>
                <button>¡Contáctanos ahora!</button>
            </div>
        </div>
    )
}