import React from "react";

import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type PaginationProps = {
    onPageChange: any;
    currentNumberOfItems: number;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({onPageChange, currentNumberOfItems, currentPage}) => {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onPageChange(e.selected + 1)}
            pageRangeDisplayed={currentNumberOfItems}
            pageCount={2}
            forcePage={currentPage - 1}
            previousLabel="<"
        />
    )
}

export default Pagination
