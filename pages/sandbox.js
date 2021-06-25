import styles from '../styles/make-your-box.module.scss'

import SandBoxSlider from '../components/SliderMYB/SandBoxSlider'

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

                <SandBoxSlider/>

            </div>
            
            {/* <div className={styles.total}>
                <h2>Total: $999.99</h2>
            </div> */}
        </div>
    )
}