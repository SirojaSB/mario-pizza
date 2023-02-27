import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
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
    setFilterFromUrl
} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

function MainPage() {
    const [searchValue, setSearchValue] = useState('')
    const isSearch = useRef(false)
    const isFirstMount = useRef(true)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {
        activeIndexOfCategory,
        activeSortProperty,
        currentPage,
        currentNumberOfItems
    } = useSelector(state => state.filter)

    const {pizzas, status} = useSelector(state => state.pizzas)

    const changeActiveIndexOfCategory = i => {
        dispatch(changeCategory(i))
    }

    const onChangeCurrentPage = num => {
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

            dispatch(setFilterFromUrl({...params, activeSortProperty}))

            isSearch.current = true
        }
    }, [])

    const getPizzas = () => {
        const sortingCategory = activeIndexOfCategory > 0 ? `category=${activeIndexOfCategory}` : ''
        const order = activeSortProperty.name.includes('↓') ? `desc` : `asc`

        dispatch(fetchPizzas({
            sortingCategory,
            order,
            currentNumberOfItems,
            currentPage,
            sortProperty: activeSortProperty.sortProperty,
            searchValue
        }))
    }


    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [activeIndexOfCategory, activeSortProperty, searchValue, currentPage, currentNumberOfItems])

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
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={activeIndexOfCategory}
                            changeActiveIndex={(i) => changeActiveIndexOfCategory(i)}/>
                <Sort/>
            </div>
            <div className='content__undertop'>
                <h2 className="content__title">Все пиццы</h2>
                <SearchForm setSearchValue={setSearchValue}/>
            </div>
            {status === 'error' ?
                (<div className='content__error-container'>
                    <h3>Произошла ошибка</h3>
                    <p>Извините, но нам не удалось выгрузить пиццы из нашего хранилища. Повторите попытку позднее.</p>
                </div>) :
                (<>
                    <div className='content__container'>
                        <ul className="content__items">
                            {status === 'loading' ?
                                [...new Array(8)].map((_, i) => (<PizzaCardSkeleton key={i}/>)) :
                                pizzas.map((item) => (<PizzaCard key={item.id} {...item} />))}
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
