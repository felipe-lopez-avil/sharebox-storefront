import { useState, useEffect } from 'react';

import styles from './styles.module.scss'
import { client } from '../../../utils/shopify'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { BorderRight } from '@material-ui/icons';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import ChildFriendlyOutlinedIcon from '@material-ui/icons/ChildFriendlyOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FreeBreakfastOutlinedIcon from '@material-ui/icons/FreeBreakfastOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        border: '2px solid #e9e9e9',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
    categoryPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
        height: '180px',
        width: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        border: '2px solid #e9e9e9',
        borderRadius: '10px',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '#fafafa',
        },
    },
    fullheight: {
        marginTop: '0',
        marginBottom: '0',
        backgroundColor: 'royalblue',
    },
    categories: {
        backgroundColor: 'red',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
    },
    icon: {
        fontSize: '5rem',
        color: '#003360'
    },
    grow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: '25px 30px',
    },
    logoBlue: {
        color: '#028ab5',
        cursor: 'pointer',
    }
}));

export default function SecondStep ({step2Items, setStep2Items}) {

    const collectionMYB2 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3Mjc5NTI3MTMzMA=='
    const classes = useStyles();

    const [checked, setChecked] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [catTitle, setCatTitle] = useState(null)

    const [productsMYB2, setProductsMYB2] = useState(null)

    const openPopup = (category, e) => {
        e.preventDefault();
        setChecked(true);
        setActiveCategory(category)
    };

    const closePopup = (e) => {
        e.preventDefault();
        setChecked(false);
        setActiveCategory(null);
        setCatTitle(null)
    };

    useEffect(() => {
        client.collection.fetchWithProducts(collectionMYB2, {productsFirst: 20}).then((collection) => {
            // Do something with the collection

            // Se convierte el objeto a JSON
            var parsedCollection = JSON.parse(JSON.stringify(collection));

            // Se guarda el objeto
            // productsMYB1 = parsedCollection.products;
            setProductsMYB2(parsedCollection.products);
            console.log(productsMYB2)
        });
        
    }, [])

    function addItem(id, e) {
        e.preventDefault();

        var toAdd;
        var itemIndex = -1;

        if (step2Items.length > 0) {
            step2Items.map((item, index) => {
                if (item.productID === id) {
                    itemIndex = index
                }
            })
        }else{
            toAdd = {
                productID: id,
                quantity: 1,
            }
            setStep2Items([...step2Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                quantity: 1,
            }
            setStep2Items([...step2Items, toAdd]);
        }else{
            var newItems = [...step2Items];
            newItems[itemIndex].quantity = newItems[itemIndex].quantity + 1;
            setStep2Items(newItems);
        }
    }

    const removeItem = (id, e) => {
        e.preventDefault();
        const newItems = step2Items.filter(item => item.productID !== id)
        setStep2Items(newItems);
    }

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Elige los Productos dentro de tu Box</h2>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.categories}>
                    <div className={styles.catRow}>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('globo', e)}}>
                                <LoyaltyOutlinedIcon className={classes.icon}/>
                                <h4>Moda & Joyería</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('flores', e)}}>
                                <ChildFriendlyOutlinedIcon className={classes.icon}/>
                                <h4>Moms & Babies</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('pastel', e)}}>
                                <HomeWorkOutlinedIcon className={classes.icon}/>
                                <h4>Office and Stationary</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('globo', e)}}>
                                <FaceOutlinedIcon className={classes.icon}/>
                                <h4>For Him</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('flores', e)}}>
                                <LocalBarOutlinedIcon className={classes.icon}/>
                                <h4>Brides</h4>
                            </Paper>
                        </div>
                    </div>
                    <div className={styles.catRow}>                        
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('globo', e)}}>
                                <HomeOutlinedIcon className={classes.icon}/>
                                <h4>Home & Arts</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('flores', e)}}>
                                <FavoriteBorderOutlinedIcon className={classes.icon}/>
                                <h4>Bienestar & Cuidado Personal</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('pastel', e)}}>
                                <FreeBreakfastOutlinedIcon className={classes.icon}/>
                                <h4>Bebidas & complementos</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('globo', e)}}>
                                <FastfoodOutlinedIcon className={classes.icon}/>
                                <h4>Snacks & Postres</h4>
                            </Paper>
                        </div>
                        <div className={styles.category}>
                            <Paper className={classes.categoryPaper} onClick={(e) => {openPopup('flores', e)}}>
                                <CakeOutlinedIcon className={classes.icon}/>
                                <h4>Pasteles & Festejos</h4>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
            <Grow in={checked} className={classes.grow}>
                <div className={styles.productsContainer}>
                    <div className={styles.categoryTitle}>
                        <ArrowBackIosIcon className={classes.logoBlue} onClick={(e) => {closePopup(e)}}/>
                        <div className={styles.title}>
                            Category Title
                        </div>
                    </div>
                    <Grid container spacing={3}>
                    {
                        productsMYB2 === null ? 
                        '' :
                        productsMYB2.filter(item => item.productType === activeCategory).map(product => (
                            <Grid item xs={6} sm={3}>
                                <Paper className={classes.paper}>
                                    <div className={styles.productCard}>
                                        <div className={styles.productInfo}>
                                            {product.title}
                                        </div>
                                        <div className={styles.actions}>
                                            <button onClick={(e) => addItem(product.variants[0].id, product.images[0].src, e)}>Add</button>
                                            <button onClick={(e) => removeItem(product.variants[0].id, e)}>Delete</button>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            // <div>{product.title}</div>
                        ))
                    }
                    </Grid>
                </div>
            </Grow>
        </div>
    )
    
}