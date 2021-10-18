import React, { useState } from 'react'
import styles from './Form.module.scss'

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://sharebox.us5.list-manage.com/subscribe/post?u=e3cd0b50aa0b11ff7170a7545&amp;id=65b9fe8c05";

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () => {
        email &&
        fname &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });
  
        return (
            <div>
                <input
                    ref={node => (fname = node)}
                    type="text"
                    placeholder="Tu Nombre"
                />
                <input
                    ref={node => (company = node)}
                    type="text"
                    placeholder="Tu Compañía"
                />
                <input
                    ref={node => (city = node)}
                    type="text"
                    placeholder="Ciudad"
                />
                <input
                    ref={node => (ocassion = node)}
                    type="text"
                    placeholder="Ocasión de regalo"
                />
                <input
                    ref={node => (boxes = node)}
                    type="text"
                    placeholder="Cantidad de Boxes"
                />
                <input
                    ref={node => (idealDate = node)}
                    type="text"
                    placeholder="Fecha ideal de entrega"
                />
                <input
                    ref={node => (budget = node)}
                    type="text"
                    placeholder="Presupuesto por Box"
                />
                <input
                    ref={node => (email = node)}
                    type="email"
                    placeholder="Your email"
                />
                <input
                    ref={node => (phoneNumber = node)}
                    type="text"
                    placeholder="Número de Teléfono"
                />
                <br />
                <button onClick={submit}>
                    Submit
                </button>
                {status === "sending" && 
                <div >sending...</div>
                }
                {status === "error" && (
                <div
                    dangerouslySetInnerHTML={{ __html: 'Ups, algo salió mal. Puede que el correo que ingresaste ya esté inscrito en nuestro boletín.' }}
                    className={`${styles.confirmationMessage} ${styles.error}`}
                />
                )}
                {status === "success" && (
                <div
                    dangerouslySetInnerHTML={{ __html: '¡Gracias por suscribirte!' }}
                    className={`${styles.confirmationMessage} ${styles.success}`}
                />
                )}
            </div>
        );
    }
};

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
