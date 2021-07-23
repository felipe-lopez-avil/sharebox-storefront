import styles from './styles.module.scss'
import { useState } from 'react'
import { client } from '../../../utils/shopify'

const testArray = [
    {   
        productId: 'ID1',
        name: 'Caja 1',
        price: 500,
    },
    {   
        productId: 'ID2',
        name: 'Caja 2',
        price: 500,
    },
    {   
        productId: 'ID3',
        name: 'Caja 3',
        price: 500,
    },
    {   
        productId: 'ID4',
        name: 'Caja 4',
        price: 500,
    },
]

export default function FirstStep ({step1Items, setStep1Items}) {

    const collectionMYB1 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjA2NDg3MjYxMA==';
    //var productsMYB1 = '';
    const [productsMYB1, setProductsMYB1] = useState(null)

    client.collection.fetchWithProducts(collectionMYB1, {productsFirst: 4}).then((collection) => {
        // Do something with the collection

        // Se convierte el objeto a JSON
        var parsedCollection = JSON.parse(JSON.stringify(collection));

        // Se guarda el objeto
        // productsMYB1 = parsedCollection.products;
        setProductsMYB1(parsedCollection.products);
    });

    function addItem(id, image, e) {
        e.preventDefault();

        var toAdd;
        var itemIndex = -1;

        if (step1Items.length > 0) {
            step1Items.map((item, index) => {
                if (item.productID === id) {
                    itemIndex = index
                }
            })
        }else{
            toAdd = {
                productID: id,
                quantity: 1,
                image: image,
            }
            setStep1Items([...step1Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                quantity: 1,
                image: image,
            }
            setStep1Items([...step1Items, toAdd]);
        }else{
            var newItems = [...step1Items];
            newItems[itemIndex].quantity = newItems[itemIndex].quantity + 1;
            setStep1Items(newItems);
        }
    }

    const removeItem = (id, e) => {
        e.preventDefault();
        const newItems = step1Items.filter(item => item.productID !== id)
        setStep1Items(newItems);
    }

    const show = (e) => {
        e.preventDefault();
        console.log(productsMYB1);
    }

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Elige la Box que te guiñe el ojo</h2>
            </div>
            <div className={styles.productList}>
                <div className={styles.scrollContainer}>
                    <h3>CAJAS</h3>
                    <button onClick={(e) => show(e)}>Mostrar objeto</button>
                    {productsMYB1 === null ? 
                    <h5>productsMYB1 es undefined</h5> 
                        : 
                    productsMYB1.map((product) => (
                        <div>
                            <h5>{product.title}</h5>
                            <div onClick={(e) => addItem(product.variants[0].id, product.images[0].src, e)}>Añadir producto</div>
                            <div onClick={(e) => removeItem(product.variants[0].id, e)}>Eliminar producto</div>
                        </div>
                    ))
                    }
                    {/*productsMYB1.map((product) => (
                        <div>
                            <h5>{product.title}</h5>
                            <div onClick={(e) => addItem(product.variants[0].id, e)}>Añadir producto</div>
                            <div onClick={(e) => removeItem(product.variants[0].id, e)}>Eliminar producto</div>
                        </div>
                    ))*/}
                    {/* {
                        step1Items.length === 0 ? 
                            <div style={{marginTop:'20px'}}>No hay ninguna caja seleccionada</div>
                        :
                            <div style={{marginTop:'20px'}}>
                                <div>
                                    Los productos seleccionados son:
                                </div>
                                {step1Items}
                            </div>
                    } */}
                </div>
            </div>
        </div>  
    )   
}