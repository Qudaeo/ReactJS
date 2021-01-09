import styles from './Paginator.module.css'
import classnames from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageItemsSize: number
    onChangePage: any
    currentPage: number
}

const Paginator = ({totalItemsCount, pageItemsSize, onChangePage, currentPage}: PropsType) => {
    const pagesCount = Math.ceil(totalItemsCount / pageItemsSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesBreak = false

    return (
        <div className={styles.paginationBlock}>
            {pages.map(p => {
                    return (p < 6 || Math.abs(currentPage - p) < 5 || (pages.length - p < 5))
                        ? <span key={p} onClick={() => onChangePage(p)}
                                className={classnames({[styles.selectedPage]: currentPage === p})
                                }>{(pagesBreak = true) && p}
                          </span>
                        : (pagesBreak ? (!(pagesBreak = false) && ('...')) : '')
                }
            )}
        </div>
    )
}

export default Paginator