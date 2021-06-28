import {useState} from 'react'
import styles from '../styles/make-your-box.module.scss'

/* import { Steps } from 'antd';*/
//import "antd/dist/antd.css"; 

import MakeYourBoxSlider from '../components/SliderMYB/SliderMYB'
import MultiStepForm from '../components/MakeYourBox/MultiStepForm/MultiStepForm'

// const { Step } = Steps;

export default function MakeYourBox() {

    const [currentStep, setCurrentStep] = useState(0)
    return (
        <div className={styles.makeYourBox}>

            {/*Columna izquierda. Sección donde se muestran los pasos del proceso así 
            como los porductos que llevas en el proceso*/}
            <div className={styles.summary}>
                {/* <Steps direction="vertical" current={currentStep}>
                    <Step title="PASO 1." description="Let the Magic Begin."/>
                    <Step title="PASO 2." description="Something Special." />
                    <Step title="PASO 3." description="Go Extra." />
                    <Step title="PASO 4." description="Share Happiness!."/>
                </Steps> */}
            </div>

            {/*Columna derecha. Sección donde se muestran los productos a elegir*/}
            <div className={styles.choose}>

                <MultiStepForm currentStep={currentStep} setCurrentStep={setCurrentStep} />

            </div>
            
            {/* <div className={styles.total}>
                <h2>Total: $999.99</h2>
            </div> */}
        </div>
    )
}