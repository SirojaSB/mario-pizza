import styles from './SearchForm.module.scss'
import icon from '../../assets/img/Clear-icon.svg'

function SearchForm({searchValue, setSearchValue}) {
    return (
        <form className={styles.searchForm}>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Поиск пиццы...' required/>
            <button type='button' onClick={() => setSearchValue('')}>
                <img src={icon} alt='Иконка очистки строки поиска'/>
            </button>
        </form>
    )
}

export default SearchForm
