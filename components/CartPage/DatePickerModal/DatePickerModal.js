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

export default function DatePickerModal ({closeDateModal, setDefinitiveDate, date, setDate, minDate, setMinDate, time, setTime, deliveryType, setDeliveryType, saveAttributes, saveNationalAttributes, nextDayOnly, afternoonOnly}) {
    const classes = useStyles();

    const [pickAndGoActive, setPickAndGoActive] = useState(true);
    const [localActive, setLocalDeliverActive] = useState(false);
    const [nationalActive, setNationalActive] = useState(false);

    const [cp, setCp] = useState('');
    const [validCP, setValidCP] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const validCPList = [
        '64000','64004','64007','64009','64010','64018','64019','64020','64030','64040','64049','64050','64060','64070','64100','64102','64103','64104','64105','64106','64107','64108','64109','64110','64116','64117',
        '64118','64119','64120','64130','64140','64145','64148','64150','64157','64158','64159','64160','64165','64167','64168','64170','64178','64180','64186','64190','64200','64204','64205','64206','64208','64209',
        '64210','64215','64217','64218','64219','64220','64225','64226','64227','64228','64229','64230','64233','64234','64235','64236','64237','64238','64240','64244','64245','64246','64247','64248','64249','64250',
        '64258','64259','64260','64264','64265','64266','64268','64269','64270','64280','64290','64299','64300','64310','64320','64330','64339','64340','64344','64345','64346','64347','64348','64349','64350','64360',
        '64365','64366','64367','64368','64369','64370','64380','64390','64400','64410','64420','64429','64430','64440','64442','64450','64460','64470','64480','64488','64489','64490','64500','64508','64510','64517',
        '64520','64530','64536','64540','64549','64550','64560','64568','64570','64571','64580','64590','64600','64610','64618','64619','64620','64623','64630','64632','64633','64634','64635','64636','64637','64638',
        '64639','64640','64649','64650','64659','64660','64700','64710','64715','64718','64720','64723','64730','64740','64750','64753','64754','64760','64764','64765','64769','64770','64780','64783','64788','64790',
        '64798','64800','64810','64820','64830','64833','64834','64836','64840','64844','64845','64846','64849','64850','64858','64859','64860','64865','64878','64880','64890','64893','64898','64899','64900','64909',
        '64910','64920','64925','64926','64930','64940','64949','64950','64960','64968','64969','64970','64978','64979','64980','64983','64984','64985','64986','64987','64988','64989','64990','64996','64997','66200',
        '66210','66214','66215','66216','66217','66218','66219','66220','66224','66225','66226','66227','66228','66230','66233','66235','66236','66237','66238','66239','66240','66244','66245','66246','66247','66249',
        '66250','66254','66256','66257','66259','66260','66263','66265','66266','66267','66268','66270','66273','66274','66275','66276','66277','66278','66279','66280','66285','66286','66287','66290','66295','66296',
        '66297','66400','66410','66412','66413','66414','66415','66417','66418','66420','66422','66423','66424','66425','66427','66428','66430','66434','66435','66436','66437','66438','66440','66444','66445','66446',
        '66447','66448','66449','66450','66452','66455','66456','66457','66458','66459','66460','66463','66464','66465','66466','66468','66469','66470','66473','66475','66476','66477','66478','66479','66480','66482',
        '66484','66485','66486','66488','66489','66490','66493','66494','66495','66496','66499','67100','67102','67110','67112','67113','67115','67116','67117','67118','67119','67120','67123','67124','67125','67126',
        '67128','67129','67130','67132','67133','67134','67140','67144','67150','67153','67154','67155','67160','67163','67164','67165','67166','67167','67168','67169','67170','67173','67174','67175','67176','67177',
        '67178','67179','67180','67182','67183','67184','67185','67186','67188','67189','67190','67192','67193','67194','67195','67196','67197','67198','67199','67200','67202','67203','67204','67205','11111'
    ]

    const handleDateChange = (date) => {
        setDate(date);
        setDefinitiveDate(date);
        //console.log(date);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handlePickAndGo = () => {

        if (pickAndGoActive === false){
            setPickAndGoActive(true);
            setLocalDeliverActive(false);
            setNationalActive(false);

            /* setDate(add(new Date(), {days: 1}), 'dd/MM/yyyy');
            setDefinitiveDate(add(new Date(), {days: 1}), 'dd/MM/yyyy'); */
            setTime('Por la mañana - 9:00 a 13:00');
            setDeliveryType('Recogida Local')
            setCp('');
            setValidCP('');
            setConfirmationMessage('');

            /* let today = new Date();
            let meridiem = format(today, "aaa")
            let newDate
            let currrentHour = parseInt(format(today, "H"))

            if (currrentHour > 15){
                newDate = add(today, {days: 2});
                setDate(newDate, 'dd/MM/yyyy')
                setMinDate(newDate);
            } */
        }

    }

    const handleLocal = () => {

        if (localActive === false){
            setPickAndGoActive(false);
            setLocalDeliverActive(true);
            setNationalActive(false);

            //console.log(format(add(new Date(), {days: 1}), 'dd/MM/yyyy'))
            /* setDate(add(new Date(), {days: 1}), 'dd/MM/yyyy');
            setDefinitiveDate(add(new Date(), {days: 1}), 'dd/MM/yyyy'); */
            setTime('Por la mañana - 9:00 a 13:00');
            setDeliveryType('Envío Local')
            setCp('');
            setValidCP('')
            setConfirmationMessage('')

            /* let today = new Date();
            let meridiem = format(today, "aaa")
            let newDate
            let currrentHour = parseInt(format(today, "H"))

            if (currrentHour > 15){
                newDate = add(today, {days: 2});
                setDate(newDate, 'dd/MM/yyyy')
                setMinDate(newDate);
            } */
        }

    }

    const handleNational = () => {

        if (nationalActive === false){
            setPickAndGoActive(false);
            setLocalDeliverActive(false);
            setNationalActive(true);

            /* setDate(add(new Date(), {days: 1}), 'dd/MM/yyyy') */
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
        return (
            (day.getDay() === 0 & !(day.getDate() === 13 & format(day, "L") === '2')) ||
            (day.getDate() === 24 & format(day, "L") === '12') ||
            (day.getDate() === 25 & format(day, "L") === '12') ||
            (day.getDate() === 26 & format(day, "L") === '12') ||
            (day.getDate() === 27 & format(day, "L") === '12') ||
            (day.getDate() === 30 & format(day, "L") === '12') ||
            (day.getDate() === 31 & format(day, "L") === '12') ||
            (day.getDate() === 1 & format(day, "L") === '1') ||
            (day.getDate() === 2 & format(day, "L") === '1') ||
            (day.getDate() === 3 & format(day, "L") === '1') 
        )
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
                    <div className={styles.type}>Pickup Sin Costo</div> 
                </div>
                <div className={localActive ? `${styles.deliveryType} ${styles.active}` : styles.deliveryType} onClick={handleLocal}>
                    <div className={styles.icon}>
                        <LocalShippingOutlinedIcon style={{ fontSize: 35 }}/>
                    </div>
                    <div>
                        <div className={styles.type}>Envío Local</div> 
                        <div className={styles.mty}>(Monterrey y zona metropolitana)</div>
                    </div>
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
                        afternoonOnly={afternoonOnly}
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
                    <National
                        saveNationalAttributes={saveNationalAttributes}
                    />
                }

            </div>
            </>
            }           
        </div>
    )
}