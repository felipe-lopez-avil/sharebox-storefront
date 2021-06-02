import styles from '../styles/box-to-go.module.scss'

export default function BoxToGo(){
    return (
        <div className={styles.PageContainer}>
            <div className={styles.PageTitle}>
                <h1>ALL BOXES</h1>
            </div>
            <div className={styles.Filters}>
                <h3>FILTROS</h3>
            </div>
            <div className={styles.ProductsDisplay}>
                <h3>PRODUCTOS</h3>
            </div>
        </div>
    )
}