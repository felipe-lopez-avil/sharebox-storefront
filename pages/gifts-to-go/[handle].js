import styles from '../../styles/product.module.scss'
import {client} from '../../utils/shopify'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function GTGProduct ({product, collection}) {
    return (
        <div className={styles.container}>
            Single Product: {product.title}
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