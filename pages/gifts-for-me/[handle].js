import React, {useState, useEffect} from 'react'
import styles from '../../styles/product.module.scss'
import {client} from '../../utils/shopify'
import { useRouter } from 'next/router'
import Image from 'next/image'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

export default function GTGProduct ({product, collection}) {
    
    console.log(product)

    const [dropActive, setDropActive] = useState(false)
    const handleDropActive = () => {
        setDropActive(!dropActive);
    };

    return (
        <div className={styles.container}>
            <div className={styles.product}>
                <div className={styles.productImages}>
                    
                </div>
                <div className={styles.productInfo}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <div className={styles.price}>${product.variants[0].price}</div>

                    <div className={styles.dropdown} onClick={handleDropActive} >
                        ¿Qué incluye? <ExpandMoreIcon/>
                    </div>
                    <Collapse in={dropActive}>
                        <p className={styles.description}>{product.description}</p>
                    </Collapse>

                    <button className={styles.addToCart}>Añadir a carrito</button>
                </div>
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