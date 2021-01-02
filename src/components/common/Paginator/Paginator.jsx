import React from "react";
import styles from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageUsersSize, onChangePage, currentPage}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageUsersSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesBreak = null

    return (
        <div>
            {pages.map(p => <span key={p} onClick={() => onChangePage(p)}
                                  className={(currentPage === p) ? styles.selectedPage : ''}>
                    {
                        (p < 4 || Math.abs(currentPage - p) < 3 || (pages.length - p < 3))
                            ? ((pagesBreak = true) && p + ' ')
                            : (pagesBreak ? (!(pagesBreak = false) && ('... ')) : '')
                    }
                </span>)}
        </div>

    )
}

export default Paginator