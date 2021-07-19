import styles from '../styles/box-builder.module.scss'
import BoxBuilderStepper from '../components/BoxBuilder/Stepper/BoxBuilderStepper';
import MobileStepper from '../components/BoxBuilder/Stepper/MobileStepper';
import FirstStep from '../components/BoxBuilder/MultiStepForm/FirstStep';
import SecondStep from '../components/BoxBuilder/MultiStepForm/SecondStep';
import ThirdStep from '../components/BoxBuilder/MultiStepForm/ThirdStep';
import FourthStep from '../components/BoxBuilder/MultiStepForm/FourthStep';
import Controllers from '../components/BoxBuilder/Controllers/Controllers';

import React, { useState, useEffect } from 'react'



export default function BoxBuilder() {

    const [currentStep, setCurrentStep] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)
    const [stepper, setStepper] = useState(false)

    const [step1Items, setStep1Items] = useState([])
    const [step2Items, setStep2Items] = useState([])
    const [step3Items, setStep3Items] = useState([])
    const [step4Items, setStep4Items] = useState([])

    const goNext = () => {
        setCurrentStep(currentStep + 1);
    }

    const goPrev = () => {
        setCurrentStep(currentStep - 1);
    }

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setStepper(true)
        }
    }, [])

    return (
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
                        {currentStep === 2 && <ThirdStep/>}
                        {currentStep === 3 && <FourthStep/>}
                    </div> 
                </form>
                <div className={styles.controllers}>
                    <Controllers 
                        currentStep={currentStep} 
                        setCurrentStep={setCurrentStep} 
                        goNext={goNext} 
                        goPrev={goPrev} 
                    />
                </div>
            </div>

        </div>
    )
}