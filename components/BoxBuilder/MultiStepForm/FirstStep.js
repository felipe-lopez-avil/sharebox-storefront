import styles from './styles.module.scss'

const testArray = [
    {   
        productId: 'ID1',
        name: 'Producto 1',
        price: 500,
    },
    {   
        productId: 'ID2',
        name: 'Producto 2',
        price: 500,
    },
    {   
        productId: 'ID3',
        name: 'Producto 3',
        price: 500,
    },
    {   
        productId: 'ID4',
        name: 'Producto 4',
        price: 500,
    },
]

export default function FirstStep ({step1Items, setStep1Items}) {

    /* const addItem = (productId) => {
        console.log(productId)
    } */ 

    function addItem(id, e) {
        e.preventDefault();
        setStep1Items([id]);
        console.log('Click: ' + id);
    }

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Elige la Box que te guiñe el ojo</h2>
            </div>
            <div className={styles.productList}>
                <div className={styles.scrollContainer}>
                    <h3>CAJAS</h3>
                    {testArray.map(product => (
                        <div>
                            <h5>{product.name}</h5>
                            <div onClick={(e) => addItem(product.productId, e)}>Añadir producto</div>
                        </div>
                    ))}
                    {
                        step1Items.length === 0 ? 
                            <div style={{marginTop:'20px'}}>No hay ninguna caja seleccionada</div>
                        :
                            <div style={{marginTop:'20px'}}>
                                <div>
                                    Los productos seleccionados son:
                                </div>
                                {step1Items}
                            </div>
                    }
                </div>
            </div>
        </div>  
    )   
}