import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { client } from '../../../utils/shopify'
import Image from 'next/image'

import CustomProductModal from './CustomProductModal/CustomProductModal'

import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '0px',
        color: '#003360',
        fontWeight: '600',
        boxShadow: 'none',
    },
    add: {
        color: '#028ab5',
        fontSize: '1.8rem',
    },
    remove: {
        color: 'red',
        fontSize: '1.8rem',
    }
}));

const customTypes = [
    'Mensaje en tapa',
]

export default function FirstStep ({step1Items, setStep1Items, setFirstStepPrice}) {
    const classes = useStyles();

    const collectionMYB1 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MjA2NDg3MjYxMA==';
    //var productsMYB1 = '';
    const [productsMYB1, setProductsMYB1] = useState(null)

    const [customModalActive, setCustomModalActive] = useState(false)
    const [currentCustomType, setCurrentCustomType] = useState('')
    const [productToAdd, setProductToAdd] = useState({})

    function openModal(product) {
        setCustomModalActive(true)
        setCurrentCustomType(product.vendor)
        setProductToAdd(product)
    }

    function closeModal() {
        setCustomModalActive(false)
        setProductToAdd({})
    }
    
    useEffect(() => {
        client.collection.fetchWithProducts(collectionMYB1, {productsFirst: 10}).then((collection) => {
            // Do something with the collection
            //console.log(collection)
            // Se convierte el objeto a JSON
            var parsedCollection = JSON.parse(JSON.stringify(collection));
    
            // Se guarda el objeto
            // productsMYB1 = parsedCollection.products;
            setProductsMYB1(parsedCollection.products);
            //console.log(parsedCollection.products)
        });
    }, [])


    function addItem(id, title, price, images, customAttributes, e) {
        e.preventDefault();

        setCustomModalActive(false)
        let imageToAdd 

        if(images[0] === undefined){
            imageToAdd = "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657"
        }else{
            imageToAdd = images[0].src
        }
        setStep1Items(
            {
                productID: id, 
                title: title, 
                price: price, 
                quantity: 1, 
                image: imageToAdd,
                customAttributes: customAttributes
            }
        );
        setFirstStepPrice(parseFloat(price))
    }

    /* const handleChange = (image, e) => {
        e.preventDefault();

        setStep1Items([{productID: e.target.value, quantity: 1, image: image,}]);
    }

    const removeItem = (id, e) => {
        e.preventDefault();
        const newItems = step1Items.filter(item => item.productID !== id)
        setStep1Items(newItems);
    } */

    return (
        <>
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Elige la Box que te gui??e el ojo</h2>
            </div>
            <div className={styles.productList}>
                <div className={styles.scrollContainer}>
                    <Grid container spacing={1}>
                        { productsMYB1 === null   ? 
                        <div className={styles.loader}>
                            <CircularProgress color="inherit" />
                        </div>
                            : 
                        productsMYB1.map((product) => (
                            <Grid item xs={6} sm={3}>
                                <div 
                                    className={styles.productContainer} 
                                    onClick={
                                        customTypes.indexOf(product.vendor) === -1 ?
                                        (e) => addItem(
                                                product.variants[0].id, 
                                                product.title, 
                                                product.variants[0].price, 
                                                product.images, 
                                                [{key: "Make Your Box", value: "Box"}], 
                                                e
                                            )
                                        :
                                        () => openModal(product)
                                    }
                                >
                                    <input className={styles.boxInput} 
                                        type="radio" 
                                        name={product.handle}
                                        id={product.id}
                                        checked={step1Items.productID === product.variants[0].id}
                                        value={product.variants[0].id}
                                        // onChange={(e) => addItem(product.variants[0].id, product.images[0].src, e)}
                                    />
                                    <label className={styles.forBoxInput} for={product.id}>
                                        <div className={styles.firstStepImage}>
                                            <Image
                                                src={product.images[0] !== undefined ? product.images[0].src : 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className={styles.description}>
                                            <div className={styles.productTitle}>{product.title}</div>
                                            <div>{product.variants[0].price === "0.00" ? '??Sin costo adicional!' : `$${product.variants[0].price}`}</div>
                                        </div>
                                    </label>
                                </div>
                            </Grid>
                        ))
                        }
                    </Grid>
                </div>
            </div>
        </div>

        {customModalActive &&
            <div className={styles.productDetailContainer}>
                <Fade in={customModalActive}>
                    <div>
                        <CustomProductModal
                            currentCustomType={currentCustomType}
                            productToAdd={productToAdd}
                            addItem={addItem}
                            closeModal={closeModal}
                        />
                    </div>
                </Fade>
            </div>
        }
        </>  
    )   
}