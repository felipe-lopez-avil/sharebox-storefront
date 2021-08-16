import React, { useState } from 'react';
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
        top: '71px',
        left: '-20px',
        backgroundColor: '#fff',
        padding: '20px',
        zIndex: '1',
        border: '2px solid #ececec',
        borderTop: '0px',
        borderRadius: '0px 0px 10px 10px',
    },
  }));

export default function Navbar () {
    const classes = useStyles();
    
    const [gtg, setGtg] = useState(false);
    const handleGTG = () => {
        setGtg(!gtg);
    };

    return (
        <>
            <div className={styles.desktopNavbar}>
                <div className={styles.logo}>
                    <img src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/Sharebox_editable-17.png?v=1614310399'/>
                </div>
                <div className={styles.navigation}>
                    <div className={styles.navItem} onClick={handleGTG}>
                        Gifts To Go! <ExpandMoreIcon/>

                        <Collapse in={gtg} className={classes.collapse}>
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
                        </Collapse>
                    </div>
                    <div className={styles.navItem}>Make Your Box</div>
                    <div className={styles.navItem}>Gifts For Me</div>
                    <div className={styles.navItem}>Sharebox Corporate</div>
                </div>
                <div className={styles.icons}>
                    <div className={styles.icon}>                    
                        <FiShoppingBag style={{ fontSize: 27 }}/>
                    </div>
                </div>  
            </div>
        </>
    )
}