import React, { useEffect, useState } from 'react'
import { client } from '../utils/shopify'
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
    font: {
        fontSize: '0.5rem'
    }
}));

function valuetext(value) {
    return `${value}°C`;
}

export default function GiftsToGo () {
    const classes = useStyles();

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NTY0MjE4NzkzOA==';
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
            console.log(collection.products);
            setCollection(JSON.parse(JSON.stringify(collection)))
            setProducts(collection.products)
        });
        //console.log(collection.products)
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
 
    const openMobileFilters = () => {
        setMobileFiltersActive(true)
    }

    const closeMobileFilters = () => {
        setMobileFiltersActive(false)
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
        } else if (ocassionFilter === 'all' || event.target.value === 'Globos y Flores' || event.target.value === 'Snacks y Postres'){
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

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>GIFTS TO GO</h1>
            </div>
            {windowReady === true &&             
                <div className={styles.content}>
                    
                    {collection !== null && products !== null ? 
                    <>
                        <div className={`${styles.filters} ${styles.hidden}`}>
                            <h4>Filtrar por:</h4>
                            <div className={styles.filter}>
                                <h5>Tipo de producto</h5>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="productType" name="productType" value={typeFilter} onChange={handleTypeFilter}>
                                        <FormControlLabel value="all" control={<Radio />} label="Todos"/>
                                        <FormControlLabel value="Boxes" control={<Radio />} label="Boxes" />
                                        {/* <FormControlLabel value="kits armados" control={<Radio />} label="Kits Armados" /> */}
                                        <FormControlLabel value="Globos y Flores" control={<Radio />} label="Globos y Flores" />
                                        <FormControlLabel value="Snacks y Postres" control={<Radio />} label="Snacks y Postres" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {typeFilter !== 'Globos y Flores' & typeFilter !== 'Snacks y Postres' ?
                                <div className={styles.filter}>
                                    <h5>Ocasiones</h5>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender1" value={ocassionFilter} onChange={handleOcassionFilter}>
                                            <FormControlLabel value="all" control={<Radio />} label="Todas" />
                                            <FormControlLabel value="Anillos y compromisos" control={<Radio />} label="Anillos y compromisos" />
                                            <FormControlLabel value="Aniversario" control={<Radio />} label="Aniversario" />
                                            <FormControlLabel value="Condolencias" control={<Radio />} label="Condolencias" />
                                            <FormControlLabel value="Cumpleaños" control={<Radio />} label="Cumpleaños" />
                                            <FormControlLabel value="For a long day" control={<Radio />} label="For a Long Day" />
                                            <FormControlLabel value="Graduaciones y logros" control={<Radio />} label="Graduaciones y logros" />
                                            <FormControlLabel value="New born & padrinos" control={<Radio />} label="New Born & Padrinos" />
                                            <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                :
                                ''
                            }
                        </div>

                        <div className={styles.mobileFilters}>
                            <div className={styles.trigger} onClick={openMobileFilters}>
                                <FilterListIcon fontSize="medium"/>
                                <span>Filtrar productos</span>
                            </div>
                            {typeFilter !== 'all' || ocassionFilter !== "all" ?
                                <div className={styles.activeFilters}>
                                    <Stack direction="row" spacing={1}>
                                        {typeFilter !== 'all' && <Chip label={typeFilter} variant="outlined"/>}
                                        {ocassionFilter !== 'all' && <Chip label={ocassionFilter} variant="outlined"/>}
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
                                            <h5>Tipo de producto</h5>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="productType" name="productType" value={typeFilter} onChange={handleTypeFilter}>
                                                    <FormControlLabel value="all" control={<Radio />} label="Todos los productos"/>
                                                    <FormControlLabel value="Boxes" control={<Radio />} label="Boxes" />
                                                    {/* <FormControlLabel value="kits armados" control={<Radio />} label="Kits Armados" /> */}
                                                    <FormControlLabel value="Globos y Flores" control={<Radio />} label="Globos y Flores" />
                                                    <FormControlLabel value="Snacks y Postres" control={<Radio />} label="Snacks y Postres" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.filter}>
                                            <h5>Ocasiones</h5>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="gender" name="gender1" value={ocassionFilter} onChange={handleOcassionFilter}>
                                                    <FormControlLabel value="all" control={<Radio />} label="Cualquier Ocasión" />
                                                    <FormControlLabel value="Anillos y compromisos" control={<Radio />} label="Anillos y compromisos" />
                                                    <FormControlLabel value="Aniversario" control={<Radio />} label="Aniversario" />
                                                    <FormControlLabel value="Condolencias" control={<Radio />} label="Condolencias" />
                                                    <FormControlLabel value="Cumpleaños" control={<Radio />} label="Cumpleaños" />
                                                    <FormControlLabel value="For a long day" control={<Radio />} label="For a Long Day" />
                                                    <FormControlLabel value="Graduaciones y logros" control={<Radio />} label="Graduaciones y logros" />
                                                    <FormControlLabel value="New born & padrinos" control={<Radio />} label="New Born & Padrinos" />
                                                    <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
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
                                        <Link href={`/gifts-to-go/${product.handle}`}>
                                            <div className={styles.productContainer}>
                                                <div className={styles.productImage}>
                                                    <Image
                                                        src={product.images[0] !== undefined ? product.images[0].src : 'https://cdn.shopify.com/s/files/1/0456/6820/4706/files/product-placeholder.png?v=1633451657'}
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
/* 
export async function getServerSideProps() {
    // Fetch data from external API

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIxMjM4MTEzOTEwNg==';

    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 50})
    
    
    console.log({ collection })
    // Pass data to the page via props
    return { props: { collection: JSON.parse(JSON.stringify(collection))} }
} */