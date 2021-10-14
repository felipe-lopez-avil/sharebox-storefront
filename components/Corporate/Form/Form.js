import React, { useState } from 'react'
import styles from './Form.module.scss'

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://sharebox.us2.list-manage.com/subscribe/post?u=4d7b381e967db5d4820bb8e94&amp;id=a75229ef2c";

export default function Form () {

    const [email, setEmail] = useState('')
    const [formSent, setFormSent] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        
        setFormSent(true)
    }

    return (
        <>
        <div className={styles.formSection}>
        <MailchimpSubscribe url={url}/>
        </div>

        {/* {formSent ?
            <div className={styles.formSection}>Formulario enviado</div>
            :
            <div className={styles.formSection}>
                <div>
                    <form action="https://sharebox.us5.list-manage.com/subscribe/post-json" method="POST" noValidate onSubmit={handleSubmit}>
                        <input type="hidden" name="u" value={"e3cd0b50aa0b11ff7170a7545"}/>
                        <input type="hidden" name="id" value="65b9fe8c05"/>
                        <input type="hidden" name="c" value="?" />
                        <div className={styles.formContainer}>
                            <label htmlFor='MERGE0'>
                                <input 
                                    type="email" 
                                    name="EMAIL" 
                                    id="MERGE0"
                                    value={email} 
                                    onChange={ (e)=>{setEmail(e.target.value);} } 
                                    autoCapitalize="off" 
                                    autoCorrect="off"
                                    className={styles.input}
                                /> 
                            </label>
                        </div>
                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className={`button ${styles.suscribe}`}/>
                    </form>
                </div>
            </div>
        } */}
        </>
    )
}
