import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

function Pagination({onPageChange, currentNumberOfItems, currentPage}) {
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
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination
