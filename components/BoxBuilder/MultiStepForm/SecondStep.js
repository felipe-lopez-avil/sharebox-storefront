import { useState, useEffect } from 'react';

import styles from './styles.module.scss'
import { client } from '../../../utils/shopify'

import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Badge from '@material-ui/core/Badge';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


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
    grow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    logoBlue: {
        color: '#028ab5',
        cursor: 'pointer',
        marginRight: '-5px',
    }
}));

export default function SecondStep ({step2Items, setStep2Items}) {

    const collectionMYB2 = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3Mjc5NTI3MTMzMA=='
    const classes = useStyles();

    const [checked, setChecked] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [catTitle, setCatTitle] = useState('')

    const [productsMYB2, setProductsMYB2] = useState(null)

    // State to handle the custom attributes
    const [productAttributes, setProductAttributes] = useState([])

    const openPopup = (category, categoryTitle, e) => {
        e.preventDefault();
        setChecked(true);
        setCatTitle(categoryTitle)
        setActiveCategory(category)
    };

    const closePopup = (e) => {
        e.preventDefault();
        setChecked(false);
        setActiveCategory(null);
        setCatTitle('')
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

        client.product.fetchByHandle('teamo-tequila').then((product) => {
            // Do something with the product
            console.log(product);
        });
        
    }, [])

    function addItem(id, image, e) {
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
                image: image,
                customAttributes: []
            }
            setStep2Items([...step2Items, toAdd]);
        }
        
        if (itemIndex === -1) {
            toAdd = {
                productID: id,
                quantity: 1,
                image: image,
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
            <div className={styles.cardsContainer}>
                <div className={styles.cardGrid}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('globo', 'Bebidas & Complementos', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/drinksIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Bebidas & Complementos</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('brides', 'Brides', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/bridesIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Brides</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('cuidado-personal', 'Cuidado Personal', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/selfCareIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Cuidado personal</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('for-him', 'For Him', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/maleIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>For Him</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('home-and-pets', 'Home & Pets', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/petIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Home & Pets</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('joyeria', 'Joyería', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/jewelIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Joyería</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('moms-and-babies', 'Moms & Babies', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/momIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Moms & Babies</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('office', 'Office & Stationary', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/stationaryIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Office & Stationary</h4>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3}>
                            <div className={styles.categoryCard}>
                                <div className={styles.categoryBox} onClick={(e) => {openPopup('snacks-y-postres', 'Snacks & Postres', e)}}>
                                    <div className={styles.categoryIcon}>
                                        <Image src="/snacksIcon.svg" layout="fill" objectFit="cover"/>
                                    </div>
                                    <h4>Snacks & Postres</h4>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            {
                // Modal para mostrar los productos de la categoría seleccionada
            }
            <Grow in={checked} className={classes.grow}>
                <div className={styles.productsContainer}>
                    <div className={styles.categoryTitle}>
                        <div className={styles.goBack} onClick={(e) => {closePopup(e)}}>
                            <ArrowBackIosIcon className={classes.logoBlue}/>
                            <div>Volver</div>
                        </div>
                        <div className={styles.title}>
                            {catTitle}
                        </div>
                    </div>
                    <Grid container spacing={3}>
                    {
                        productsMYB2 === null ? 
                        '' :
                        productsMYB2.filter(item => item.productType === activeCategory).map(product => (
                            <Grid item xs={6} sm={3}>
                                <div className={styles.productContainer}>
                                    <input className={styles.boxInput}
                                        type="checkbox"
                                        id={product.id}
                                        value={product.variants[0].id}
                                        checked={(step2Items.map(function(e) { return e.productID; }).indexOf(product.variants[0].id)) > -1}
                                    />
                                    <label className={styles.forBoxInput} for={product.id}>
                                        <div className={styles.productImage}>
                                            <Image
                                                src={product.images[0].src}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className={styles.actionButtons}>
                                            <div className={styles.notSelected}>
                                                <div className={styles.addButton} onClick={(e) => addItem(product.variants[0].id, product.images[0].src, e)}>
                                                    AGREGAR
                                                </div>
                                            </div>
                                            <div className={styles.selected}>
                                                <div className={styles.trashButton} onClick={(e) => removeItem(product.variants[0].id, e)}>
                                                    <DeleteOutlineOutlinedIcon/>
                                                </div>
                                                <div className={styles.plusButton} onClick={(e) => addItem(product.variants[0].id, product.images[0].src, e)}>
                                                    <AddOutlinedIcon/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.description}>
                                            <div className={styles.productTitle}>{product.title}</div>
                                            <div>{product.variants[0].price === "0.00" ? '¡Sin costo adicional!' : `$${product.variants[0].price}`}</div>
                                        </div>
                                    </label>
                                </div>
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
            </Grow>
        </div>
    )
    
}