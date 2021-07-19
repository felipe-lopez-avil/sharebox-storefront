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
    {   
        productId: 'ID5',
        name: 'Producto 5',
        price: 500,
    },
    {   
        productId: 'ID6',
        name: 'Producto 6',
        price: 500,
    },
]

export default function SecondStep ({step2Items, setStep2Items}) {

    function addItem(id, e) {
        e.preventDefault();

        var toAdd;
        var itemIndex = -1;

        if (step2Items.length > 0) {
            step2Items.map((item, index) => {
                if (item.productID === id) {
                    itemIndex = index
                }
            })
        }else{
            toAdd = {
                productID: id,
                quantity: 1,
            }
            setStep2Items([...step2Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                quantity: 1,
            }
            setStep2Items([...step2Items, toAdd]);
        }else{
            var newItems = [...step2Items];
            newItems[itemIndex].quantity = newItems[itemIndex].quantity + 1;
            setStep2Items(newItems);
        }

        console.log('Click: ' + id);
    }

    const removeItem = (id, e) => {
        e.preventDefault();

        var items = [...step2Items];
        console.log(items)
        console.log('ID del elemento por eliminar:')
        console.log(id)
    }

    const mostrarItems = (e) => {
        e.preventDefault();
        console.log(step2Items);
    }

    return(
        <div className = {styles.container}>
        <div className={styles.stepTitle}>
            <h2>Elige los Productos dentro de tu Box</h2>
        </div>
        <div className={styles.productList}>
            <div className={styles.scrollContainer}>
                <h3>PRODUCTOS</h3>
                <button onClick={ (e) => mostrarItems(e) }>Mostrar Step2Items</button>
                {testArray.map((product, index) => (
                    <div>
                        <h5>{product.name}</h5>
                        <div onClick={(e) => addItem(product.productId, e)}>Añadir producto</div>
                        <div name={product.productId} onClick={(e) => removeItem(product.productId, e)}>Eliminar producto</div>
                    </div>
                ))}
                {
                    step2Items.length === 0 ? 
                        <div style={{marginTop:'20px'}}>No hay ninguna caja seleccionada</div>
                    :
                        <div style={{marginTop:'20px'}}>
                            <div>
                                Los productos seleccionados son:
                            </div>
                            {step2Items.map(item => (
                                <div>{item.productID}</div>
                            ))}
                        </div>
                }
            </div>
        </div>
    </div>
    )
    
}