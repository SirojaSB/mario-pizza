import React, {useCallback, useEffect, useRef} from "react";
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
import {useAppDispatch} from "../redux/store";

const MainPage: React.FC = () => {
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

    const {searchedPizzas, status} = useSelector((state: any) => state.pizzas)

    const changeActiveIndexOfCategory = (i: number) => {
        dispatch(changeCategory(i))
    }

    const onChangeCurrentPage = (num: number) => {
        dispatch(changeCurrentPage(num))
    }

    const calculateNumberOfItems = useCallback(
        debounce(() => {
            const pageWidth = document.documentElement.clientWidth
            const numberOfItems = pageWidth < 1189 || pageWidth > 1499 ? 8 : 6

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
            {status === 'error' ?
                (<div className='main-page__error-container'>
                    <h3>Произошла ошибка</h3>
                    <p>Извините, но нам не удалось выгрузить пиццы из нашего хранилища. Повторите попытку позднее.</p>
                </div>) :
                (<>
                    <div className='main-page__container'>
                        <ul className="main-page__items">
                            {status === 'loading' ?
                                [...new Array(8)].map((_, i) => (<PizzaCardSkeleton key={i}/>)) :
                                searchedPizzas.map((item: any) => (<PizzaCard key={item.id} {...item} />))}
                        </ul>
                    </div>
                    <Pagination currentPage={currentPage}
                                onPageChange={onChangeCurrentPage}
                                currentNumberOfItems={currentNumberOfItems}/>
                </>)}
        </div>
    );
}

export default MainPage;
