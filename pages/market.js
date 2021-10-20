import React, { useEffect, useState } from 'react'
import { client } from '../utils/shopify'
import Head from 'next/head'
import styles from '../styles/gifts-to-go.module.scss'
import Image from 'next/image';
import Link from 'next/link'

import Grow from '@mui/material/Grow';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

export default function GiftsForMe () {
    const classes = useStyles();

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NTY0MTYzMDg4Mg==';
    const [collection, setCollection] = useState(null)
    const [products, setProducts] = useState(null)
    const [mobileFiltersActive, setMobileFiltersActive] = useState(false)

    // Checks if the window is ready so the functional components can render.
    const [windowReady, setWindowReady] = useState(false)
    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }

        client.collection.fetchWithProducts(collectionId, {productsFirst: 250}).then((collection) => {
            // Do something with the collection
            // console.log(collection.products);
            setCollection(JSON.parse(JSON.stringify(collection)))
            setProducts(collection.products)
        });
        // console.log(collection.products)
    }, [])

    // State of the Active Filter
    const [activeFilter, setActiveFilter] = useState("all")

    const openMobileFilters = () => {
        setMobileFiltersActive(true)
    }

    const closeMobileFilters = () => {
        setMobileFiltersActive(false)
    }

    // Filter functions
    const [value, setValue] = React.useState([20, 37]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleActiveFilter = (event) => {
        setActiveFilter(event.target.value);
        // console.log(event.target.value);

        if(event.target.value === "all"){
            setProducts(collection.products)
        } else {
            setProducts(
                collection.products.filter(
                    (product) => product.productType === event.target.value
                )
            )
        }
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.title}>
                <h1>MARKET</h1>
            </div>
            {/* 
            
            // Banner for publicity
            <div className={styles.publicity}></div> 

            */}
            {windowReady === true &&             
                <div className={styles.content}>
                    
                    {collection !== null && products !== null ? 
                    <>
                    <div className={`${styles.filters} ${styles.hidden}`}>
                        <h4>Filtrar por:</h4>
                        <div className={styles.filter}>
                            <h5>Categorías*</h5>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={activeFilter} onChange={handleActiveFilter}>
                                    <FormControlLabel value="all" control={<Radio />} label="Todo" />
                                    <FormControlLabel value="Cuidado personal" control={<Radio />} label="Cuidado Personal" />
                                    <FormControlLabel value="Bebés y niños" control={<Radio />} label="Bebés y niños" />
                                    <FormControlLabel value="Joyería" control={<Radio />} label="Joyería" />
                                    {/* <FormControlLabel value="Arte & hogar" control={<Radio />} label="Arte y Hogar" /> */}
                                    {/* <FormControlLabel value="Papelería" control={<Radio />} label="Papelería" /> */}
                                    <FormControlLabel value="Diversión" control={<Radio />} label="Diversión" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div className={styles.mobileFilters}>
                        <div className={styles.trigger} onClick={openMobileFilters}>
                            <FilterListIcon fontSize="medium"/>
                            <span>Filtrar productos</span>
                        </div>
                        {activeFilter !== 'all' ?
                            <div className={styles.activeFilters}>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={activeFilter} variant="outlined"/>
                                </Stack>
                            </div>
                            :
                            ''
                        }
                    </div> 

                    <Grow in={mobileFiltersActive}>
                        <div className={styles.filtersModal}>
                            <div className={styles.filtersContainer}>
                                <div className={`${styles.filters}`}>
                                    <h4>Filtrar por:</h4>
                                    <div className={styles.filter}>
                                        <h5>Categorías*</h5>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="gender" name="gender1" value={activeFilter} onChange={handleActiveFilter}>
                                                <FormControlLabel value="all" control={<Radio />} label="Todo" />
                                                <FormControlLabel value="Cuidado personal" control={<Radio />} label="Cuidado Personal" />
                                                <FormControlLabel value="Bebés y niños" control={<Radio />} label="Bebés y niños" />
                                                <FormControlLabel value="Joyería" control={<Radio />} label="Joyería" />
                                                {/* <FormControlLabel value="Arte & hogar" control={<Radio />} label="Arte y Hogar" /> */}
                                                {/* <FormControlLabel value="Papelería" control={<Radio />} label="Papelería" /> */}
                                                <FormControlLabel value="Diversión" control={<Radio />} label="Diversión" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className={styles.confirm} onClick={closeMobileFilters}>Confirmar filtros</div>
                            </div>
                        </div>
                    </Grow>

                    <div className={styles.products}>
                        <Grid container spacing={0}>

                            {products.map(product => (

                                <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                    <Link href={`/gifts-for-me/${product.handle}`}>
                                        <div className={styles.productContainer}>
                                            <div className={styles.productImage}>
                                                {product.images.length > 0 ? 
                                                    <Image
                                                        src={product.images[0].src !== undefined ? product.images[0].src : ''}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                    :
                                                    ''
                                                }
                                            </div>
                                            <div className={styles.productDescription}>
                                                <div className={styles.productTitle}>{product.title}</div>
                                                <div className={styles.price}>${product.variants[0].price}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    </>
                    :
                    <div className={styles.loaderContainer}>
                        <CircularProgress color="inherit" />
                    </div>
                    }
                </div>
            }     
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NTY0MTYzMDg4Mg==';

    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 8})
    
    
    // console.log({ collection })
    // Pass data to the page via props
    return { props: { collection: JSON.parse(JSON.stringify(collection))} }
}