import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {changeActiveProperty, getFilterSelector} from "../redux/slices/filterSlice";
import arrow from '../assets/img/arrow-top.svg'

type SortNameItem = {
    name: string;
    sortProperty: string;
}

export const sortNameList: SortNameItem[] = [
    { name: 'популярности ↓', sortProperty: 'rating' },
    { name: 'популярности ↑', sortProperty: 'rating' },
    { name: 'цене ↓', sortProperty: 'price' },
    { name: 'цене ↑', sortProperty: 'price' },
    { name: 'алфавиту ↓', sortProperty: 'title' },
    { name: 'алфавиту ↑', sortProperty: 'title' }
]

const Sort: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const {activeSortProperty} = useSelector(getFilterSelector)
    const dispatch = useDispatch()

    const selectSortVariant = (item: SortNameItem) => {
        dispatch(changeActiveProperty(item))
        setIsOpen(false)
    }

    const sortRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const closePopupOutside = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[];
            }

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setIsOpen(false)
            }
        }

        document.body.addEventListener('click', closePopupOutside)

        return () => document.body.removeEventListener('click', closePopupOutside)
    })

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <img className={isOpen ? 'sort__open' : ''} src={arrow} alt=""/>
                <b>Сортировка по:</b>
                <span onClick={() => setIsOpen(!isOpen)}>{activeSortProperty.name}</span>
            </div>
            {isOpen && (<div className="sort__popup">
                <ul>
                    {sortNameList.map((item, i) => (
                        <li key={i}
                            onClick={() => selectSortVariant(item)}
                            className={activeSortProperty.name === item.name ? 'active' : ''}>{item.name}</li>
                    ))}
                </ul>
            </div>)}
        </div>
    )
}

export default Sort
