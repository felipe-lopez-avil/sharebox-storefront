import styles from './Controllers.module.scss'


export default function Controllers({currentStep, setCurrentStep, goNext, goPrev}) {
    return (
        <div className={styles.container}>
            <div className={styles.total}>
                Total: $0.00
            </div>
            <div className={styles.buttons}>
                { currentStep !== 0 ? 
                    <button onClick={() => goPrev()}>REGRESAR</button> 
                : ''}
                
                { currentStep !== 3 ? 
                    <button onClick={() => goNext()}>CONTINUAR</button>
                : ''}

                { currentStep === 3 ? 
                    <button onClick={() => goNext()}>COMPLETAR</button>
                : ''}
            </div>
        </div>
    )
}