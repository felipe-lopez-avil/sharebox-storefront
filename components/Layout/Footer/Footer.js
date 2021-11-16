import React, { useState } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://sharebox.us2.list-manage.com/subscribe/post?u=4d7b381e967db5d4820bb8e94&amp;id=a75229ef2c";

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });
  
        return (
            <div>
                <input
                    ref={node => (email = node)}
                    type="email"
                    placeholder="Your email"
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
  };

export default function Footer() {

    const [email, setEmail] = useState('')
    const [formSent, setFormSent] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        
        setFormSent(true)
    }

    return (
        <div className={styles.footer}>
            <div className={styles.links}>
                <h5 className={styles.sectionTitle}>Enlaces Rápidos</h5>
                <Link href="terminos-y-condiciones">
                    <p className={styles.link}>Términos y condiciones</p>
                </Link>
                <Link href="aviso-de-privacidad">
                    <p className={styles.link}>Aviso de Privacidad</p>
                </Link>
                <Link href="terminos-de-servicio">
                    <p className={styles.link}>Términos de Servicio</p>
                </Link>
                <Link href="politica-de-devoluciones">
                    <p className={styles.link}>Política de Devoluciones</p>
                </Link>

            </div>
            <div className={styles.contact}>
                <h5 className={styles.sectionTitle}>Contacto</h5>
                <p className={styles.adress}>
                    Dirección: Lic. José Benitez 645, Col. Obispado, Monterrey, Nuevo León, México, C.P. 64060
                </p>
                <p className={styles.adress}>
                    Correo: share@sharebox.mx
                </p>
                <p className={styles.adress}>
                    Teléfono: +52 81 3405 3769
                </p>
            </div>
            <div className={styles.newsletter}>
                <h5 className={styles.sectionTitle}>Boletín</h5>

                {formSent ?
                    <div className={styles.confirmation}>
                        <span>Suscripción exitosa</span> <CheckCircleOutlineIcon/>
                    </div>
                    :
                    <div className={styles.form}>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                status={status}
                                message={message}
                                onValidated={formData => subscribe(formData)}
                                />
                            )}
                        />
                        {/* <form action="https://sharebox.us2.list-manage.com/subscribe/post" method="POST" noValidate onSubmit={handleSubmit}>
                            <input type="hidden" name="u" value="4d7b381e967db5d4820bb8e94"/>
                            <input type="hidden" name="id" value="a75229ef2c"/>
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
                        </form> */}
                    </div>
                }
            </div>
        </div>
    )
}