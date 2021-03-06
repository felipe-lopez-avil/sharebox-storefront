import React, { useState, useEffect } from 'react'
import {client} from '../../../../utils/shopify'

import styles from './shippings.module.scss'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LaunchIcon from '@material-ui/icons/Launch';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'
import add from 'date-fns/add'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
    textField: {
        width: 'calc(100% - 68px)',
        borderRadius: '0px',
    },
});

export default function Pickup ({shouldDisableDate, minDate, date, handleDateChange, time, afternoonOnly, handleTimeChange, saveAttributes}) {
    const classes = useStyles();

    const limit = add(new Date(), {
        years: 0,
        months: 4,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    return (
        <div className={styles.cpSection}>
            <div className={styles.adressBox}>
                <LocationOnOutlinedIcon style={{ fontSize: 35 }}/>
                <div className={styles.adress}>
                    <p>Lic. Jose Benitez 645, Centro, 64000 Monterrey, N.L.</p>
                    <div className={styles.instructions}>
                        <a href="https://goo.gl/maps/xKC5YeRgEW4poFXv7" target="blank">
                            <div className={styles.flex}>
                                <span>Indicaciones</span>
                                <LaunchIcon style={{ fontSize: 15, marginLeft: '5px' }}/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.selector}>
                <div className={styles.pickerContainer}>
                    <div className={styles.date}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                shouldDisableDate={shouldDisableDate}
                                fullWidth="true"
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                minDate={minDate}
                                maxDate={limit}
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={date}
                                onChange={handleDateChange}
                                InputProps={{ readOnly: true }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
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
                                <MenuItem value={'Por la ma??ana - 9:00 a 13:00'}>Por la ma??ana - 9:00 a 13:00</MenuItem>
                                <MenuItem value={'Por la tarde - 13:00 a 18:00'}>Por la tarde - 13:00 a 18:00</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <button onClick={saveAttributes} className={styles.confirm}>Confirmar</button>
        </div>
    )
}