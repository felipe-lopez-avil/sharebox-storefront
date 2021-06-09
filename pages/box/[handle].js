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
    const [variantIndex, setVariantIndex] = useState(0);

    const summary = "¿Qué incluye?";
    const details = product.description;
    
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 30000)

        const array = Object.values(formData);
        const title = array.join(' / ')
        console.log("Opciones elegidas: "+title);

        product.variants.map((variant, index) => {
            if (variant.title == title) {
                console.log(variant.title);
                console.log(title)
                console.log(index)
                setVariantIndex(index)
                console.log("Index de la variante: "+variantIndex)
            }
            
        })
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

                        <form className={styles.form} onSubmit={handleSubmit}>
                            { variants > 1 ? 
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
                            : ''}
                            <button className={styles.add} type="submit">AGREGAR AL CARRITO</button>
                        </form>

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