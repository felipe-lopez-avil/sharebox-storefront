import styles from './Controllers.module.scss'

export default function Controllers({currentStep, setCurrentStep, goNext, goPrev, addToCart, totalPrice, step1Items, step2Items, step3Items}) {

    const initialStep1Items = {productID: '', title: '', price: '', quantity: 1, image: '',}
    
    return (
        <div className={styles.container}>
            <div className={styles.total}>
                Total: <span className={styles.number}>${totalPrice}</span>
            </div>
            <div className={styles.buttons}>
                { currentStep !== 0 ? 
                    <button onClick={() => goPrev()}>REGRESAR</button>
                : ''}
                
                { currentStep !== 3 ? 
                    <button 
                        onClick={() => goNext()}
                        disabled={
                            ((currentStep === 0) & (step1Items.productID === '')) 
                            || ((currentStep === 1) & (step2Items.length === 0))
                            || ((currentStep === 2) & (step3Items.length === 0))
                            ? true : false
                        }
                        className={
                            ((currentStep === 0) & (step1Items.productID === '')) 
                            || ((currentStep === 1) & (step2Items.length === 0))
                            || ((currentStep === 2) & (step3Items.length === 0))
                            ? styles.disabled : ''
                        }
                    >
                        CONTINUAR
                    </button>
                : ''}

                { currentStep === 3 ? 
                    <button onClick={() => addToCart()}>COMPLETAR</button>
                : ''}
            </div>
        </div>
    )
}