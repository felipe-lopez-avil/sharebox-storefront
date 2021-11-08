import React, { useState } from 'react'
import styles from './CustomProductModal.module.scss'

import CloseIcon from '@material-ui/icons/Close';

const step1Types = [
    'Mensaje Caja'
]

const step2Types = [
    'Vinil Termo',
    'Etiqueta Vino',
    'Vinil Copa',
]

const step3Types = []

export default function CustomProductModal({currentCustomType, productToAdd, addItem, closeModal}) {

    const [customValue, setCustomValue] = useState('')

    const handleCustomValue = (event) => {
        setCustomValue(event.target.value)
    }

    let inOrOut;

    if(step1Types.indexOf(currentCustomType) !== -1){
        inOrOut = "Box";
    }else if(step2Types.indexOf(currentCustomType) !== -1){
        inOrOut = "Inside Box"
    }else{
        inOrOut = "Outside Box"
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <form>
                    <div className={styles.inputContainer}>
                        <label>{currentCustomType}</label>
                        <input
                            type="text"
                            placeholder="Mensaje"
                            value={customValue}
                            onChange={handleCustomValue}
                        />
                    </div>

                    <div className={styles.buttons}>
                        {/* <div className={styles.cancel} onClick={closeModal}>Cancelar</div> */}
                        <button
                            disabled={customValue === ''}
                            type="submit"
                            className={`${styles.confirm} ${customValue === '' ? styles.disabled : ''}`}
                            onClick={
                                (e) => {
                                    addItem(
                                        productToAdd.variants[0].id, 
                                        productToAdd.title, 
                                        productToAdd.variants[0].price, 
                                        productToAdd.images, 
                                        [
                                            {key: "Make Your Box", value: inOrOut},
                                            {key: currentCustomType, value: customValue}
                                        ], 
                                        e
                                    )
                                    setCustomValue('')
                                }
                            }
                        >Confirmar</button>
                    </div>

                    <div className={styles.close} onClick={closeModal}>
                        <CloseIcon/>
                    </div>
                    </form>
            </div>
        </div>
    )
}