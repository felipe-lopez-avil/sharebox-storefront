import React, {useState} from 'react';
import styles from './DatePickerModal.module.scss'
import Image from 'next/image'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PublicIcon from '@material-ui/icons/Public';
import { PublicOutlined } from '@material-ui/icons';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
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

export default function DatePickerModal ({closeDateModal}) {
    const classes = useStyles();

    const [pickAndGoActive, setPickAndGoActive] = useState(true);
    const [localActive, setLocalDeliverActive] = useState(false);
    const [nationalActive, setNationalActive] = useState(false);

    const [cp, setCp] = useState('');
    const [validCP, setValidCP] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const [date, setDate] = useState(new Date(), 'MM/dd/yyyy');
    const [time, setTime] = useState('Por la mañana - 9:00 a 13:00');

    const validCPList = ['0001', '0002', '0003', '0004', '0005']

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handlePickAndGo = () => {
        setPickAndGoActive(true);
        setLocalDeliverActive(false);
        setNationalActive(false);
    }

    const handleLocal = () => {
        setPickAndGoActive(false);
        setLocalDeliverActive(true);
        setNationalActive(false);
    }

    const handleNational = () => {
        setPickAndGoActive(false);
        setLocalDeliverActive(false);
        setNationalActive(true);
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

    return (
        <div className={styles.container}>
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
                <div className={styles.deliveryType} onClick={handlePickAndGo}>
                    <div className={styles.icon}>
                        <StorefrontIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Recogida Local</div> 
                </div>
                <div className={styles.deliveryType} onClick={handleLocal}>
                    <div className={styles.icon}>
                        <LocalShippingOutlinedIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Envío Local</div> 
                </div>
                <div className={styles.deliveryType} onClick={handleNational}>
                    <div className={styles.icon}>
                        <PublicIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div className={styles.type}>Envío Nacional</div> 
                </div>
            </div>
            <div className={styles.currentDelivery}>

                {pickAndGoActive === true &&
                    <div>Pick and Go is Active</div>
                }

                {localActive === true &&
                    <div className={styles.deliveryInfo}>
                        <div className={styles.cpSection}>
                            <form noValidate autoComplete="off">
                                <div className={styles.textField}>
                                    <TextField 
                                        id="from" 
                                        label="Introduce tu C.P. para verificar que tenemos envíos locales a tu zona" 
                                        variant="outlined" 
                                        value={cp}
                                        onChange={handleCP}
                                        className={classes.textField}
                                    />
                                    <button className={styles.validateButton} onClick={validateCP}> 
                                        <SearchIcon fontSize="large"/> 
                                    </button>
                                </div>
                            </form>
                            {validCP === 'valid' && 
                                <div className={styles.selector}>
                                    <div className={styles.confirmationBox}>{confirmationMessage}</div>
                                    <div className={styles.pickerContainer}>
                                        <div className={styles.date}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                disableToolbar
                                                fullWidth="true"
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="MM/dd/yyyy"
                                                minDate={new Date()}
                                                maxDate={new Date("2021-10-07")}
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date picker inline"
                                                value={date}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                />
                                                {/* <KeyboardDatePicker
                                                    autoOk
                                                    fullWidth="true"
                                                    variant="inline"
                                                    inputVariant="outlined"
                                                    label="With keyboard"
                                                    format="MM/dd/yyyy"
                                                    value={date}
                                                    InputAdornmentProps={{ position: "start" }}
                                                    onChange={handleDateChange}
                                                /> */}
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className={styles.time}>
                                            <FormControl variant="outlined" className={classes.formControl} fullWidth="true">
                                                <InputLabel id="select-date">Hora de entrega</InputLabel>
                                                <Select
                                                    labelId="select-date"
                                                    id="date-select"
                                                    value={time}
                                                    onChange={handleTimeChange}
                                                    label="Hora de entrega"
                                                >
                                                    <MenuItem value={'Por la mañana - 9:00 a 13:00'}>Por la mañana - 9:00 a 13:00</MenuItem>
                                                    <MenuItem value={'Por la tarde - 13:00 a 18:00'}>Por la tarde - 13:00 a 18:00</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>                                
                            }

                            {validCP === 'noValid' && 
                                <div className={styles.confirmationNegativeBox}>Lo sentimos, pero no contamos con envíos en tu zona</div>
                            }
                            
                        </div>
                    </div>
                }

                {nationalActive === true &&
                    <div>National Delivery is Active</div>
                }

            </div>
        </div>
    )
}