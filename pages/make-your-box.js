import styles from '../styles/make-your-box.module.scss'

import MYBSection from '../components/MYBSection/MYBSection'

export default function MakeYourBox() {
    return (
        <div className={styles.makeYourBox}>

            {/*Columna izquierda. Sección donde se muestran los pasos del proceso así 
            como los porductos que llevas en el proceso*/}
            <div className={styles.summary}>
                <h2>PASOS MAKE YOUR BOX</h2>
            </div>

            {/*Columna derecha. Sección donde se muestran los productos a elegir*/}
            <div className={styles.choose}>
                <MYBSection title='¡PASO 1!'/>
                <MYBSection title='¡PASO 2!'/>
                <MYBSection title='¡PASO 3!'/>
                <MYBSection title='¡PASO 4!'/>
            </div>
            
            {/* <div className={styles.total}>
                <h2>Total: $999.99</h2>
            </div> */}
        </div>
    )
}