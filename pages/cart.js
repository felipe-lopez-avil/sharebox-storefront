import React, {useEffect, useState} from 'react'
import styles from '../styles/cart.module.scss'
import Link from 'next/link'
import {client} from '../utils/shopify'

import ProductsInCart from '../components/CartPage/ProductsInCart/ProductsInCart'
import CardModal from '../components/CartPage/CardModal.js/CardModal'
import { Height, TrendingUpTwoTone } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import DatePickerModal from '../components/CartPage/DatePickerModal/DatePickerModal'


const getDataFromStorage = (key) => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem(key))
}

const setDataToStorage = (key, data) => {
    const storage = window.localStorage;
    storage.setItem(key, JSON.stringify(data))
}

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(1),
      position: 'fixed',
      width: '500px',
      height: '200px',
      backgroundColor: 'red',
      top: '50%',
      left: '50%'
    }
}));

export default function Cart () {
    const classes = useStyles();
    
    /* const [itemsInCart, setItemsInCart] = useState(0)
    const [checkoutExist, setCheckoutExist] = useState(false)
    const cart; */
    const [testState, setTestState] = useState(true)
    const [checkout, setCheckout] = useState(null)
    const [cardModal, setCardModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)

    // Date and Time Picker States
    const [date, setDate] = useState(new Date(), 'MM/dd/yyyy');
    const [time, setTime] = useState('Por la mañana - 9:00 a 13:00');

    // const lineItems = checkout.lineItems;
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const checkout = getDataFromStorage('checkout')
            setCheckout(checkout)
        }
    }, [])
    console.log('Checkout:')
    console.log(checkout);

    const openCardModal = () => {
        setCardModal(true);
    }

    const closeCardModal = () => {
        setCardModal(false);
    }

    const openDateModal = () => {
        setDateModal(true);
    }

    const closeDateModal = () => {
        setDateModal(false);
    }

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
                                <button className={styles.chooseButton} onClick={openCardModal}>SELECCIONA UNA TARJETA</button>
                                <button className={styles.chooseButton} onClick={openDateModal}>SELECCIONA LA HORA Y FECHA DE ENTREGA</button>
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
            <Grow in={cardModal}>
                <div className={styles.modal}>
                    <CardModal closeCardModal={closeCardModal}/>
                </div>
            </Grow>
            <Grow in={dateModal}>
                <div className={styles.modal}>
                    <DatePickerModal 
                        closeDateModal={closeDateModal} 
                        date={date} 
                        setDate={setDate} 
                        time={time} 
                        setTime={setTime} 
                    />
                </div>
            </Grow>
        </div>
    )  
}