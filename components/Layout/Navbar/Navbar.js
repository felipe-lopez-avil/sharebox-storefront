import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.module.scss'

import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import { FiShoppingBag } from 'react-icons/fi'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    collapse: {
        position: 'absolute',
        top: '85px',
        left: '-20px',
        backgroundColor: '#fff',
        padding: '20px',
        zIndex: '1',
        border: '2px solid #ececec',
        borderTop: '0px',
        borderRadius: '0px 0px 10px 10px',
        display: 'flex',
    },
  }));

export default function Navbar () {
    const classes = useStyles();
    
    const [windowReady, setWindowReady] = useState(false)
    const [gtg, setGtg] = useState(false);
    const [myb, setMyb] = useState(false);
    const [gfm, setGfm] = useState(false);
    const [sbcorp, setSbcorp] = useState(false);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }
    }, [])

    const handleGTG = () => {
        setGtg(!gtg);
    };
    const handleMYB = () => {
        setMyb(!myb);
    };
    const handleGFM = () => {
        setGfm(!gfm);
    }; 

    return (
        <>
            <div className={styles.desktopNavbar}>
                <div className={styles.logo}>
                    <img src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399'/>
                </div>

                {windowReady === true && 
                <div className={styles.navigation}>
                    
                    <div className={styles.navItem} onMouseEnter={handleGTG} onMouseLeave={handleGTG}>
                        <span>Gifts To Go! <ExpandMoreIcon/></span>

                        <Grow in={gtg} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.gtgDescription}>
                                    <div className={styles.gtgImage}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                    <h3>GIFTS TO GO</h3>
                                    <p>Descripción de Gifts To Go! Lorem Ipsum dolor sit amet</p>
                                </div>
                                <div className={styles.gtgCategories}>
                                    <div className={styles.categoryLink}>Boxes</div>
                                    <div className={styles.categoryLink}>Kits Armados</div>
                                    <div className={styles.categoryLink}>Globos y Flores</div>
                                    <div className={styles.categoryLink}>Snacks y Postres</div>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem} onMouseEnter={handleMYB} onMouseLeave={handleMYB}>
                        <span>Make Your Box</span>

                        <Grow in={myb} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.itemImage}>
                                    <div className={styles.image}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                                <div className={styles.itemDescription}>
                                    <h3>Make Your Box</h3>
                                    <p>Descripción de Make Your Box Lorem Ipsum dolor sit amet</p>
                                    <div className="button">¡Empieza a Crear!</div>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem} onMouseEnter={handleGFM} onMouseLeave={handleGFM}>
                        <span>Gifts For Me</span>

                        <Grow in={gfm} className={classes.collapse} style={{ transformOrigin: '0 0 0' }}>
                            <div className={styles.navItemContent}>
                                <div className={styles.itemImage}>
                                    <div className={styles.image}>
                                        <Image
                                            src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_logo-07_3_c1b560e7-f0ea-4c54-bef4-1c85437b2f66.png?v=1626198008'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                                <div className={styles.itemDescription}>
                                    <h3>GIFTS FOR ME</h3>
                                    <p>Descripción de Gifts For Me Lorem Ipsum dolor sit amet</p>
                                    <div className="button">¡Ver productos!</div>
                                </div>
                            </div>
                        </Grow>
                    </div>
                    <div className={styles.navItem}>
                        <span>Sharebox Corporate</span>
                    </div>
                </div>
                }
                <div className={styles.icons}>
                    <div className={styles.icon}>                    
                        <FiShoppingBag style={{ fontSize: 27 }}/>
                    </div>
                </div>  
            </div>
        </>
    )
}