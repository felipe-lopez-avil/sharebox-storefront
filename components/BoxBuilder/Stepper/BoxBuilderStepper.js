import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepConnector from '@material-ui/core/StepConnector';
import Badge from '@material-ui/core/Badge';
import Check from '@material-ui/icons/Check';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

const StepperConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% +16)',
      right: 'calc(50% +16)',
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
      justifyContent: 'center',
      width: 24
    },
    noPadding: {
      padding: 0,
      paddingTop: '24px',
    },
    active: {
      color: '#028ab5',
    },
    circle: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#028ab5',
      zIndex: 1,
      fontSize: 18,
    },
    storagedItems: {
      display: 'flex',
    },
    productCover: {
      width: '100%',
      height: '100%',
      padding: '5px',
      backgroundColor: 'cadetblue'
    },
    producImage: {
      width: '100%',
      height: 'calc((16vw / 4) - 5px)',
      borderRadius: '5px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.2);',
    },
    wrapper: {
      width: '100%',
      marginTop: '40px',
    },
    productsInCart: {
      marginTop: '20px',
      marginBottom: '10px'
    },
    productContainer: {
      width: '100%',
      height: 'calc(16vw / 3)',
      paddingRight: '6px',
      paddingBottom: '6px',
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: '100%',
      backgroundColor: '#e9e9e9',
      borderRadius: '5px',
      position: 'relative',
      overflow: 'hidden',
    },
    badge: {
      position: 'absolute',
      minWidth: '25px',
      top: '-4px',
      right: '3px',
      padding: '2px 6px',
      borderRadius: '12px',
      backgroundColor: '#0082aa',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: '600',
      textAlign: 'center',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #fff'
    },
    step: {
      fontFamily: '"Prompt"',
    }
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
     **/
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     **/
    completed: PropTypes.bool,
  }; 

export default function BoxBuilderStepper({currentStep, step1Items, step2Items, step3Items}) {
  const classes = useStepIconStyles();

    return (
      <>
        <Stepper className={classes.noPadding} activeStep={currentStep} orientation="vertical" connector={<StepperConnector />}>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 className={classes.step} >PASO 1.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Let the Magic Begin.</h3>
                </StepContent> 
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 className={classes.step} >PASO 2.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Something Special.</h3>
                </StepContent>
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 className={classes.step} >PASO 3.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Go Extra.</h3>
                </StepContent>
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 className={classes.step} >PASO 4.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Share Happiness!</h3>
                </StepContent>
            </Step>
        </Stepper> 
        <div className={classes.wrapper}>

          <Grid container spacing={0}>
            {step1Items.productID !== '' &&
              <Grid item xs={4}>
                <div className={classes.productContainer}>
                    <div className={classes.productImage}>
                      <Image
                        src={step1Items.image}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span className={classes.badge}>{step1Items.quantity}</span>
                </div>  
              </Grid>
            }
            
            {step2Items.map(item => (
              <Grid item xs={4}>
                <div className={classes.productContainer}>
                    <div className={classes.productImage}>
                      <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span className={classes.badge}>{item.quantity}</span>
                </div>  
              </Grid>
            ))}

            {step3Items.map(item => (
              <Grid item xs={4}>
                <div className={classes.productContainer}>
                    <div className={classes.productImage}>
                      <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span className={classes.badge}>{item.quantity}</span>
                </div>  
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    )
}