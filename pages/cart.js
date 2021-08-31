import React, {useEffect, useState} from 'react'
import styles from '../styles/cart.module.scss'
import Link from 'next/link'
import {client} from '../utils/shopify'

import ProductsInCart from '../components/CartPage/ProductsInCart/ProductsInCart'
import { TrendingUpTwoTone } from '@material-ui/icons'

import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

const getDataFromStorage = (key) => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem(key))
}

const setDataToStorage = (key, data) => {
    const storage = window.localStorage;
    storage.setItem(key, JSON.stringify(data))
}

export default function Cart () {
    
    /* const [itemsInCart, setItemsInCart] = useState(0)
    const [checkoutExist, setCheckoutExist] = useState(false)
    const cart; */
    const [testState, setTestState] = useState(true)
    const [checkout, setCheckout] = useState(null)
    const [cardModal, setCardModal] = useState(false)
    // const lineItems = checkout.lineItems;
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const checkout = getDataFromStorage('checkout')
            setCheckout(checkout)
        }
    }, [])
    console.log('Checkout:')
    console.log(checkout);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cartHeader}>
                    <h1>Carrito de Compras</h1>   
                </div>
                {checkout !== null ? 
                    <>
                    <div className={styles.content}>
                        <div className={styles.productsSummary}>
                            <div className={styles.fields}>
                                <div className={styles.firstField}>
                                    Producto
                                </div>
                                <div className={styles.field}>
                                    Precio
                                </div>
                                <div className={styles.field}>
                                    Cantidad
                                </div>
                                <div className={styles.field}>
                                    Total
                                </div>
                            </div>
                            {checkout.lineItems.map(lineItem => (
                                <ProductsInCart 
                                    image={lineItem.variant.image.src}
                                    product={lineItem.title} 
                                    selectedOptions={lineItem.variant.selectedOptions}
                                    price={`$${lineItem.variant.price}`} 
                                    quantity={lineItem.quantity.toString()} 
                                    total={`$${(parseFloat(lineItem.variant.price)*lineItem.quantity).toString()}.00`} />
                            ))} 
                            {/* <ProductsInCart product={checkout !== null ? checkout.lineItems[0].title : 'Cargando...'} price='$500' quantity='2' total='$1000' /> */}
                        </div>
                        <div className={styles.cardAndDate}>
                            <div className={styles.choose}>
                                <button className={styles.chooseButton}>SELECCIONA UNA TARJETA TARJETA</button>
                                <button className={styles.chooseButton}>SELECCIONA LA HORA Y FECHA DE ENTREGA</button>
                            </div>
                            <div className={styles.options}>
                                <a href={checkout.webUrl} className={styles.fullWidth}>
                                    <button className={styles.continue}>
                                        CONTINUAR CON EL PAGO                                    
                                    </button>
                                </a>
                                <Link href='./box-to-go' className={styles.fullWidth}>
                                    <button className={styles.goBack}>
                                        SEGUIR COMPRANDO 
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.subtotal}>
                        <div className={styles.title}>
                            SUBTOTAL
                        </div>
                        <div className={styles.price}>
                            {checkout.totalPrice}
                        </div>
                    </div>
                    </>
                :
                    <h3>NO HAY PRODUCTOS EN EL CARRITO</h3>}
            </div>
            {/* <Grow in={cardModal}>
                <Paper elevation={4} className={classes.paper}>
                    <svg className={classes.svg}>
                    <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                    </svg>
                </Paper>
            </Grow> */}
        </div>
    )  
}