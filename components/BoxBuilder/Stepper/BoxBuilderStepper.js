import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';

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

export default function BoxBuilderStepper({currentStep}) {
    return (
        <Stepper activeStep={currentStep} orientation="vertical" connector={<StepperConnector />}>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 >PASO 1.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Let the Magic Begin.</h3>
                </StepContent> 
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 >PASO 2.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Something Special.</h3>
                </StepContent>
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 >PASO 3.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Go Extra.</h3>
                </StepContent>
            </Step>
            <Step>
                <StepLabel StepIconComponent={StepIcon}>
                    <h4 >PASO 4.</h4>
                </StepLabel>
                <StepContent>
                    <h3 >Share Happiness!</h3>
                </StepContent>
            </Step>
        </Stepper> 
    )
}