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
    fullheight: {
        height: '100%',
        marginTop: '0',
        marginBottom: '0',
        padding: '0px 50px',
    },
    icon: {
        fontSize: '8rem',
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
    
export default function ThirdStep ({step3Items, setStep3Items}) {

    const collectionMYB3 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3Mjc5NTMzNjg2Ng=='
    const classes = useStyles();

    const [checked, setChecked] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)

    const [productsMYB3, setProductsMYB3] = useState(null)

    const openPopup = (category, e) => {
        e.preventDefault();
        setChecked(true);
        setActiveCategory(category)
    };

    const closePopup = (e) => {
        e.preventDefault();
        setChecked(false);
        setActiveCategory(null);
    };

    useEffect(() => {
        client.collection.fetchWithProducts(collectionMYB3, {productsFirst: 4}).then((collection) => {
            // Do something with the collection

            // Se convierte el objeto a JSON
            var parsedCollection = JSON.parse(JSON.stringify(collection));

            // Se guarda el objeto
            // productsMYB1 = parsedCollection.products;
            setProductsMYB3(parsedCollection.products);
            console.log(productsMYB3)
        });
    }, [])

    function addItem(id, image, e) {
        e.preventDefault();

        var toAdd;
        var itemIndex = -1;

        if (step3Items.length > 0) {
            step3Items.map((item, index) => {
                if (item.productID === id) {
                    itemIndex = index
                }
            })
        }else{
            toAdd = {
                productID: id,
                quantity: 1,
                image: image,
            }
            setStep3Items([...step3Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                quantity: 1,
                image: image,
            }
            setStep3Items([...step3Items, toAdd]);
        }else{
            var newItems = [...step3Items];
            newItems[itemIndex].quantity = newItems[itemIndex].quantity + 1;
            setStep3Items(newItems);
        }
    }

    const removeItem = (id, e) => {
        e.preventDefault();
        const newItems = step3Items.filter(item => item.productID !== id)
        setStep3Items(newItems);
    }

    return(
        <div className = {styles.container}>
            <div className={styles.stepTitle}>
                <h2>Acompaña tu Box con un detalle especial</h2>
            </div>
            <div className={styles.cardContainer}>
                <Grid container spacing={3} className={classes.fullheight}>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper} onClick={(e) => {openPopup('globo', e)}}>
                            <div className={styles.categoryContainer}>
                                <RadioButtonUncheckedIcon className={classes.icon}/>
                                <h4>Globos</h4>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper} onClick={(e) => {openPopup('flores', e)}}>
                            <div className={styles.categoryContainer}>
                                <LocalFloristOutlinedIcon className={classes.icon}/>
                                <h4>Flores</h4>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.fullheight}>
                        <Paper className={classes.paper} onClick={(e) => {openPopup('pastel', e)}}>
                            <div className={styles.categoryContainer}>
                                <CakeOutlinedIcon className={classes.icon}/>
                                <h4>Pasteles y Velas</h4>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
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
                        productsMYB3 === null ? 
                        '' :
                        productsMYB3.filter(item => item.productType === activeCategory).map(product => (
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