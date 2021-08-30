import React, {useState, useEffect} from 'react'
import styles from '../../styles/product.module.scss'
import {client} from '../../utils/shopify'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

export default function GTGProduct ({product, collection}) {
    const classes = useStyles();

    const [multiVariants, setMultiVariants] = useState(false)
    const [formData, setFormData] = useState({})
    const [windowReady, setWindowReady] = useState(false)

    useEffect(() => {
        console.log(product)
        if(typeof window !== 'undefined'){
            setWindowReady(true)
        }

        if(product.variants.length > 1){
            setMultiVariants(true);

            let firstFormData = {};
            product.options.map(option => {
                const updatedFirstFormData = {
                    ...firstFormData,
                    [option.name]: option.values[0].value
                }
                firstFormData = updatedFirstFormData;
            })
            setFormData(firstFormData);
        }
    }, [])

    // Accordion Controller
    const [dropActive, setDropActive] = useState(false)
    const handleDropActive = () => {
        setDropActive(!dropActive);
    };

    // State for the Active Variant Index
    const [variantIndex, setVariantIndex] = useState(0);

    // handle the change of the product variations options
    const handleChange = (event) => {
        
        const updatedFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }

        setFormData(updatedFormData);
        const valuesArray = Object.values(updatedFormData);
        
        product.variants.map((variant, index) => {

            let match = true;
            variant.selectedOptions.map((selectedOption, index) => {
                if(selectedOption.value !== valuesArray[index]){
                    match = false;
                }
            })

            if(match === true){
                setVariantIndex(index);
                console.log("La variante activa es:")
                console.log(index)
            }

        })
    }

    const handleFormData = (event) => {
       
    }

    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <div className={styles.productImages}>
                    <Image
                        src={product.images[0].src}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                {
                    windowReady && 
                    <div className={styles.productInfo}>
                        <h3 className={styles.title}>{product.title}</h3>
                        <div className={styles.price}>${product.variants[variantIndex].price}</div>

                        <div className={styles.dropdown} onClick={handleDropActive} >
                            ¿Qué incluye? <ExpandMoreIcon/>
                        </div>
                        <Collapse in={dropActive}>
                            <p className={styles.description}>{product.description}</p>
                        </Collapse>

                        {multiVariants && 
                            <div className={styles.options}>
                                {/* <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={10}
                                        onChange={handleChange}
                                        label="Age"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl> */}
                                {product.options.map(option => (
                                    <div className={styles.selectField}>
                                        <label for={option.id}>{option.name}:</label>
                                        <div>
                                            <select name={option.name} id={option.id} onChange={handleChange}>
                                                {option.values.map(value => (
                                                    <option value={value.value}>{value.value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        
                        <button className={styles.addToCart}>Añadir a carrito</button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export async function getServerSideProps({query}) {
    // Fetch data from external API

    const handle = query.handle
    const product = await client.product.fetchByHandle(handle)

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIzNjk4NjkyNTIxOA==';
    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 4})


    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(product)), collection: JSON.parse(JSON.stringify(collection))} }
}