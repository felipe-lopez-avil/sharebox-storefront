import React, {useState} from 'react';
import styles from './CardModal.module.scss'
import Image from 'next/image'

import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function CardModal ({closeCardModal, selectedCard, setSelectedCard, cardFrom, setCardFrom, cardTo, setCardTo, cardMessage, setCardMessage, saveCardAttributes}) {

    const [cardPreview, setCardPreview] = useState(false);
    const [cardImage, setCardImage] = useState('https://cdn.shopify.com/s/files/1/0456/6820/4706/files/congratulations-06.png?v=1630517306')
    const [cardType, setCardType] = useState('')

    function showPreview(selectedCard, imageLink) {
        setCardPreview(true)
        setCardImage(imageLink)
        setSelectedCard(selectedCard)
    }

    const hidePreview = () => {
        setCardPreview(false)
    }

    const handleFromChange = (e) => {
        setCardFrom(e.target.value)
    }

    const handleToChange = (e) => {
        setCardTo(e.target.value)
    }
    const handleMessageChange = (e) => {
        setCardMessage(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.lateralBlock}></div>
                <div className={styles.title}>
                    Selecciona la tarjeta que quieras regalar
                </div>
                <div className={styles.lateralBlock}>
                    <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} onClick={closeCardModal} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.cardBox} onClick={() => showPreview('Tarjeta de Cumpleaños', 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/happy-birthday.png?v=1630507598')}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Birthday</div>
                </div>
                <div className={styles.cardBox} onClick={() => showPreview('Tarjeta de Aniversario', 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/aniversary-04.png?v=1630517306')}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Aniversary</div>
                </div>
                <div className={styles.cardBox} onClick={() => showPreview('Tarjeta de Felicitaciones','https://cdn.shopify.com/s/files/1/0456/6820/4706/files/congratulations-06.png?v=1630517306')}>
                    <div className={styles.iconContainer}></div>
                    <div className={styles.cardType}>Congratulations</div>
                </div>
            </div>
            <Slide direction="left" timeout={650} in={cardPreview} mountOnEnter unmountOnExit>
                <div className={styles.cardContent}>
                    <div className={styles.back} onClick={hidePreview}>
                        <ArrowBackIosIcon style={{ fontSize: 20 }}/> Elegir otra tarjeta
                    </div>
                    <div className={styles.playground}>
                        <div className={styles.cardForm}>
                            <form noValidate autoComplete="off">
                                <div className={styles.textField}>
                                    <TextField 
                                        id="from" 
                                        label="Quién envía" 
                                        variant="outlined" 
                                        fullWidth="true"
                                        value={cardFrom}
                                        onChange={handleFromChange}
                                    />
                                </div>
                                <div className={styles.textField}>
                                    <TextField 
                                        id="for" 
                                        label="A quién se envía" 
                                        variant="outlined" 
                                        fullWidth="true" 
                                        value={cardTo}
                                        onChange={handleToChange}
                                    />
                                </div>
                                <div className={styles.textField}>
                                    <TextField
                                        id="message"
                                        label="Mensaje"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth="true"
                                        value={cardMessage}
                                        onChange={handleMessageChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={styles.cardPreview}>
                            <div className={styles.cardImage}>
                                <Image
                                    src={cardImage}
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className={styles.textPreview}>
                                    <div className={styles.from}>{cardFrom}</div>
                                    <div className={styles.message}>{cardMessage}</div>
                                    <div className={styles.to}>{cardTo}</div>
                                </div>
                            </div>
                            <div className={styles.save} onClick={saveCardAttributes}>
                                Confirmar Tarjeta
                            </div>
                        </div> 
                    </div>
                </div>
            </Slide>

            {/* to my special someone
            Congratulations
            happy birthday
            happy anniversary
            she said yes
            Thank you
            with deepest simpathy */}
        </div>
    )
}