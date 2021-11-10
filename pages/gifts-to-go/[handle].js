import React, {useState, useEffect} from 'react'
import styles from '../../styles/product.module.scss'
import Head from 'next/head'
import {client} from '../../utils/shopify'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    background: {
        backgroundColor: '#0188b3'
    }
}));

const getDataFromStorage = (key) => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem(key))
}

const setDataToStorage = (key, data) => {
    const storage = window.localStorage;
    storage.setItem(key, JSON.stringify(data))
}

const parseData = (data) => {
    return JSON.parse(JSON.stringify(data))
}

export default function GTGProduct ({product, collection}) {

    const classes = useStyles();
    //console.log(product)
    let multipleImages = false
    let activeImageTemp
    
    if(product.images.length > 0){
        multipleImages = true;
        activeImageTemp = product.images[0].src
    }else{
        activeImageTemp = "https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657"
    }

    const collectionBS = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3ODkwODMzODMzOA=="
    const [products, setProducts] = useState([])
    const [slides, setSlides] = useState(4)

    const [activeImage, setActiveImage] = useState(activeImageTemp)
    const [multiVariants, setMultiVariants] = useState(false)
    const [formData, setFormData] = useState({})
    const [windowReady, setWindowReady] = useState(false)
    const [attributes, setAttributes] = useState([])
    const [checkout, setCheckout] = useState(null)
    const [productAdded, setProductAdded] = useState(false)

    const openSnackbar = () => {
        setProductAdded(true)
    }

    const closeSnackbar = () => {
        setProductAdded(false)
    }

    useEffect(() => {
        // console.log(product)
        if(typeof window !== 'undefined'){
            setWindowReady(true)
        }

        if(product.variants.length > 1){
            setMultiVariants(true);

            let firstFormData = {};
            product.options.map(option => {
                const updatedFirstFormData = {
                    ...firstFormData,
                    [option.name]: option.values[0].value
                }
                firstFormData = updatedFirstFormData;
            })
            setFormData(firstFormData);
        }

        if(window.innerWidth >= 890){
            setSlides(4)
        }else if(window.innerWidth >= 650){
            setSlides(3)
        }else if(window.innerWidth >= 350){
            setSlides(2)
        }else{
            setSlides(1)
        }

        client.collection.fetchWithProducts(collectionBS, {productsFirst: 6}).then((collection) => {
            // Do something with the collection
            setProducts(JSON.parse(JSON.stringify(collection.products)))
        });

    }, [])

    // Accordion Controller
    const [dropActive, setDropActive] = useState(false)
    const handleDropActive = () => {
        setDropActive(!dropActive);
    };

    // State for the Active Variant Index
    const [variantIndex, setVariantIndex] = useState(0);

    // handle the change of the product variations options
    const handleChange = (event) => {
        
        const updatedFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }

        setFormData(updatedFormData);
        const valuesArray = Object.values(updatedFormData);
        
        product.variants.map((variant, index) => {

            let match = true;
            variant.selectedOptions.map((selectedOption, index) => {
                if(selectedOption.value !== valuesArray[index]){
                    match = false;
                }
            })

            if(match === true){
                setVariantIndex(index);
                

                if(product.variants[index].image !== null & product.variants[index].image !== ''){
                    setActiveImage(product.variants[index].image.src)
                } 
                /* console.log("La variante activa es:")
                console.log(index) */
            }

        })
    }

    const handleAttributesChange = (event) => {
        /* console.log(event.target.name)
        console.log(event.target.value) */

        let attributeIndex = attributes.map(function(e) { return e.key; }).indexOf(event.target.name);

        if(attributeIndex <= -1){
            let newAttributes = [...attributes, {key: event.target.name, value: event.target.value}]
            setAttributes(newAttributes)
        }else{
            const attributesTemp = attributes
            attributesTemp[attributeIndex] = {key: event.target.name, value: event.target.value}
            setAttributes(attributesTemp)
        }
    }

    const addToCart = async () => {

        setProductAdded(true);

        // Local Storage is checked to see if a CheckoutID already exists. If not, a new one is created;
        let checkoutId = null
        let checkoutTemp = null
        let checkout = null
        if (getDataFromStorage('checkoutId')) {
            checkout = await client.checkout.fetch(getDataFromStorage('checkoutId'))
            if (checkout.completedAt === null){
                checkoutId = getDataFromStorage('checkoutId')
            }else{
                checkoutTemp = await client.checkout.create()
                checkout = parseData(checkoutTemp)
                checkoutId = checkout.id
                setDataToStorage('checkoutId', checkoutId)
            }
        }else{
            checkoutTemp = await client.checkout.create()
            checkout = parseData(checkoutTemp)
            checkoutId = checkout.id
            setDataToStorage('checkoutId', checkoutId)
        }
        
        const lineItemsToAdd = [
        {
            variantId: product.variants[variantIndex].id,
            quantity: 1,
            customAttributes: attributes
        }
        ];

        checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)

    }

    if(windowReady){
        const changeSlidesPerView = () => {
            if(window.innerWidth >= 890){
                setSlides(4)
            }else if(window.innerWidth >= 650) {
                setSlides(3)
            }else if(window.innerWidth >= 350){
                setSlides(2)
            }else{
                setSlides(1)
            }
        }

        window.addEventListener('resize', changeSlidesPerView)
    }

    return (
        <>
        <Head>
            <title>{product.title}</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <div className={styles.goBackContainer}>
            <Link href='/gifts-to-go'>
                <div className={styles.goBack}>
                    <span><ArrowBackIosIcon/></span> <span>Volver Gifts To Go</span>
                </div>
            </Link>
        </div>
        <div className={styles.container}>
            <div className={styles.product}>
                {multipleImages &&
                    <div className={styles.productGalery}>
                        <Grid container spacing={0}>
                            {product.images.map(image => (
                                <div className={styles.singleImage} onClick={() => setActiveImage(image.src)}>
                                    <Image
                                        src={image.src}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            ))}
                        </Grid>
                    </div>
                }
                <div className={`${styles.productImages} ${multipleImages ? '' : styles.noGallery}`}>
                    <Image
                        src={activeImage}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {
                    windowReady && 
                    <div className={`${styles.productInfo} ${multipleImages ? '' : styles.noGallery}`}>
                        <h3 className={styles.title}>{product.title}</h3>
                        
                        <div className={`${product.variants[0].compareAtPrice !== null ? styles.offerPrice : styles.price}`}>
                            ${product.variants[variantIndex].price} {product.variants[variantIndex].compareAtPrice !== null ?
                                <span className={styles.compareAtPrice}>
                                    ${product.variants[variantIndex].compareAtPrice}
                                </span> 
                                :
                                ''
                            }
                        </div>

                        <div className={styles.dropdown} onClick={handleDropActive} >
                            ¿Qué incluye? <ExpandMoreIcon/>
                        </div>
                        <Collapse in={dropActive}>
                            <div className={styles.description}>
                                {parse(product.descriptionHtml)}
                            </div>
                        </Collapse>

                        {multiVariants && 
                            <div className={styles.options}>
                                {product.options.map((option, index) => (
                                    <div className={styles.inputs}>
                                        <div className={styles.selectField}>
                                            <label for={option.id}>{option.name}:</label>
                                            <div>
                                                <select name={option.name} id={option.id} onChange={handleChange}>
                                                    {option.values.map(value => (
                                                        <option value={value.value}>{value.value}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {option.values.map(value => (
                                            <>
                                                {(value.value === 'Personalizado' || value.value === 'Personalizada') && (formData[option.name] === 'Personalizado' || formData[option.name] === 'Personalizada') &&
                                                    <input 
                                                        className={styles.inputText} 
                                                        type="text" 
                                                        name={`${option.name} Personzalido`} 
                                                        onChange={handleAttributesChange}
                                                        placeholder="Escribe aquí tu texto personalizado"
                                                    />
                                                }
                                            </>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        }
                        <button className={styles.addToCart} onClick={addToCart}>Añadir a carrito</button>
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={productAdded}
                            onClose={closeSnackbar}
                            message={`${product.title} se añadió a tu carrito`}
                            className={classes.background}
                        />
                    </div>
                }
            </div>
        </div>
        <div className={styles.recommended}>
            <div className={styles.header}>
                <h3>Te recomendamos</h3>
            </div>
            <div className={styles.products}>
                <Swiper 
                    freeMode={true}
                    slidesPerView={slides}
                    pagination={{
                        "clickable": true
                    }}
                    autoplay={{
                        "delay": 3500,
                        "disableOnInteraction": false
                    }}
                >
                    {products.map(product => (
                        <SwiperSlide>
                            <div className={styles.centerCard}>
                                <Link href={`/gifts-to-go/${product.handle}`}>
                                    <div className={styles.productCard}>
                                        <div className={styles.recomendedProductImage}>
                                            <Image
                                                src={product.images[0].src}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className={styles.productTitle}>{product.title}</div>
                                        <div className={styles.productPrice}>${product.variants[0].price}</div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps({query}) {
    // Fetch data from external API

    const handle = query.handle
    const product = await client.product.fetchByHandle(handle)

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIzNjk4NjkyNTIxOA==';
    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 4})

    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(product)), collection: JSON.parse(JSON.stringify(collection))}}
}