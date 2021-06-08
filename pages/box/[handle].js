import React, { useReducer, useState } from 'react'
import styles from '../../styles/single-product.module.scss'
import {client} from '../../utils/shopify'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react/cjs/react.development'


export default function SingleProduct({product}){
    
    console.log(product)

    const variants = product.variants.length;
    

    return(
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
                    <div className={styles.details}>
                        <h4>¿Qué incluye?</h4> <MdKeyboardArrowDown/>
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.description}>
                            {product.description}
                        </p>
                    </div>

                    <form className={styles.form}>
                        { variants > 1 ? 
                                <div >
                                    {product.options.map(option => (
                                        <div>
                                            <h4 className={styles.section}>{option.name}:</h4>
                                            {/* <h4>{option.name}</h4> 
                                            
                                            <div>{value.value}</div>
                                            
                                            */}
                                            
                                            <div className={styles.selectOption}>
                                                {option.values.map(value => (
                                                    <div className={styles.optionContainer}>
                                                        <input type="radio" name={option.name} id={value.value} value={value.value} className={styles.hidden}/>
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
                    </form>

                    
                        
                    
                    <button className={styles.add}>AGREGAR AL CARRITO</button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({query}) {
    // Fetch data from external API

    const handle = query.handle

    const product = await client.product.fetchByHandle(handle)
    
    
    console.log({ product })
    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(product))} }
}

/* .radioToolbar input[type="radio"]{
    opacity: 0;
    position: fixed;
    width: 0;
    display: inline-block;
}

.radioToolbar label {
    display: inline-block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
}

.radioToolbar label:hover {
    background-color: #dfd;
}

.radioToolbar input[type="radio"]:focus + label {
    border: 2px dashed #444;
}

.radioToolbar input[type="radio"]:checked + label {
    background-color: #bfb;
    border-color: #4c4;
} */