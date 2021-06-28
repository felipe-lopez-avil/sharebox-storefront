import {useState} from 'react'
import styles from '../styles/make-your-box.module.scss'
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';


import MakeYourBoxSlider from '../components/SliderMYB/SliderMYB'
import MultiStepForm from '../components/MakeYourBox/MultiStepForm/MultiStepForm'

const StepperConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#028ab5',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
})(StepConnector);

const useStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#028ab5',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#028ab5',
      zIndex: 1,
      fontSize: 18,
    },
});

function StepIcon(props) {
    const classes = useStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
}

StepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };

export default function MakeYourBox() {

    const [currentStep, setCurrentStep] = useState(0)
    return (
        <div className={styles.makeYourBox}>

            {/*Columna izquierda. Sección donde se muestran los pasos del proceso así 
            como los porductos que llevas en el proceso*/}
            <div className={styles.summary}>
                <Stepper activeStep={currentStep} orientation="vertical" connector={<StepperConnector />}>
                    <Step>
                        <StepLabel StepIconComponent={StepIcon}>
                            <h4 className={styles.stepLabel}>PASO 1.</h4>
                        </StepLabel>
                        <StepContent>
                            <h3 className={styles.stepLabel}>Let the Magic Begin.</h3>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={StepIcon}>
                            <h4 className={styles.stepLabel}>PASO 2.</h4>
                        </StepLabel>
                        <StepContent>
                            <h3 className={styles.stepLabel}>Something Special.</h3>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={StepIcon}>
                            <h4 className={styles.stepLabel}>PASO 3.</h4>
                        </StepLabel>
                        <StepContent>
                            <h3 className={styles.stepLabel}>Go Extra.</h3>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel StepIconComponent={StepIcon}>
                            <h4 className={styles.stepLabel}>PASO 4.</h4>
                        </StepLabel>
                        <StepContent>
                            <h3 className={styles.stepLabel}>Share Happiness!</h3>
                        </StepContent>
                    </Step>
                </Stepper>
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