import React, {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import debounce from 'lodash.debounce'
import qs from 'qs'
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {sortNameList} from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import PizzaCardSkeleton from "../components/PizzaCard/PizzaCardSkeleton";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";
import {
    changeCategory,
    changeCurrentPage,
    changeCurrentNumberOfItems,
    setFilterFromUrl,
    getFilterSelector
} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";
import {RootState, useAppDispatch} from "../redux/store";

const MainPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const isSearch = useRef(false)
    const isFirstMount = useRef(true)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const {
        activeIndexOfCategory,
        activeSortProperty,
        currentPage,
        currentNumberOfItems
    } = useSelector(getFilterSelector)

    const {searchedPizzas, status, selectedPizza} = useSelector((state: RootState) => state.pizzas)

    const changeActiveIndexOfCategory = (i: number) => {
        dispatch(changeCategory(i))
    }

    const onChangeCurrentPage = (num: number) => {
        dispatch(changeCurrentPage(num))
    }

    const calculateNumberOfItems = useCallback(
        debounce(() => {
            const pageWidth = document.documentElement.clientWidth
            const numberOfItems = pageWidth < 1173 || pageWidth > 1499 ? 8 : 6

            dispatch(changeCurrentNumberOfItems(numberOfItems))
        }, 500),
        []
    )

    useEffect(() => {
        window.addEventListener('resize', calculateNumberOfItems)

        return () => window.removeEventListener('resize', calculateNumberOfItems)
    }, [])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const activeSortProperty = sortNameList.find(item => item.name === params.name)

            const {
                activeIndexOfCategory,
                currentPage,
                currentNumberOfItems
            } = params

            dispatch(setFilterFromUrl({
                activeIndexOfCategory: Number(activeIndexOfCategory),
                currentPage: Number(currentPage),
                currentNumberOfItems: Number(currentNumberOfItems),
                activeSortProperty: activeSortProperty || sortNameList[0]
            }))

            isSearch.current = true
        }
    }, [])

    const getPizzas = () => {
        const sortingCategory = activeIndexOfCategory > 0 ? `category=${activeIndexOfCategory}` : ''
        const order = activeSortProperty.name.includes('↓') ? `desc` : `asc`

        dispatch(
            fetchPizzas({
                sortingCategory,
                order,
                currentNumberOfItems,
                currentPage,
                sortProperty: activeSortProperty.sortProperty
            }))
    }

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [activeIndexOfCategory, activeSortProperty, currentPage, currentNumberOfItems])

    useEffect(() => {
        if (!isFirstMount.current) {
            const queryString = qs.stringify({
                name: activeSortProperty.name,
                activeIndexOfCategory,
                currentPage
            })

            navigate(`?${queryString}`)
        }

        isFirstMount.current = false
    }, [activeIndexOfCategory, activeSortProperty, currentPage])

    const error = (<div className='main-page__error-container'>
        <h3>Произошла ошибка</h3>
        {status === 'error' ?
            <p>Извините, но нам не удалось выгрузить пиццы из нашего хранилища. Повторите попытку позднее.</p> :
            <p>Поиск не дал результата. Попробуйте найти другую пиццу</p>}
    </div>)

    return (
        <div className="main-page container">
            <div className="main-page__top">
                <Categories activeIndex={Number(activeIndexOfCategory)}
                            changeActiveIndex={(i: number) => changeActiveIndexOfCategory(i)}/>
                <Sort/>
            </div>
            <div className='main-page__undertop'>
                <h2 className="main-page__title">Все пиццы</h2>
                <SearchForm/>
            </div>
            {status === 'error' ? error :
                <>
                    <div className='main-page__container'>
                        <ul className="main-page__items">
                            {status === 'loading' ?
                                [...new Array(8)].map((_, i) => (<PizzaCardSkeleton key={i}/>)) :
                                searchedPizzas.map((item) => (
                                    <PizzaCard key={item.id} {...item} onClickCard={(arg) => setIsOpen(arg)}/>))}
                        </ul>
                    </div>
                    {searchedPizzas.length < currentNumberOfItems && currentPage !== 2 ? null :
                        <Pagination currentPage={currentPage}
                                    onPageChange={onChangeCurrentPage}
                                    currentNumberOfItems={currentNumberOfItems}/>}
                </>}
            {searchedPizzas.length >= 1 || status === 'loading' ? null : error}
            <div onClick={() => setIsOpen(false)} className={`main-page__popup ${isOpen && 'main-page__popup_open'}`}>
                <div onClick={e => e.stopPropagation()} className='main-page__popup-content'>
                    <button type="button" aria-label="Закрыть карточку" onClick={() => setIsOpen(false)}/>
                    <img src={selectedPizza.imageUrl} alt="Фото пиццы"/>
                    <h3>{selectedPizza.title}</h3>
                    <p>{selectedPizza.info}</p>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
