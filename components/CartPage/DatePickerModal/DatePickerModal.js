import React, { useState, useEffect } from 'react';
import styles from './DatePickerModal.module.scss'
import Local from './shippings/Local';
import Pickup from './shippings/Pickup';

import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PublicIcon from '@material-ui/icons/Public';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import add from 'date-fns/add'
import format from 'date-fns/format'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
    textField: {
        width: 'calc(100% - 68px)',
        borderRadius: '0px',
    },
});

export default function DatePickerModal ({closeDateModal, date, setDate, time, setTime}) {
    const classes = useStyles();

    const [pickAndGoActive, setPickAndGoActive] = useState(true);
    const [localActive, setLocalDeliverActive] = useState(false);
    const [nationalActive, setNationalActive] = useState(false);

    const [cp, setCp] = useState('');
    const [validCP, setValidCP] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const [minDate, setMinDate] = useState(new Date())

    const validCPList = ['0001', '0002', '0003', '0004', '0005']
    
    const resetAllStates = () => {
        setDate(new Date(), 'MM/dd/yyyy');
        setTime('Por la mañana - 9:00 a 13:00');
        setCp('');
        setValidCP('')
        setConfirmationMessage('')

        let today = new Date();
        let meridiem = format(today, "aaa")
        let newDate

        if (meridiem === 'pm'){
            newDate = add(today, {days: 1});
            setDate(newDate, 'MM/dd/yyyy')
            setMinDate(newDate);
        }
    }

    const handleDateChange = (date) => {
        setDate(date);
        console.log(date)
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handlePickAndGo = () => {
        setPickAndGoActive(true);
        setLocalDeliverActive(false);
        setNationalActive(false);

        resetAllStates()
    }

    const handleLocal = () => {
        setPickAndGoActive(false);
        setLocalDeliverActive(true);
        setNationalActive(false);

        resetAllStates()
    }

    const handleNational = () => {
        setPickAndGoActive(false);
        setLocalDeliverActive(false);
        setNationalActive(true);

        resetAllStates()
    }

    const handleCP = (event) => {
        setCp(event.target.value);
    }

    const validateCP = (event) => {
        event.preventDefault()

        let cpIsValid = validCPList.indexOf(cp);

        if (cpIsValid > -1) {
            setValidCP('valid');
            setConfirmationMessage('CP: '+ cp + ' se encuentra en la zona de envío')
        } else {
            setValidCP('noValid');
        }
    }

    const showDate = () => {
        /* if (isPast(new Date(2021, 10, 2))){
            console.log("La fecha 2014, 6, 2 está en el pasado")
        } else {
            console.log('La fecha está en el futuro')
        } 
        const today = new Date();
        console.log(format(today, "'Actualmente estamos en' aaa"))*/
    }

    function shouldDisableDate(day) {
        return day.getDay() === 0;
    }

    const [windowReady, setWindowReady] = useState(false)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true)
        }
    }, [])

    return (
        <div className={styles.container}>
            {windowReady &&
            <>
            <div className={styles.header}>
                <div className={styles.lateralBlock}></div>
                <div className={styles.title}>
                    Selecciona la fecha y hora de entrega
                </div>
                <div className={styles.lateralBlock}>
                    <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} onClick={closeDateModal} />
                </div>
            </div>
            <div className={styles.deliveryTypes}>
                <div className={pickAndGoActive ? `${styles.deliveryType} ${styles.active}` : styles.deliveryType} onClick={handlePickAndGo}>
                    <div className={styles.icon}>
                        <StorefrontIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Recogida Local</div> 
                </div>
                <div className={localActive ? `${styles.deliveryType} ${styles.active}` : styles.deliveryType} onClick={handleLocal}>
                    <div className={styles.icon}>
                        <LocalShippingOutlinedIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Envío Local</div> 
                </div>
                <div className={nationalActive ? `${styles.deliveryType} ${styles.active}` : styles.deliveryType} onClick={handleNational}>
                    <div className={styles.icon}>
                        <PublicIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Envío Nacional</div> 
                </div>
            </div>
            <div className={styles.currentDelivery}>

                {pickAndGoActive === true &&
                    <Pickup
                        shouldDisableDate={shouldDisableDate}
                        minDate={minDate}
                        date={date}
                        handleDateChange={handleDateChange}
                        time={time}
                        handleTimeChange={handleTimeChange}
                    />
                }

                {localActive === true &&
                    <div className={styles.deliveryInfo}>
                        <Local 
                            cp={cp} 
                            handleCP={handleCP} 
                            validCP={validCP} 
                            validateCP={validateCP} 
                            confirmationMessage={confirmationMessage} 
                            shouldDisableDate={shouldDisableDate}
                            minDate={minDate}
                            date={date}
                            handleDateChange={handleDateChange}
                            time={time}
                            handleTimeChange={handleTimeChange}
                            setValidCP={setValidCP} 
                            showDate={showDate}
                        />
                    </div>
                }

                {nationalActive === true &&
                    <div>National Delivery is Active</div>
                }

            </div>
            </>
            }           
        </div>
    )
}