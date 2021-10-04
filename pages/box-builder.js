import {client} from '../utils/shopify'
import styles from '../styles/box-builder.module.scss'
import BoxBuilderStepper from '../components/BoxBuilder/Stepper/BoxBuilderStepper';
import MobileStepper from '../components/BoxBuilder/Stepper/MobileStepper';
import FirstStep from '../components/BoxBuilder/MultiStepForm/FirstStep';
import SecondStep from '../components/BoxBuilder/MultiStepForm/SecondStep';
import ThirdStep from '../components/BoxBuilder/MultiStepForm/ThirdStep';
import FourthStep from '../components/BoxBuilder/MultiStepForm/FourthStep';
import Controllers from '../components/BoxBuilder/Controllers/Controllers';

import React, { useState, useEffect } from 'react'

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

export default function BoxBuilder() {

    const [currentStep, setCurrentStep] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)
    const [stepper, setStepper] = useState(false)

    const [step1Items, setStep1Items] = useState({productID: '', title: '', price: '', quantity: 1, image: '',})
    const [step2Items, setStep2Items] = useState([])
    const [step3Items, setStep3Items] = useState([])
    const [step4Items, setStep4Items] = useState([])

    const goNext = () => {
        setCurrentStep(currentStep + 1);
    }

    const goPrev = () => {
        setCurrentStep(currentStep - 1);
    }

    const addToCart = async () => {

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
        const lineItems2 = step2Items.map((item) => (
            {
                variantId: item.productID,
                quantity: item.quantity,
                customAttributes: [{key: "Make Your Box", value: "Inside Box"}]
            }
        ))

        const lineItems3 = step3Items.map((item) => (
            {
                variantId: item.productID,
                quantity: item.quantity,
                customAttributes: [{key: "Make Your Box", value: "Inside Box"}]
            }
        ))
        
        const lineItemsToAdd = [
            {
                variantId: step1Items.productID,
                quantity: step1Items.quantity,
                customAttributes: [{key: "Make Your Box", value: "Box"}]
            },
            ...lineItems2,
            ...lineItems3,
        ];

        console.log(lineItemsToAdd)

        checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)

        console.log(parseData(checkout))
    }

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setStepper(true)
        }
    }, [])

    return (
        <>
        <div className={styles.makeYourBox}>

            {/*Columna izquierda. Sección donde se muestran los pasos del proceso así como los porductos que llevas en el proceso*/}
            <div className={styles.summary}>
                {stepper ?
                    <BoxBuilderStepper currentStep={currentStep} step1Items={step1Items} step2Items={step2Items} step3Items={step3Items} />   
                : ''}
            </div>
            <div className={styles.mobileSummary}>
                {stepper ?
                    <MobileStepper currentStep={currentStep}/>   
                : ''}
            </div>

            {/*Columna derecha. Sección donde se muestran los productos a elegir*/}
            <div className={styles.choose}>
                <form className={styles.form}>
                    <div className={styles.slides}>
                        {currentStep === 0 && <FirstStep step1Items={step1Items} setStep1Items={setStep1Items} />}
                        {currentStep === 1 && <SecondStep step2Items={step2Items} setStep2Items={setStep2Items}/>}
                        {currentStep === 2 && <ThirdStep step3Items={step3Items} setStep3Items={setStep3Items}/>}
                        {currentStep === 3 && <FourthStep step1Items={step1Items} step2Items={step2Items} step3Items={step3Items} />}
                    </div> 
                </form>
                
            </div>
        </div>
        <div className={styles.controllers}>
            <Controllers 
                currentStep={currentStep} 
                setCurrentStep={setCurrentStep} 
                goNext={goNext} 
                goPrev={goPrev} 
                addToCart={addToCart}
            />
        </div>
        </>
    )
}