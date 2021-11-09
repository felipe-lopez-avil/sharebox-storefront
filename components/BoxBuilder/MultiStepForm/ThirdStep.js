import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { client } from '../../../utils/shopify'
import Image from 'next/image'

import ProductDetailModal from './ProductDetailModal/ProductDetailModal';
import CustomProductModal from './CustomProductModal/CustomProductModal';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import Fade from '@mui/material/Fade';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        border: '2px solid #e9e9e9',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
    grow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    logoBlue: {
        color: '#028ab5',
        cursor: 'pointer',
        marginRight: '-5px',
    },
    padding: {
        padding: '0px 3%',
        paddingBottom: '200px'
    }
}));

const customTypes = [
    'Mensaje en Globo',
]
    
export default function ThirdStep ({step3Items, setStep3Items, thirdStepPrice, setThirdStepPrice}) {

    const collectionMYB3 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3Mjc5NTMzNjg2Ng=='
    const classes = useStyles();

    const [checked, setChecked] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [catTitle, setCatTitle] = useState('')

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
        setCurrentCustomType('')
        setProductToAdd({})
    }

    const [productDetailActive, setProductDetailActive] = useState(false)
    const [currentProductDeatil, setCurrentProductDeatil] = useState(
        {
            id: '',
            title: '',
            price: '',
            description: '',
            images: []
        }
    )

    const [productsMYB3, setProductsMYB3] = useState(null)

    const openPopup = (category, categoryTitle, e) => {
        e.preventDefault();
        setChecked(true);
        setCatTitle(categoryTitle)
        setActiveCategory(category)
    };

    const closePopup = (e) => {
        e.preventDefault();
        setChecked(false);
        setActiveCategory(null);
        setCatTitle('')
    };

    useEffect(() => {
        client.collection.fetchWithProducts(collectionMYB3, {productsFirst: 250}).then((collection) => {
            // Do something with the collection

            // Se convierte el objeto a JSON
            var parsedCollection = JSON.parse(JSON.stringify(collection));

            // Se guarda el objeto
            // productsMYB1 = parsedCollection.products;
            setProductsMYB3(parsedCollection.products);
            //console.log(productsMYB3)
        });
    }, [])

    const showProductDetails = (id, title, price, description, images) => {
        setProductDetailActive(true)
        setCurrentProductDeatil(
            {
                id: id,
                title: title,
                price: price,
                description: description,
                images: images
            }
        )
    }

    function addItem(id, title, price, images, customAttributes, e) {
        e.preventDefault();

        setCustomModalActive(false)
        setProductDetailActive(false)

        let imageToAdd 
        if(images[0] === undefined){
            imageToAdd = "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657"
        }else{
            imageToAdd = images[0].src
        }

        var toAdd;
        var itemIndex = -1;

        if (step3Items.length > 0) {
            step3Items.map((item, index) => {
                if (item.productID === id) {
                    itemIndex = index
                }
            })
        }else{
            toAdd = {
                productID: id,
                title: title,
                price: price,
                quantity: 1,
                image: imageToAdd,
                customAttributes: customAttributes,
            }
            setStep3Items([...step3Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                title: title,
                price: price,
                quantity: 1,
                image: imageToAdd,
                customAttributes: customAttributes,
            }
            setStep3Items([...step3Items, toAdd]);
        }else{
            var newItems = [...step3Items];
            newItems[itemIndex].quantity = newItems[itemIndex].quantity + 1;
            setStep3Items(newItems);
        }

        setThirdStepPrice(thirdStepPrice + parseFloat(price))
    }

    const removeItem = (id, e) => {
        e.preventDefault();
        const newItems = step3Items.filter(item => item.productID !== id)
        const removedItems = step3Items.filter(item => item.productID === id)
        const removedItem = removedItems[0]
        setStep3Items(newItems);
        setThirdStepPrice(thirdStepPrice - (parseFloat(removedItem.price) * removedItem.quantity))
    }

    return(
        <>
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Acompaña tu Box con un detalle especial</h2>
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cardGrid}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <div className={styles.categoryCard3}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('Flores', 'Flores', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/flowersIcon.svg" layout="fill" objectFit="contain"/>
                                    </div>
                                    <h4>Flores</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={styles.categoryCard3}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('Globos', 'Globos', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/balloonIcon.svg" layout="fill" objectFit="contain"/>
                                    </div>
                                    <h4>Globos</h4>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>


            <Grow in={checked} className={classes.grow}>
                <div className={styles.productsContainer}>
                    <div className={styles.categoryTitle}>
                        <div className={styles.goBack} onClick={(e) => {closePopup(e)}}>
                            <ArrowBackIosIcon className={classes.logoBlue}/>
                            <div>Volver</div>
                        </div>
                        <div className={styles.title}>
                            {catTitle}
                        </div>
                    </div>
                    <Grid container spacing={3} className={classes.padding}>
                    {
                        productsMYB3 === null ? 
                        '' :
                        productsMYB3.filter(item => item.productType === activeCategory).map(product => (
                            <Grid item xs={6} sm={3}>
                                <div className={styles.productContainer}>
                                    <input className={styles.boxInput}
                                        type="checkbox"
                                        id={product.id}
                                        value={product.variants[0].id}
                                        checked={(step3Items.map(function(e) { return e.productID; }).indexOf(product.variants[0].id)) > -1}
                                    />
                                    <label className={styles.forBoxInput} for={product.id}>
                                        <div className={styles.productImage}>
                                            <Image
                                                src={
                                                    product.images[0] !== undefined ? 
                                                    product.images[0].src 
                                                    : 
                                                    'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'
                                                }
                                                layout="fill"
                                                objectFit="cover"
                                                onClick={() => showProductDetails(product.variants[0].id, product.title, product.variants[0].price, product.description, product.images)}
                                            />
                                        </div>
                                        <div className={styles.actionButtons}>
                                            <div className={styles.notSelected}>
                                                <div 
                                                    className={styles.addButton} 
                                                    onClick={
                                                        customTypes.indexOf(product.vendor) === -1 ?
                                                        (e) => addItem(
                                                            product.variants[0].id, 
                                                            product.title, 
                                                            product.variants[0].price, 
                                                            product.images, 
                                                            [{key: "Make Your Box", value: "Outside Box"}],
                                                            e
                                                        )
                                                        :
                                                        () => openModal(product)
                                                    }
                                                >
                                                    AGREGAR
                                                </div>
                                            </div>
                                            <div className={styles.selected}>
                                                <div className={styles.trashButton} onClick={(e) => removeItem(product.variants[0].id, e)}>
                                                    <DeleteOutlineOutlinedIcon/>
                                                </div>
                                                <div className={styles.plusButton} onClick={(e) => addItem(product.variants[0].id, product.title, product.variants[0].price, product.images, [], e)}>
                                                    <AddOutlinedIcon/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.description}>
                                            <div className={styles.productTitle}>{product.title}</div>
                                            <div className={`${product.variants[0].compareAtPrice !== null ? styles.offerPrice : ''}`}>
                                                {product.variants[0].price === "0.00" ? 
                                                    '¡Sin costo adicional!' 
                                                    : `$${product.variants[0].price}`
                                                }
                                                {product.variants[0].compareAtPrice !== null ?
                                                    <span className={styles.compareAtPrice}>${product.variants[0].compareAtPrice}</span>
                                                    : 
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
            </Grow>
        </div>  

        {productDetailActive &&
            <div className={styles.productDetailContainer}>
                <Fade in={productDetailActive}>
                    <div>
                        <ProductDetailModal 
                            setProductDetailActive={setProductDetailActive} 
                            currentProductDeatil={currentProductDeatil}
                        />
                    </div>
                </Fade>
            </div>
        }
        
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