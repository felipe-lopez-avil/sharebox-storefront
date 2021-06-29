import styles from './ScrollContainer.module.scss'

export default function ScrollContainer({children}) {
    return(
        <>
            <div className={styles.scrollContainer}>
                <div className={styles.scroller}>
                    {children}
                </div>
            </div>
        </>
    )
}