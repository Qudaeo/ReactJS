import styles from './Paginator.module.css'
import classnames from 'classnames'
import {FC} from "react";

type PropsType = {
    totalItemsCount: number
    pageItemsSize: number
    onChangePage: (pageNumber: number, pageSize: number) => void
    currentPage: number
}

const Paginator: FC<PropsType> = (
    {totalItemsCount, pageItemsSize, onChangePage, currentPage}
    ) => {
    const pagesCount = Math.ceil(totalItemsCount / pageItemsSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesBreak = false

    return (
        <div className={styles.paginationBlock}>
            {pages.map(p => {
                    return (p < 6 || Math.abs(currentPage - p) < 5 || (pages.length - p < 5))
                        ? <span key={p} onClick={() => onChangePage(p, pageItemsSize)}
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