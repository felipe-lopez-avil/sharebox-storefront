import React, { useReducer, useState } from 'react'
import styles from '../../styles/single-product.module.scss'
import {client} from '../../utils/shopify'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { MdKeyboardArrowDown } from 'react-icons/md'

import Accordion from '../../components/Accordion/Accordion'
import Recommendations from '../../components/ProductsPage/Recommendations/Recommendations'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function SingleProduct({product, collection}){

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const summary = "¿Qué incluye?";
    const details = product.description;
    let variantIndex;

    const addToCart = () => {

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 10000)

        // Local Storage is checked to see if a CheckoutID already exists. If not, a new one is created;
        const storage = window.localStorage;
        let checkoutId = storage.getItem("checkoutId");
        if (!checkoutId) {
            client.checkout.create().then((checkout) => {

                // Do something with the checkout
                checkoutId = checkout.id;
                storage.setItem("checkoutId", checkoutId);
                //console.log(checkoutId);
            });
        }
        // const checkoutId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI='; ID of an existing checkout
        const lineItemsToAdd = [
        {
            variantId: product.variants[0].id,
            quantity: 1,
            // customAttributes: [{key: "MyKey", value: "MyValue"}]
        }
        ];

        // Add an item to the checkout
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout); 
        });
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        
        // Makes an announcement appear to tell the user that they added the product to the cart
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 10000)


        // Reads the data from the Product Options and convert them to the format "Input_1 / Input_2 / ... / Input_n "
        // so it can be compared to the format of the Product Variant Titles
        const array = Object.values(formData);
        const title = array.join(' / ')
        console.log("Opciones elegidas: "+title);

        // We go over every Variant Title and compare it to the one that we storaged in the last step.
        // When it finds a coincidence, we take the index of the element.
        product.variants.map((variant, index) => {
            if (variant.title == title) {
                console.log(variant.title);
                console.log(title)
                console.log("El índice de la variante es: "+index)   
                variantIndex = index;          
            }    
        })
        console.log("El dato guardado en variantIndex es: "+variantIndex);

        // Local Storage is checked to see if a CheckoutID already exists. If not, a new one is created;
        const storage = window.localStorage;
        let checkoutId = storage.getItem("checkoutId");
        if (!checkoutId) {
            client.checkout.create().then((checkout) => {

                // Do something with the checkout
                checkoutId = checkout.id;
                storage.setItem("checkoutId", checkoutId);
                //console.log(checkoutId);
            });
        }
        // const checkoutId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTgyMTc3ODc1OTI='; ID of an existing checkout
        const lineItemsToAdd = [
        {
            variantId: product.variants[variantIndex].id,
            quantity: 1,
            // customAttributes: [{key: "MyKey", value: "MyValue"}]
        }
        ];

        // Add an item to the checkout
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout); 
        });

    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    console.log(product)

    const variants = product.variants.length;
    

    return(
        <div>
            <div className={styles.container}>            
                <div className={styles.product}>
                    <div className={styles.gallery}>
                        <div className={styles.cover}>
                            <Image
                                src={product.images[0].src}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className={styles.info}>

                        <h3>{product.title}</h3>
                        <div className={styles.price}>
                            $ {product.variants[0].price}
                        </div>
                        
                        <Accordion summary={summary} details={details}/>
                        {variants > 1 ?
                        
                            <form className={styles.form} onSubmit={handleSubmit}>
                                
                                <div >
                                    {product.options.map(option => (
                                        <div>
                                            <h4 className={styles.section}>{option.name}:</h4>                                                
                                            <div className={styles.selectOption}>
                                                {option.values.map((value, index) => (
                                                    <div className={styles.optionContainer}>
                                                        <input 
                                                            type="radio" 
                                                            name={option.name} 
                                                            id={value.value} 
                                                            value={value.value} 
                                                            className={styles.hidden} 
                                                            onChange={handleChange}
                                                        />
                                                        <label for={value.value}>
                                                            <div className={styles.displayBox}>
                                                                {value.value}
                                                            </div>
                                                        </label>  
                                                    </div>                                         
                                                ))}
                                            </div>                                                                                         
                                        </div>
                                    ))}
                                </div>
                                
                                <button className={styles.add} type="submit">AGREGAR AL CARRITO</button>
                            </form>
                        : 
                            <button className={styles.add} onClick={addToCart}>AGREGAR AL CARRITO</button>
                        }

                    </div>
                </div>
            </div>
            
            <div className={styles.recommended}>
                <h3>COMPLEMENTA TU REGALO</h3>
                <div className={styles.products}>
                    <Recommendations collection={collection} link="out-of-the-box"/>
                </div>
                <button className={styles.button}>VER TODO</button>
            </div>

            {submitting && 
                <div className={styles.cartModal}>
                    <div className={styles.modalBox}>
                        <span>
                            {product.title} se agregó a tu carrito
                        </span>
                    </div>
                </div>
            }
        </div>
        
    )
}

export async function getServerSideProps({query}) {
    // Fetch data from external API

    const handle = query.handle
    const product = await client.product.fetchByHandle(handle)

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIzNjk4NjkyNTIxOA==';
    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 4})


    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(product)), collection: JSON.parse(JSON.stringify(collection))} }
}