import React, {useEffect, useState} from 'react'
import styles from '../styles/cart.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import {client} from '../utils/shopify'

import ProductsInCart from '../components/CartPage/ProductsInCart/ProductsInCart'
import ProductsMakeYourBox from '../components/CartPage/ProductsMakeYourBox/ProductsMakeYourBox'
import CardModal from '../components/CartPage/CardModal.js/CardModal'
import { Height, TrendingUpTwoTone } from '@material-ui/icons'
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import DatePickerModal from '../components/CartPage/DatePickerModal/DatePickerModal'
import CircularProgress from '@mui/material/CircularProgress';

import 'date-fns';
import add from 'date-fns/add'
import format from 'date-fns/format'


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
    },

}));

function makeYourBoxFilter(lineItem) {
    if(lineItem.customAttributes[0] !== undefined){
        if (lineItem.customAttributes[0].key === "Make Your Box"){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export default function Cart () {

    const classes = useStyles();

    const [sendableCheckoutId, setSendableCheckoutId] = useState(null)

    const [checkout, setCheckout] = useState(null)
    const [confirmationEmptyCart, setConfirmationEmptyCart] = useState(false)
    const [cardModal, setCardModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)

    // Card Info States
    const [selectedCard, setSelectedCard] = useState('')
    const [cardFrom, setCardFrom] = useState('')
    const [cardTo, setCardTo] = useState('')
    const [cardMessage, setCardMessage] = useState('')

    // Date and Time Picker States
    const [date, setDate] = useState(new Date(), 'MM/dd/yyyy');
    const [definitiveDate, setDefinitiveDate] = useState('')
    const [minDate, setMinDate] = useState(new Date())
    const [time, setTime] = useState('Por la mañana - 9:00 a 13:00');
    const [deliveryType, setDeliveryType] = useState('Recogida Local');

    // States that listen if the card and delivery info were sent
    const [checkoutCompleted, setCheckoutCompleted] = useState(false)

    // States to storage the message that is shown instead of the selectors
    const [cardResume, setCardResume] = useState('')
    const [deliveryResume, setDeliveryResume] = useState('')

    let today = new Date();
    let meridiem = format(today, "aaa")

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const checkoutId = getDataFromStorage('checkoutId')
            setSendableCheckoutId(checkoutId)
            if (checkoutId !== null){
                client.checkout.fetch(checkoutId).then((checkout) => {
                    console.log(checkout)
                    setCheckout(checkout)
                    if (checkout.completedAt !== null) {
                        setCheckoutCompleted(true)
                    }
                    if (checkout.customAttributes.length > 0){
                        let attributes = checkout.customAttributes;
                        let deliveryInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo de Envío');
                        if(deliveryInfoExist > -1 & attributes[deliveryInfoExist + 1].value !== '') {
                            if(attributes[deliveryInfoExist].value === "Envío Nacional"){
                                let deliveryMessage = `Seleccionaste envío Nacional ${attributes[deliveryInfoExist + 1].value}`
                                setDeliveryResume(deliveryMessage);
                            }else{
                                let deliveryMessage = `${attributes[deliveryInfoExist].value} el día ${attributes[deliveryInfoExist + 1].value} (${attributes[deliveryInfoExist + 2].value})`
                                setDeliveryResume(deliveryMessage);
                            }
                        }
                        let cardInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo de Tarjeta');
                        if(cardInfoExist > -1 & attributes[cardInfoExist].value !== '') {
                            let cardMessage = `Seleccionaste ${attributes[cardInfoExist].value}`
                            setCardResume(cardMessage);
                        }
                    }
                });
            }else{
                setConfirmationEmptyCart(true)
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
        
        let formatDate
        
        if (definitiveDate === ''){
            formatDate = '';
        }else{
            formatDate = format(definitiveDate, 'dd/MM/yyyy');
        }

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

    const saveNationalAttributes = (type, e) => {
        e.preventDefault();
        const input = {
            customAttributes: [
                {key: "Tipo de Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo de Envío", value: deliveryType},
                {key: "Fecha de entrega", value: type},
                {key: "Hora de entrega", value: "-----"},
            ]
        };

        setDeliveryResume(`Seleccionaste envío Nacional ${type}`)
        setDateModal(false)

        client.checkout.updateAttributes(checkout.id, input).then((checkout) => {
            console.log(checkout);
        })
    }

    const saveCardAttributes = () => {

        let formatDate

        if (definitiveDate === ''){
            formatDate = '';
        }else{
            formatDate = format(definitiveDate, 'dd/MM/yyyy');
        }

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
    }

    return (
        <div className={styles.container}>

            
            <div className={styles.card}>
                <div className={styles.cartHeader}>
                    <h1>Carrito de Compras</h1>
                </div>
                {checkout !== null & checkoutCompleted === false ?
                    <>
                    {checkout.lineItems.length > 0 ?
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
                                {checkout.lineItems.map(function(e) { if(e.customAttributes[0] !== undefined){return e.customAttributes[0].key } else {return "No Custom Attributes"} }).indexOf('Make Your Box') > -1 &&
                                    <ProductsMakeYourBox
                                        items={checkout.lineItems.filter(makeYourBoxFilter)}
                                        sendableCheckoutId={sendableCheckoutId}
                                        setCheckout={setCheckout}
                                        checkout={client.checkout}
                                    />
                                }
                                {checkout.lineItems.map(lineItem => {
                                    if(lineItem.customAttributes[0] !== undefined){
                                        if(lineItem.customAttributes[0].key !== 'Make Your Box'){
                                            return (
                                                <ProductsInCart
                                                    image={lineItem.variant.image.src}
                                                    product={lineItem.title}
                                                    selectedOptions={lineItem.variant.selectedOptions}
                                                    price={`$${lineItem.variant.price}`}
                                                    quantity={lineItem.quantity.toString()}
                                                    total={`$${(parseFloat(lineItem.variant.price)*lineItem.quantity).toString()}.00`}
                                                    id={lineItem.id} 
                                                    sendableCheckoutId={sendableCheckoutId}
                                                    setCheckout={setCheckout}
                                                    checkout={client.checkout}
                                                    customAttributes={lineItem.customAttributes}
                                                />
                                            )
                                        }
                                    }else{
                                        return (
                                            <ProductsInCart 
                                                image={lineItem.variant.image.src}
                                                product={lineItem.title} 
                                                selectedOptions={lineItem.variant.selectedOptions}
                                                price={`$${lineItem.variant.price}`} 
                                                quantity={lineItem.quantity.toString()} 
                                                total={`$${(parseFloat(lineItem.variant.price)*lineItem.quantity).toString()}.00`}
                                                id={lineItem.id} 
                                                sendableCheckoutId={sendableCheckoutId}
                                                setCheckout={setCheckout}
                                                checkout={client.checkout}
                                                customAttributes={lineItem.customAttributes}
                                            />
                                        )
                                    }
                                    
                                })} 
                            </div>
                            <div className={styles.cardAndDate}>
                                <div className={styles.choose}>
                                    <button className={`${styles.chooseButton} ${cardResume !== '' ? styles.completedField : ''}`} onClick={openCardModal}>
                                        {cardResume === '' ? 'Selecciona una tarjeta' : cardResume}
                                    </button>
                                    <button className={`${styles.chooseButton} ${deliveryResume !== '' ? styles.completedField : ''}`} onClick={openDateModal}>
                                        {deliveryResume === '' ? 'Selecciona la fecha y hora de entrega' : deliveryResume}
                                    </button>
                                </div>
                                <div className={styles.options}>
                                    <a href={checkout.webUrl} className={styles.fullWidth}>
                                        <button className={`${styles.continue} ${deliveryResume === '' ? styles.disabledButton : ''}`} disabled={deliveryResume === ''}>
                                            Continuar con el pago                                  
                                        </button>
                                    </a>
                                    <Link href='./gifts-to-go' className={styles.fullWidth}>
                                        <button className={styles.goBack}>
                                            Seguir comprando
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.subtotal}>
                            <div className={styles.title}>
                                SUBTOTAL:
                            </div>
                            <div className={styles.price}>
                                ${checkout.totalPrice}
                            </div>
                        </div>
                        <div>Los impuestos y gastos de envío se calculan en el próximo paso</div>
                        </>
                        :
                        <div className={styles.noProducts}>
                            <RemoveShoppingCartOutlinedIcon style={{ fontSize: 60, marginBottom: '20px' }}/>
                            <div>No tienes productos en el carrito</div>
                        </div>
                    }
                    </>
                :
                    <div className={styles.progressContainer}>
                        <CircularProgress color="inherit" />
                    </div>
                }
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
                        setDefinitiveDate={setDefinitiveDate}
                        date={date} 
                        setDate={setDate} 
                        minDate={minDate}
                        setMinDate={setMinDate}
                        time={time} 
                        setTime={setTime} 
                        deliveryType={deliveryType}
                        setDeliveryType={setDeliveryType}
                        saveAttributes={saveAttributes}  
                        saveNationalAttributes={saveNationalAttributes}
                    />
                </div>
            </Grow>
        </div>
    )  
}