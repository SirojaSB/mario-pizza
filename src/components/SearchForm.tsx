import React, {useCallback, useRef, useState} from "react";
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";

import icon from '../assets/img/Clear-icon.svg'
import {getSearchedPizzas} from "../redux/slices/pizzasSlice";

const SearchForm: React.FC = () => {
    const [currentValue, setCurrentValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    const cleatInput = () => {
        setCurrentValue('')
        dispatch(getSearchedPizzas(''))
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((value: string) => {
            dispatch(getSearchedPizzas(value))
        }, 300),
        []
    )

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <form className='search-form'>
            <input ref={inputRef} type="text" value={currentValue} onChange={onChangeValue} placeholder='Поиск пиццы...' required/>
            <button type='button' className='button' onClick={cleatInput}>
                <img src={icon} alt='Иконка очистки строки поиска'/>
            </button>
        </form>
    )
}

export default SearchForm
