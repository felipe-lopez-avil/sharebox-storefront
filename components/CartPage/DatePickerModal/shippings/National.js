import React, { useState, useEffect } from 'react'
import styles from './shippings.module.scss'


export default function National () {

    return (
        <div className={styles.nationalContainer}>
            <div className={styles.options}>
                <div className={styles.card}>
                    <div className={styles.shippingTitle}>Envío Exprés</div>
                    <div className={styles.shippingDescription}>
                        1 a 2 días hábiles
                    </div>
                </div>
                <div className={styles.card}>
                <div className={styles.shippingTitle}>Envío Normal</div>
                    <div className={styles.shippingDescription}>
                        3 a 5 días hábiles
                    </div>
                </div>
            </div>
        </div>
    )
}