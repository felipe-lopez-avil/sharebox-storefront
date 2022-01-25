import React, { useEffect, useState } from 'react'
import { client } from '../utils/shopify'

import styles from '../styles/gifts-to-go.module.scss'
import { useRouter } from 'next/router'
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

export default function GiftsToGo () {
    const classes = useStyles();
    const router = useRouter();

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3NTY0MjE4NzkzOA==';
    const [collection, setCollection] = useState(null)
    const [products, setProducts] = useState(null)
    const [mobileFiltersActive, setMobileFiltersActive] = useState(false)
    const [mobileSearchBarActive, setmobileSearchBarActive] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')

    // State of the Active Filter
    const [typeFilter, setTypeFilter] = useState("all")
    const [ocassionFilter, setOcassionFilter] = useState('all')

    const handlleInitialFilter = (queryToFilter) => {
        setProducts(
            collection.products.filter(
                (product) => product.productType === queryToFilter
            )
        )
    }

    // Checks if the window is ready so the functional components can render.
    const [windowReady, setWindowReady] = useState(false)
    useEffect(() => {

        // console.log(router.query.query)
        if(typeof window !== 'undefined'){
            setWindowReady(true);
        }

        client.collection.fetchWithProducts(collectionId, {productsFirst: 250}).then((collection) => {
            setCollection(JSON.parse(JSON.stringify(collection)))
            setProducts(collection.products)
            // router.query.query !== undefined && setTypeFilter(router.query.query)
        });

        /* if(collection !== null){
            handlleInitialFilter(router.query.query)
            console.log("Works")
        } */

    }, [])
 
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

    const OpenMobileSearchBar = () => {
        setTypeFilter('all')
        setOcassionFilter('all')
        setmobileSearchBarActive(true)
    }
 
    const closeMobileSearchbar = () => {
        setSearchQuery('')
        setmobileSearchBarActive(false)
    }


    const handleTypeFilter = (event) => {

        setTypeFilter(event.target.value);

        if(event.target.value === "all" && ocassionFilter === 'all'){
            setProducts(collection.products)
        } else if (event.target.value === 'all'){
            setProducts(
                collection.products.filter(
                    (product) => product.vendor === ocassionFilter
                )
            )
        } else if (ocassionFilter === 'all' || event.target.value === 'Globos y Flores' || event.target.value === 'Snacks y Postres' || event.target.value === 'Menos de 350'){
            setOcassionFilter('all')
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

        setSearchQuery('')
    };

    const handleOcassionFilter = (event) => {

        setOcassionFilter(event.target.value);


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

        setSearchQuery('')
    };

    return (
        <div className={styles.container}>

            <Head>
                <title>Gifts To Go!</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

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
                                <form onSubmit={FilterByQuery}>
                                    <div className={styles.searchBar}>
                                        <input 
                                            value={searchQuery} 
                                            onChange={handleQueryChange}
                                            type="text" 
                                            id="search-product" 
                                            name="search-product" 
                                            placeholder="Buscar producto"
                                        />
                                        <div className={styles.searchBtn} onClick={FilterByQuery}>
                                            <SearchIcon/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={styles.filter}>
                                <h5>Tipo de producto</h5>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="productType" name="productType" value={typeFilter} onChange={handleTypeFilter}>
                                        <FormControlLabel value="all" control={<Radio />} label="Todos"/>
                                        <FormControlLabel value="Detalles de San Valentín" control={<Radio />} label="Detalles San Valentín" />
                                        <FormControlLabel value="Boxes" control={<Radio />} label="Boxes" />
                                        {/* <FormControlLabel value="kits armados" control={<Radio />} label="Kits Armados" /> */}
                                        <FormControlLabel value="Globos y Flores" control={<Radio />} label="Globos y Flores" />
                                        <FormControlLabel value="Snacks y Postres" control={<Radio />} label="Snacks y Postres" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {typeFilter !== 'Globos y Flores' & typeFilter !== 'Snacks y Postres' & typeFilter !== 'Detalles de San Valentín'?
                                <div className={styles.filter}>
                                    <h5>Ocasiones</h5>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender1" value={ocassionFilter} onChange={handleOcassionFilter}>
                                            <FormControlLabel value="all" control={<Radio />} label="Todas" />
                                            <>
                                                <FormControlLabel value="Valentine's" control={<Radio />} label="Valentine's" />
                                                <FormControlLabel value="Anillos y compromisos" control={<Radio />} label="Anillos y compromisos" />
                                                <FormControlLabel value="Aniversario" control={<Radio />} label="Aniversario" />
                                                <FormControlLabel value="Condolencias" control={<Radio />} label="Condolencias" />
                                                <FormControlLabel value="Cumpleaños" control={<Radio />} label="Cumpleaños" />
                                                <FormControlLabel value="For a long day" control={<Radio />} label="For a Long Day" />
                                                <FormControlLabel value="Graduaciones y logros" control={<Radio />} label="Graduaciones y logros" />
                                                <FormControlLabel value="New born & padrinos" control={<Radio />} label="New Born & Padrinos" />
                                                <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                            </>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                :
                                ''
                            }
                        </div>

                        <div className={styles.mobileFilters}>
                            <div className={styles.filterAndSearch}>
                                <div className={styles.trigger} onClick={openMobileFilters}>
                                    <FilterListIcon style={{fontSize: '25px'}}/>
                                    <span>Filtrar productos</span>
                                </div>
                                <div className={styles.searchButton} onClick={OpenMobileSearchBar}>
                                    <SearchIcon style={{fontSize: '25px'}}/>
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

                            <Collapse in={mobileSearchBarActive}>
                                <div className={`${styles.filter} ${styles.mobileFilter}`}>
                                    <form onSubmit={FilterByQuery}>
                                        <div className={styles.searchBar}>
                                            <input 
                                                value={searchQuery} 
                                                onChange={handleQueryChange}
                                                type="text" 
                                                id="search-product" 
                                                name="search-product" 
                                                placeholder="Buscar producto"
                                            />
                                            <div className={styles.searchBtn} onClick={closeMobileSearchbar}>
                                                <CloseIcon/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Collapse>
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
                                                    <FormControlLabel value="Detalles de San Valentín" control={<Radio />} label="Detalles San Valentín" />
                                                    <FormControlLabel value="Boxes" control={<Radio />} label="Boxes" />
                                                    {/* <FormControlLabel value="kits armados" control={<Radio />} label="Kits Armados" /> */}
                                                    <FormControlLabel value="Globos y Flores" control={<Radio />} label="Globos y Flores" />
                                                    <FormControlLabel value="Snacks y Postres" control={<Radio />} label="Snacks y Postres" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        {typeFilter !== 'Globos y Flores' & typeFilter !== 'Snacks y Postres' & typeFilter !== 'Detalles de San Valentín' ?
                                            <div className={styles.filter}>
                                                <h5>Ocasiones</h5>
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-label="gender" name="gender1" value={ocassionFilter} onChange={handleOcassionFilter}>
                                                        <FormControlLabel value="all" control={<Radio />} label="Todas" />
                                                        <>
                                                            <FormControlLabel value="Valentine's" control={<Radio />} label="Valentine's" />
                                                            <FormControlLabel value="Anillos y compromisos" control={<Radio />} label="Anillos y compromisos" />
                                                            <FormControlLabel value="Aniversario" control={<Radio />} label="Aniversario" />
                                                            <FormControlLabel value="Condolencias" control={<Radio />} label="Condolencias" />
                                                            <FormControlLabel value="Cumpleaños" control={<Radio />} label="Cumpleaños" />
                                                            <FormControlLabel value="For a long day" control={<Radio />} label="For a Long Day" />
                                                            <FormControlLabel value="Graduaciones y logros" control={<Radio />} label="Graduaciones y logros" />
                                                            <FormControlLabel value="New born & padrinos" control={<Radio />} label="New Born & Padrinos" />
                                                            <FormControlLabel value="Pets" control={<Radio />} label="Pets" />
                                                        </>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            :
                                            ''
                                        }
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
                                        <Link href={`/gifts-to-go/${product.handle}`}>
                                            <a>
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
                                            </a>
                                        </Link>
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <div className={styles.didntFind}>
                                        <div className={styles.copy}>¿No encontraste lo que buscabas?</div>
                                        <a href="https://api.whatsapp.com/send?phone=528134053769&text=%C2%A1Hola!%20Me%20comunico%20de%20la%20p%C3%A1gina%20de%20Sharebox%20Corporate%20y%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20imformaci%C3%B3n." target="blank">
                                            <button>
                                                <div className={styles.wppButton}>
                                                    <Image
                                                        src='https://cdn.shopify.com/s/files/1/0456/6820/4706/files/whatsAppLogo.png?v=1636568821'
                                                        layout='fill'
                                                        objectFit='cover'
                                                    />
                                                </div>
                                                <div>Contáctanos</div> 
                                            </button>
                                        </a>
                                    </div>
                                </Grid>
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