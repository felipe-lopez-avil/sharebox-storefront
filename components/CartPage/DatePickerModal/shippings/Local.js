import styles from './shippings.module.scss'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
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

export default function Local ({cp, handleCP, validCP, validateCP, confirmationMessage, shouldDisableDate, minDate, date, handleDateChange, time, handleTimeChange, saveAttributes}) {
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

    return(
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
                                    shouldDisableDate={shouldDisableDate}
                                    fullWidth="true"
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="MM/dd/yyyy"
                                    minDate={minDate}
                                    maxDate={limit}
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={date}
                                    onChange={handleDateChange}
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
                                    <MenuItem value={'Por la mañana - 9:00 a 13:00'}>Por la mañana - 9:00 a 13:00</MenuItem>
                                    <MenuItem value={'Por la tarde - 13:00 a 18:00'}>Por la tarde - 13:00 a 18:00</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <button onClick={saveAttributes}>Confirmar</button>
                </div>                                
            }

            {validCP === 'noValid' && 
                <div className={styles.confirmationNegativeBox}>Lo sentimos, pero no contamos con envíos en tu zona</div>
            }
            
            {/* <button onClick={showDate}>Date</button> */}
        </div>
    )
}