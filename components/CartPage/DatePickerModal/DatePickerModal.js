import React, { useState, useEffect } from 'react';
import styles from './DatePickerModal.module.scss'
import Local from './shippings/Local';
import Pickup from './shippings/Pickup';
import National from './shippings/National';

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

export default function DatePickerModal ({closeDateModal, setDefinitiveDate, date, setDate, minDate, setMinDate, time, setTime, deliveryType, setDeliveryType, saveAttributes}) {
    const classes = useStyles();

    const [pickAndGoActive, setPickAndGoActive] = useState(true);
    const [localActive, setLocalDeliverActive] = useState(false);
    const [nationalActive, setNationalActive] = useState(false);

    const [cp, setCp] = useState('');
    const [validCP, setValidCP] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const validCPList = ['0001', '0002', '0003', '0004', '0005']

    const handleDateChange = (date) => {
        setDate(date);
        setDefinitiveDate(date);
        console.log(date);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handlePickAndGo = () => {

        if (pickAndGoActive === false){
            setPickAndGoActive(true);
            setLocalDeliverActive(false);
            setNationalActive(false);

            setDate(new Date(), 'dd/MM/yyyy');
            setTime('Por la mañana - 9:00 a 13:00');
            setDeliveryType('Recogida Local')
            setCp('');
            setValidCP('');
            setConfirmationMessage('');

            let today = new Date();
            let meridiem = format(today, "aaa")
            let newDate

            if (meridiem === 'pm'){
                newDate = add(today, {days: 1});
                setDate(newDate, 'MM/dd/yyyy')
                setMinDate(newDate);
            }
        }

    }

    const handleLocal = () => {

        if (localActive === false){
            setPickAndGoActive(false);
            setLocalDeliverActive(true);
            setNationalActive(false);

            setDate(new Date(), 'dd/MM/yyyy');
            setTime('Por la mañana - 9:00 a 13:00');
            setDeliveryType('Envío Local')
            setCp('');
            setValidCP('')
            setConfirmationMessage('')

            let today = new Date();
            let meridiem = format(today, "aaa")
            let newDate

            if (meridiem === 'pm'){
                newDate = add(today, {days: 1});
                setDate(newDate, 'dd/MM/yyyy')
                setMinDate(newDate);
            }
        }

    }

    const handleNational = () => {

        if (nationalActive === false){
            setPickAndGoActive(false);
            setLocalDeliverActive(false);
            setNationalActive(true);

            setDate(new Date(), 'dd/MM/yyyy')
            setTime('');
            setDeliveryType('Envío Nacional')
            setCp('');
            setValidCP('')
            setConfirmationMessage('')
        }

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
                        saveAttributes={saveAttributes}
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
                            saveAttributes={saveAttributes}
                        />
                    </div>
                }

                {nationalActive === true &&
                    <National/>
                }

            </div>
            </>
            }           
        </div>
    )
}