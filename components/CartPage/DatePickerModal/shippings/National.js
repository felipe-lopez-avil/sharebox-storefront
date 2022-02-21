import React, { useState, useEffect } from 'react'
import styles from './shippings.module.scss'

export default function National ({saveNationalAttributes}) {

    return (
        <div className={styles.nationalContainer}>
            <div className={styles.options}>
                <div className={styles.card} onClick={(e) => saveNationalAttributes('Expres', e)}>
                    <div className={styles.shippingTitle}>Envío Exprés</div>
                    <div className={styles.shippingDescription}>
                        1 a 2 días hábiles
                    </div>
                    <div className={styles.price}>$215.00</div>
                </div>
                <div className={styles.card} onClick={(e) => saveNationalAttributes('Normal', e)}>
                <div className={styles.shippingTitle}>Envío Normal</div>
                    <div className={styles.shippingDescription}>
                        3 a 5 días hábiles
                    </div>
                    <div className={styles.price}>$145.00</div>
                </div>
            </div>
        </div>
    )
}