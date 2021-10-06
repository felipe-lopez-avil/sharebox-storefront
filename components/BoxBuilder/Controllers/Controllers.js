import styles from './Controllers.module.scss'

export default function Controllers({currentStep, setCurrentStep, goNext, goPrev, addToCart}) {

    return (
        <div className={styles.container}>
            <div className={styles.total}>
                Total: <span className={styles.number}>$0.00</span>
            </div>
            <div className={styles.buttons}>
                { currentStep !== 0 ? 
                    <button onClick={() => goPrev()}>REGRESAR</button>
                : ''}
                
                { currentStep !== 3 ? 
                    <button onClick={() => goNext()}>CONTINUAR</button>
                : ''}

                { currentStep === 3 ? 
                    <button onClick={() => addToCart()}>COMPLETAR</button>
                : ''}
            </div>
        </div>
    )
}