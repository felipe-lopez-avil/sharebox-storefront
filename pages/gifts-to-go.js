import React, { useEffect, useState } from 'react'
import { client } from '../utils/shopify'
import styles from '../styles/gifts-to-go.module.scss'
import Image from 'next/image';
import Link from 'next/link'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
        padding: '0 5px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

export default function GiftsToGo ({collection}) {
    const classes = useStyles();

    // Checks if the window is ready so the functional components can render.
    const [windowReady, setWindowReady] = useState(false)
    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }

        console.log(collection.products)
    }, [])

    // State of the Active Filter
    const [typeFilter, setTypeFilter] = useState("all")
    const [ocassionFilter, setOcassionFilter] = useState('all')

    function filterProducts(product) {
        if (product.productType === typeFilter && product.vendor === ocassionFilter){
            return true;
        }else{
            return false;
        }
    }

    const handleTypeFilter = (event) => {

        setTypeFilter(event.target.value);

        // console.log(event.target.value);

        if(event.target.value === "all" && ocassionFilter === 'all'){
            setProducts(collection.products)
        } else if (event.target.value === 'all'){
            setProducts(
                collection.products.filter(
                    (product) => product.vendor === ocassionFilter
                )
            )
        } else if (ocassionFilter === 'all') {
            setProducts(
                collection.products.filter(
                    (product) => product.productType === event.target.value
                )
            )
        } else{
            setProducts(
                // collection.products.filter(filterProducts)
                collection.products.filter(
                    (product) => product.productType === event.target.value && product.vendor === ocassionFilter
                )
            )
        }
    };

    const handleOcassionFilter = (event) => {

        setOcassionFilter(event.target.value);

        // console.log(event.target.value);

        if(event.target.value === "all" && typeFilter === 'all'){
            setProducts(collection.products)
        } else if (event.target.value === 'all') {
            setProducts(
                collection.products.filter(
                    (product) => product.productType === typeFilter
                )
            )
        } else if (typeFilter === 'all') {
            setProducts(
                collection.products.filter(
                    (product) => product.vendor === event.target.value
                )
            )
        } else{
            setProducts(
                // collection.products.filter()
                collection.products.filter(
                    (product) => product.vendor === event.target.value && product.productType === typeFilter
                )
            )
        }
    };


    const [products, setProducts] = useState(collection.products)

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>GIFTS TO GO</h1>
            </div>
            {windowReady === true &&             
                <div className={styles.content}>
                    <div className={styles.filters}>
                        <h4>Filtrar por:</h4>
                        <div className={styles.filter}>
                            <h5>Tipo de producto</h5>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="productType" name="productType" value={typeFilter} onChange={handleTypeFilter}>
                                    <FormControlLabel value="all" control={<Radio />} label="Cualquiera" />
                                    <FormControlLabel value="boxes" control={<Radio />} label="Boxes" />
                                    <FormControlLabel value="kits armados" control={<Radio />} label="Kits Armados" />
                                    <FormControlLabel value="globos y flores" control={<Radio />} label="Globos y Flores" />
                                    <FormControlLabel value="snacks y postres" control={<Radio />} label="Snacks y Postres" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={styles.filter}>
                            <h5>Ocasiones</h5>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={ocassionFilter} onChange={handleOcassionFilter}>
                                    <FormControlLabel value="all" control={<Radio />} label="Todas" />
                                    <FormControlLabel value="aniversario" control={<Radio />} label="Aniversario" />
                                    <FormControlLabel value="cumpleaños" control={<Radio />} label="Cumpleaños" />
                                    <FormControlLabel value="just because" control={<Radio />} label="Just Because" />
                                    {/* <FormControlLabel value="anillos y compromisos" control={<Radio />} label="Anillos y Compromisos" />
                                    <FormControlLabel value="for a long day" control={<Radio />} label="For a Long Day" /> */}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles.products}>
                        <Grid container spacing={0}>

                            {products.map(product => (

                                <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                    <Link href={`/gifts-to-go/${product.handle}`}>
                                        <div className={styles.productContainer}>
                                            <div className={styles.productImage}>
                                                <Image
                                                    src={product.images[0].src}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className={styles.productDescription}>
                                                <div className={styles.productTitle}>{product.title}</div>
                                                <div className={styles.price}>${product.variants[0].price}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </Grid>
                        
                                /* <Link href={`/${link}/${product.handle}`}>
                                    <div className={styles.productContainer}>
                                        <div className={styles.productImg}>
                                            <Image
                                                src={product.images[0].src}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                            
                                            <div className={styles.overlay}>
                                                <a href="#" className={styles.buyNow}>Comprar Ahora</a>
                                            </div>
                                        </div>
                                        <div className={styles.productInfo}>
                                            <div className={styles.type}>
                                                <a href="#"><h4>{product.title}</h4></a>
                                                <span>${product.variants[0].price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link> */
                            ))}
                        </Grid>
                    </div>
                </div>
            }     
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjM4MTEzOTEwNg==';

    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 50})
    
    
    console.log({ collection })
    // Pass data to the page via props
    return { props: { collection: JSON.parse(JSON.stringify(collection))} }
}