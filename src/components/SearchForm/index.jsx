import {useCallback, useRef, useState} from "react";
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";

import styles from './SearchForm.module.scss'
import icon from '../../assets/img/Clear-icon.svg'
import {getSearchedPizzas} from "../../redux/slices/pizzasSlice";

function SearchForm() {
    const [currentValue, setCurrentValue] = useState('')
    const inputRef = useRef()

    const dispatch = useDispatch()

    const cleatInput = () => {
        setCurrentValue('')
        dispatch(getSearchedPizzas(''))
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((value) => {
            dispatch(getSearchedPizzas(value))
        }, 300),
        []
    )

    const onChangeValue = (e) => {
        setCurrentValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <form className={styles.searchForm}>
            <input ref={inputRef} type="text" value={currentValue} onChange={onChangeValue} placeholder='Поиск пиццы...' required/>
            <button type='button' onClick={cleatInput}>
                <img src={icon} alt='Иконка очистки строки поиска'/>
            </button>
        </form>
    )
}

export default SearchForm
