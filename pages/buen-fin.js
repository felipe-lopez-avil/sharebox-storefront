import React, { useEffect, useState } from 'react'
import { client } from '../utils/shopify'

import styles from '../styles/gifts-to-go.module.scss'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'

import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


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

export default function BuenFin () {
    const classes = useStyles();

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzM3MzUwMzA2NjMyOQ==';
    const [collection, setCollection] = useState(null)
    const [products, setProducts] = useState(null)
    const [mobileFiltersActive, setMobileFiltersActive] = useState(false)
    const [mobileSearchBarActive, setmobileSearchBarActive] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
    
    // Checks if the window is ready so the functional components can render.
    const [windowReady, setWindowReady] = useState(false)
    useEffect(() => {
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }

        client.collection.fetchWithProducts(collectionId, {productsFirst: 250}).then((collection) => {
            setCollection(JSON.parse(JSON.stringify(collection)))
            setProducts(collection.products)
        });
    }, [])

    // State of the Active Filter
    const [typeFilter, setTypeFilter] = useState("all")
    const [ocassionFilter, setOcassionFilter] = useState('all')
    const [activeFilter, setActiveFilter] = useState("all")
 
    const openMobileFilters = () => {
        setMobileFiltersActive(true)
        setmobileSearchBarActive(false)
        setSearchQuery('')
    }

    const closeMobileFilters = () => {
        setMobileFiltersActive(false)
    }

    const handleQueryChange = (event) => {
        setTypeFilter('all')
        setOcassionFilter('all')
        setSearchQuery(event.target.value)

        if (event.target.value === ''){
            setProducts(collection.products)
        }else{
            const query = event.target.value.toLowerCase();
            setProducts(
                collection.products.filter(
                    (product) => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
                )
            )
        }
    }

    const FilterByQuery = (e) => {
        e.preventDefault();

        if(searchQuery === ''){
            setProducts(collection.products)
        }else{
            const query = searchQuery.toLowerCase();
            setProducts(
                collection.products.filter(
                    (product) => product.title.toLowerCase().includes(query)
                )
            )
            
        }
    }

    const handleTypeFilter = (event) => {

        setTypeFilter(event.target.value);
        setOcassionFilter('all')
        setActiveFilter('all')

        if(event.target.value === "all"){
            setProducts(collection.products)
        } else if (event.target.value === "Boxes"){
            setProducts(
                collection.products.filter(
                    (product) => product.productType === event.target.value
                )
            )
        } else {
            setProducts(
                collection.products.filter(
                    (product) => product.productType !== 'Boxes'
                )
            )
        }

        setSearchQuery('')
    };

    const handleActiveFilter = (event) => {

        setActiveFilter(event.target.value);
        setTypeFilter('all')
        setOcassionFilter('all')

        if(event.target.value === "all"){
            setProducts(collection.products)
        } else {
            setProducts(
                collection.products.filter(
                    (product) => product.productType === event.target.value
                )
            )
        }

        setSearchQuery('')
    };

    return (
        <div className={styles.container}>

            <Head>
                <title>¡Ofertas de Buen Fin!</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className={styles.title}>
                <h1>BUEN FIN</h1>
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
                                        <FormControlLabel value="Market" control={<Radio />} label="Market" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            
                            <div className={styles.filter}>
                                <h5>Categorías*</h5>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={activeFilter} onChange={handleActiveFilter}>
                                        <FormControlLabel value="all" control={<Radio />} label="Todo" />
                                        <FormControlLabel value="Accesorios y complementos" control={<Radio />} label="Accesorios y complementos" />
                                        <FormControlLabel value="Arte & hogar" control={<Radio />} label="Arte & hogar" />
                                        <FormControlLabel value="Bebidas y Complementos" control={<Radio />} label="Bebidas y complementos" />
                                        <FormControlLabel value="Cuidado personal" control={<Radio />} label="Bienestar y Cuidado Personal" />
                                        <FormControlLabel value="Diversión" control={<Radio />} label="Diversión" />
                                        <FormControlLabel value="Joyería" control={<Radio />} label="Joyería" />
                                        <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className={styles.mobileFilters}>
                            <div className={styles.filterAndSearch}>
                                <div className={styles.trigger} onClick={openMobileFilters}>
                                    <FilterListIcon style={{fontSize: '25px'}}/>
                                    <span>Filtrar productos</span>
                                </div>
                            </div>
                            {(typeFilter !== 'all' || ocassionFilter !== "all") & mobileSearchBarActive === false ?
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
                                                    <FormControlLabel value="Market" control={<Radio />} label="Market" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.filter}>
                                            <h5>Categorías*</h5>
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="gender" name="gender1" value={activeFilter} onChange={handleActiveFilter}>
                                                    <FormControlLabel value="all" control={<Radio />} label="Todo" />
                                                    <FormControlLabel value="Accesorios y complementos" control={<Radio />} label="Accesorios y complementos" />
                                                    <FormControlLabel value="Arte & hogar" control={<Radio />} label="Arte & hogar" />
                                                    <FormControlLabel value="Bebidas y Complementos" control={<Radio />} label="Bebidas y complementos" />
                                                    <FormControlLabel value="Cuidado personal" control={<Radio />} label="Bienestar y Cuidado Personal" />
                                                    <FormControlLabel value="Diversión" control={<Radio />} label="Diversión" />
                                                    <FormControlLabel value="Joyería" control={<Radio />} label="Joyería" />
                                                    <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className={styles.confirm} onClick={closeMobileFilters}>Confirmar filtros</div>

                                    <div className={styles.closeIcon} onClick={closeMobileFilters}>
                                        <CloseIcon style={{ fontSize: '30px' }}/>
                                    </div>
                                </div>
                            </div>
                        </Grow>

                        <div className={styles.products}>
                            <Grid container spacing={0}>

                                {products.map(product => (

                                    <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                                        <Link href={`/buen-fin/${product.handle}`}>
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
                                                    <div className={`${product.variants[0].compareAtPrice !== null ? styles.offerPrice : styles.price}`}>
                                                        ${product.variants[0].price} {product.variants[0].compareAtPrice !== null ? 
                                                            <span className={styles.compareAtPrice}>
                                                                ${product.variants[0].compareAtPrice}
                                                            </span> 
                                                            : 
                                                            ''
                                                        }
                                                    </div>
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