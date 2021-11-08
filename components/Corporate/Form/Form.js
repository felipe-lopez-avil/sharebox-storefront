import React, { useState } from 'react'
import styles from './Form.module.scss'

import MailchimpSubscribe from "react-mailchimp-subscribe"

import { useRouter } from 'next/router'

const url = "https://sharebox.us5.list-manage.com/subscribe/post?u=e3cd0b50aa0b11ff7170a7545&amp;id=65b9fe8c05";

const CustomForm = ({ status, message, onValidated }) => {
    let email, fname, company, city, ocassion, boxes, idealDate, budget, phoneNumber;
    const submit = () => 
        email &&
        fname &&
        company &&
        city &&
        ocassion &&
        boxes &&
        idealDate &&
        budget &&
        phoneNumber &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            FNAME: fname.value,
            COMPANY: company.value,
            CITY: city.value,
            EMAIL: email.value,
            PHONE: phoneNumber.value,
            OCASSION: ocassion.value,
            BOXES: boxes.value,
            IDEALDATE: idealDate.value,
            BUDGET: budget.value,
        });

        return (
            <div className={styles.formContainer} >
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label>Nombre</label>
                        <input
                            ref={node => (fname = node)}
                            type="text"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Compañía</label>
                        <input
                            ref={node => (company = node)}
                            type="text"
                            placeholder="Compañía"
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label>Ciudad</label>
                        <input
                            ref={node => (city = node)}
                            type="text"
                            placeholder="Ciudad"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Motivo de Regalo</label>
                        <input
                            ref={node => (ocassion = node)}
                            type="text"
                            placeholder="Motivo"
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label>Cantidad de Boxes</label>
                        <input
                            ref={node => (boxes = node)}
                            type="text"
                            placeholder="Cantidad"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Fecha ideal de entrega</label>
                        <input
                            ref={node => (idealDate = node)}
                            type="text"
                            placeholder="Fecha"
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label>Presupuesto por Box</label>
                        <input
                            ref={node => (budget = node)}
                            type="text"
                            placeholder="Presupuesto"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Email</label>
                        <input
                            ref={node => (email = node)}
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label>Número de Teléfono</label>
                        <input
                            ref={node => (phoneNumber = node)}
                            type="text"
                            placeholder="Número"
                        />
                    </div>
                </div>
                <button onClick={submit}>
                    Enviar formulario
                </button>
                {status === "sending" && 
                <div >sending...</div>
                }
                {status === "error" && (
                <div
                    dangerouslySetInnerHTML={{ __html: 'Ups, algo salió mal. Puede ser que ya nos has contactado antes o que te faltó llenar algún dato importante' }}
                    className={`${styles.confirmationMessage} ${styles.error}`}
                />
                )}
                {status === "success" && (
                <div
                    dangerouslySetInnerHTML={{ __html: '¡Gracias por ponerte en contacto!' }}
                    className={`${styles.confirmationMessage} ${styles.success}`}
                />
                )}
            </div>
        );
    
};

export default function Form () {

    const [email, setEmail] = useState('')
    const [formSent, setFormSent] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        
        setFormSent(true)
    }

    const router = useRouter()

    return (
        <>
        <div className={styles.formSection} id="contacto">
            <h2>¡Cotiza con nosotros!</h2>
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => {
                            subscribe(formData)
                            router.push({
                                query: { formSent: 'true' }
                            })
                        }}
                    />
                )}
            />
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
