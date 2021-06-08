import styles from '../styles/box-to-go.module.scss'

import Products from '../components/ProductsPage/Products/Products'
import { client } from '../utils/shopify'

export default function OutOfTheBox({collection}){


    return (
        <div className={styles.PageContainer}>
            <div className={styles.PageTitle}>
                <h1>OUT OF THE BOX</h1>
            </div>
            <div className={styles.Products}>
                <div className={styles.Filters}>
                    <h3>FILTROS</h3>
                </div>
                <div className={styles.ProductsDisplay}>
                    <Products collection={collection} link="out-of-the-box"/>
                </div>
            </div>
        </div>
    )
}



export async function getServerSideProps() {
    // Fetch data from external API

    const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIzNjk4NjkyNTIxOA==';

    const collection = await client.collection.fetchWithProducts(collectionId, {productsFirst: 8})
    
    
    console.log({ collection })
    // Pass data to the page via props
    return { props: { collection: JSON.parse(JSON.stringify(collection))} }
}