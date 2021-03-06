import React, {useEffect, useState} from 'react'
import styles from '../styles/cart.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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

export default function Cart ({setProductsInCartExist, setProductsInBasket}) {
    
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
    const [date, setDate] = useState(add(new Date(), {days: 1}), 'dd/MM/yyyy');
    const [definitiveDate, setDefinitiveDate] = useState(add(new Date(), {days: 1}), 'dd/MM/yyyy')
    const [minDate, setMinDate] = useState(add(new Date(), {days: 1}))
    const [nextDayOnly, setNextDayOnly] = useState(false)
    const [time, setTime] = useState('Por la ma??ana - 9:00 a 13:00');
    const [afternoonOnly, setAfternoonOnly] = useState(true)
    const [deliveryType, setDeliveryType] = useState('Recogida Local');

    // States that listen if the card and delivery info were sent
    const [checkoutCompleted, setCheckoutCompleted] = useState(false)

    // States to storage the message that is shown instead of the selectors
    const [cardResume, setCardResume] = useState('')
    const [deliveryResume, setDeliveryResume] = useState('')

    let today = new Date();
    let meridiem = format(today, "aaa")
    let currrentHour = parseInt(format(today, "H"))
    let dayOfWeek = format(today, "i")

    useEffect(() => {
        if(typeof window !== 'undefined'){
            const checkoutId = getDataFromStorage('checkoutId')
            setSendableCheckoutId(checkoutId)
            if (checkoutId !== null){
                client.checkout.fetch(checkoutId).then((checkout) => {
                    setCheckout(checkout)
                    // console.log(checkout)
                    if (checkout.completedAt !== null) {
                        setCheckoutCompleted(true)
                    }
                    if (checkout.customAttributes.length > 0){
                        let attributes = checkout.customAttributes;
                        let deliveryInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo-de-Env??o');
                        if(deliveryInfoExist > -1) {
                            if(attributes[deliveryInfoExist + 1].value !== ''){
                                if(attributes[deliveryInfoExist].value === "Env??o Nacional"){
                                    let deliveryMessage = `Seleccionaste env??o Nacional ${attributes[deliveryInfoExist + 1].value}`
                                    setDeliveryResume(deliveryMessage);
                                }else{
                                    let deliveryMessage = `${attributes[deliveryInfoExist].value} el d??a ${attributes[deliveryInfoExist + 1].value} (${attributes[deliveryInfoExist + 2].value})`
                                    setDeliveryResume(deliveryMessage);
                                }
                            }
                        }
                        let cardInfoExist = attributes.map(function(e) { return e.key; }).indexOf('Tipo-de-Tarjeta');
                        if(cardInfoExist > -1) {
                            if(attributes[cardInfoExist].value !== ''){
                                let cardMessage = `Seleccionaste ${attributes[cardInfoExist].value}`
                                setCardResume(cardMessage);
                            }
                        }
                    }
                });
            }else{
                setConfirmationEmptyCart(true)
            }
        }

        if(format(today, "i") === '6'){
            let newDate = add(today, {days: 2})
            setDefinitiveDate(newDate, 'dd/MM/yyyy')
            setDate(newDate, 'dd/MM/yyyy')
            setMinDate(newDate);
        } else if (currrentHour > 14){
            if(format(today, "i") === '5'){
                let newDate = add(today, {days: 4});
                setDefinitiveDate(newDate, 'dd/MM/yyyy')
                setDate(newDate, 'dd/MM/yyyy')
                setMinDate(newDate);
                setNextDayOnly(true)
                setAfternoonOnly(false)
            }else{
                let newDate = add(today, {days: 2});
                setDefinitiveDate(newDate, 'dd/MM/yyyy')
                setDate(newDate, 'dd/MM/yyyy')
                setMinDate(newDate);
                setNextDayOnly(true)
                setAfternoonOnly(false)
            }
        }

        if((format(today, "d") === '24' || format(today, "d") === '25') && format(today, "L") === '12'){
            let newDate = new Date(2021,11,18)
            setDefinitiveDate(newDate, 'dd/MM/yyyy')
            setDate(newDate, 'dd/MM/yyyy')
            setMinDate(newDate);
        }else if((format(today, "d") === '30' || format(today, "d") === '31') && format(today, "L") === '12'){
            let newDate = new Date(2022,0,4)
            setDefinitiveDate(newDate, 'dd/MM/yyyy')
            setDate(newDate, 'dd/MM/yyyy')
            setMinDate(newDate);
        }else if((format(today, "d") === '1' || format(today, "d") === '2') && format(today, "L") === '1'){
            let newDate = new Date(2022,0,4)
            setDefinitiveDate(newDate, 'dd/MM/yyyy')
            setDate(newDate, 'dd/MM/yyyy')
            setMinDate(newDate);
        }else if((format(today, "d") === '5' || format(today, "d") === '6') && format(today, "L") === '2'){
            let newDate = new Date(2022,1,8)
            setDefinitiveDate(newDate, 'dd/MM/yyyy')
            setDate(newDate, 'dd/MM/yyyy')
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
                {key: "Tipo-de-Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo-de-Env??o", value: deliveryType},
                {key: "Fecha-de-entrega", value: formatDate},
                {key: "Hora-de-entrega", value: time},
            ]
        };

        setDeliveryResume(`${deliveryType} el d??a ${formatDate} (${time})`)
        setDateModal(false)

        client.checkout.updateAttributes(checkout.id, input)
    }

    const saveNationalAttributes = (type, e) => {
        e.preventDefault();
        const input = {
            customAttributes: [
                {key: "Tipo-de-Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo-de-Env??o", value: deliveryType},
                {key: "Fecha-de-entrega", value: type},
                {key: "Hora-de-entrega", value: "-----"},
            ]
        };

        setDeliveryResume(`Seleccionaste env??o Nacional ${type}`)
        setDateModal(false)

        client.checkout.updateAttributes(checkout.id, input)
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
                {key: "Tipo-de-Tarjeta", value: selectedCard}, 
                {key: "Remitente", value: cardFrom},
                {key: "Destinatario", value: cardTo},
                {key: "Mensaje", value: cardMessage},
                {key: "Tipo-de-Env??o", value: deliveryType},
                {key: "Fecha-de-entrega", value: formatDate},
                {key: "Hora-de-entrega", value: time},
            ]
        };

        setCardResume(`Seleccionaste ${selectedCard}`)
        setCardModal(false)

        client.checkout.updateAttributes(checkout.id, input)
    }

    return (
        <div className={styles.container}>

            <Head>
                <title>Tu Carrito</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className={styles.card}>
                <div className={styles.cartHeader}>
                    <h1>Carrito de Compras</h1>
                </div>
                {checkout !== null && checkoutCompleted === false ?
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
                                        setProductsInCartExist={setProductsInCartExist}
                                        setProductsInBasket={setProductsInBasket}
                                    />
                                }
                                {checkout.lineItems.map(lineItem => {
                                    if(lineItem.customAttributes[0] !== undefined){
                                        if(lineItem.customAttributes[0].key !== 'Make Your Box'){
                                            if(lineItem.variant !== null){
                                                return (
                                                    <ProductsInCart
                                                        image={lineItem.variant.image !== null ? lineItem.variant.image.src : 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'}
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
                                                        setProductsInCartExist={setProductsInCartExist}
                                                        setProductsInBasket={setProductsInBasket}
                                                    />
                                                )
                                            }else{
                                                return
                                            }
                                        }
                                    }else {
                                        if(lineItem.variant !== null){
                                            return (
                                                <ProductsInCart 
                                                    image={lineItem.variant.image !== null ? lineItem.variant.image.src : 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'}
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
                                                    setProductsInCartExist={setProductsInCartExist}
                                                    setProductsInBasket={setProductsInBasket}
                                                />
                                            )
                                        }else{
                                            return
                                        }
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
                        <div>Los impuestos y gastos de env??o se calculan en el pr??ximo paso</div>
                        <div className={styles.superCustomContainer}>
                            <div className={styles.customizeCopy}>
                                ??Necesitas personzalizar tus regalos?
                            </div>
                            <a href="https://api.whatsapp.com/send?phone=528134053769&text=%C2%A1Hola!%20Me%20comunico%20de%20la%20p%C3%A1gina%20de%20Sharebox%20y%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n." target="blank">
                            <button className={styles.contactButton}>
                                <div className={styles.wppIcon}>
                                    <Image
                                        src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/whatsAppLogo.png?v=1636568821'
                                        layout='fill'
                                        objectFit='cover'
                                    />
                                </div> 
                                <div>Cont??ctanos</div> 
                            </button>
                            </a>
                        </div>
                        </>
                        :
                        <div className={styles.noProducts}>
                            <div className={styles.noItemsIcon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/noProductsIcon.png?v=1637686960"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div>No tienes productos en el carrito</div>
                        </div>
                    }
                    </>
                :   
                    <>
                    {confirmationEmptyCart ?
                        <div className={styles.noProducts}>
                            <div className={styles.noItemsIcon}>
                                <Image
                                    src="https://cdn.shopify.com/s/files/1/0456/6820/4706/files/noProductsIcon.png?v=1637686960"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div>No tienes productos en el carrito</div>
                        </div>
                        :
                        <div className={styles.progressContainer}>
                            <CircularProgress color="inherit" />
                        </div>
                    }
                    </>
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
                        nextDayOnly={nextDayOnly}
                        afternoonOnly={afternoonOnly}
                    />
                </div>
            </Grow>
        </div>
    )  
}