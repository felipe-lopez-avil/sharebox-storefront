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

import 'date-fns';
import add from 'date-fns/add'
import format from 'date-fns/format'

const parseData = (data) => {
    return JSON.parse(JSON.stringify(data))
}

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
    
    const [checkout, setCheckout] = useState(null)
    const [cardModal, setCardModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)

    // Card Info States
    const [selectedCard, setSelectedCard] = useState('')
    const [cardFrom, setCardFrom] = useState('')
    const [cardTo, setCardTo] = useState('')
    const [cardMessage, setCardMessage] = useState('')

    // Date and Time Picker States
    const [date, setDate] = useState(new Date(), 'MM/dd/yyyy');
    const [minDate, setMinDate] = useState(new Date())
    const [time, setTime] = useState('Por la mañana - 9:00 a 13:00');
    const [deliveryType, setDeliveryType] = useState('Recogida Local');

    // States that listen if the card and delivery info were sent
    const [cardInfo, setCardInfo] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState(false);

    // States to storage the message that is shown instead of the selectors
    const [cardResume, setCardResume] = useState('')
    const [deliveryResume, setDeliveryResume] = useState('')

    let today = new Date();
    let meridiem = format(today, "aaa")


    // const lineItems = checkout.lineItems;
    useEffect(() => {
       /*  if(typeof window !== 'undefined'){
            const checkout = getDataFromStorage('checkout')
            setCheckout(checkout)
        }  */

        if(typeof window !== 'undefined'){
            const checkoutId = getDataFromStorage('checkoutId')
            if (checkoutId !== null){
                client.checkout.fetch(checkoutId).then((checkout) => {
                    console.log(checkout)
                    setCheckout(checkout)
                    if (checkout.customAttributes.length > 0){
                        let attributes = checkout.customAttributes;
                        let deliveryInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo de Envío');
                        if(deliveryInfoExist > -1) {
                            let deliveryMessage = `${attributes[deliveryInfoExist].value} el día ${attributes[deliveryInfoExist + 1].value} (${attributes[deliveryInfoExist + 2].value})`
                            setDeliveryResume(deliveryMessage);
                        }
                        let cardInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo de Tarjeta');
                        if(cardInfoExist > -1) {
                            let cardMessage = `Seleccionaste ${attributes[cardInfoExist].value}`
                            setCardResume(cardMessage);
                        }
                    }
                });
            }
        }

        if (meridiem === 'pm'){
            let newDate = add(today, {days: 1});
            setDate(newDate, 'MM/dd/yyyy')
            setMinDate(newDate);
        }    
    }, [])

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

    const saveAttributes = () => {
        console.log('Fecha de entrega:')
        console.log(format(date, 'dd/MM/yyyy'))
        console.log('Hora de entrega:')
        console.log(time)

        const formatDate = format(date, 'dd/MM/yyyy');
        const input = {
            customAttributes: [
                {key: "Tipo de Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo de Envío", value: deliveryType}, 
                {key: "Fecha de entrega", value: formatDate},
                {key: "Hora de entrega", value: time},
            ]
        };

        setDeliveryResume(`${deliveryType} el día ${formatDate} (${time})`)
        setDateModal(false)

        client.checkout.updateAttributes(checkout.id, input).then((checkout) => {
            console.log(checkout);
        })
    }

    const saveCardAttributes = () => {
        console.log('Tipo de Tarjeta:')
        console.log(selectedCard)
        console.log('De:')
        console.log(cardFrom)
        console.log('Para:')
        console.log(cardTo)
        console.log('Mensaje:')
        console.log(cardMessage)

        const formatDate = format(date, 'dd/MM/yyyy');
        const input = {
            customAttributes: [
                {key: "Tipo de Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo de Envío", value: deliveryType}, 
                {key: "Fecha de entrega", value: formatDate},
                {key: "Hora de entrega", value: time},
            ]
        };

        setCardResume(`Seleccionaste ${selectedCard}`)
        setCardModal(false)

        client.checkout.updateAttributes(checkout.id, input).then((checkout) => {
            console.log(checkout);
        })

        /* const formatDate = format(date, 'dd/MM/yyyy');
        const input = {
            customAttributes: [
                {key: "Tipo de Envío", value: deliveryType}, 
                {key: "Fecha de entrega", value: formatDate},
                {key: "Hora de entrega", value: time},
            ]
        };

        setDeliveryResume(`${deliveryType} el día ${formatDate} (${time})`)
        setDateModal(false)

        client.checkout.updateAttributes(checkout.id, input).then((checkout) => {
            console.log(checkout);
        }) */
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
                                <button className={styles.chooseButton} onClick={openCardModal}>
                                    {cardResume === '' ? 'SELECCIONA UNA TARJETA' : cardResume}
                                </button>
                                <button className={styles.chooseButton} onClick={openDateModal}>
                                    {deliveryResume === '' ? 'SELECCIONA LA HORA Y FECHA DE ENTREGA' : deliveryResume}
                                </button>
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
                    <CardModal 
                        closeCardModal={closeCardModal}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        cardFrom={cardFrom}
                        setCardFrom={setCardFrom}
                        cardTo={cardTo}
                        setCardTo={setCardTo}
                        cardMessage={cardMessage}
                        setCardMessage={setCardMessage}
                        saveCardAttributes={saveCardAttributes}
                    />
                </div>
            </Grow>
            <Grow in={dateModal}>
                <div className={styles.modal}>
                    <DatePickerModal 
                        closeDateModal={closeDateModal} 
                        date={date} 
                        setDate={setDate} 
                        minDate={minDate}
                        setMinDate={setMinDate}
                        time={time} 
                        setTime={setTime} 
                        deliveryType={deliveryType}
                        setDeliveryType={setDeliveryType}
                        saveAttributes={saveAttributes}  
                    />
                </div>
            </Grow>
        </div>
    )  
}