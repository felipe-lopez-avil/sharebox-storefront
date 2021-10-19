import styles from './Controllers.module.scss'
import CircularProgress from '@mui/material/CircularProgress';

export default function Controllers({currentStep, setCurrentStep, goNext, goPrev, addToCart, totalPrice, step1Items, step2Items, step3Items, orderSent}) {

    const initialStep1Items = {productID: '', title: '', price: '', quantity: 1, image: '',}
    
    return (
        <div className={styles.container}>
            <div className={styles.total}>
                Total: <span className={styles.number}>${totalPrice}</span>
            </div>
            <div className={styles.buttons}>
                { currentStep !== 0 ? 
                    <button onClick={() => goPrev()}>Regresar</button>
                : ''}
                
                { currentStep !== 3 ? 
                    <button 
                        onClick={() => goNext()}
                        disabled={
                            ((currentStep === 0) & (step1Items.productID === '')) 
                            || ((currentStep === 1) & (step2Items.length === 0))
                            ? true : false
                        }
                        className={
                            ((currentStep === 0) & (step1Items.productID === '')) 
                            || ((currentStep === 1) & (step2Items.length === 0))
                            ? styles.disabled : ''
                        }
                    >
                        Continuar
                    </button>
                : ''}

                { currentStep === 3 ? 
                    <button onClick={() => addToCart()} className={styles.progressButton}>
                        {orderSent ? 
                            <CircularProgress color="inherit" size={20}/>
                            :
                            'Completar'
                        }
                    </button>
                : ''}
            </div>
        </div>
    )
}