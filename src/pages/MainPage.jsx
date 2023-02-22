import {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import PizzaCardSkeleton from "../components/PizzaCard/PizzaCardSkeleton";
import SearchForm from "../components/SearchForm";

function MainPage() {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeIndexOfCategory, setActiveIndexOfCategory] = useState(0)
    const [activeSortProperty, setActiveSortProperty] = useState({name: 'популярности ↓', sortProperty: 'rating'})
    const [searchValue, setSearchValue] = useState('')

    const sortingCategory = activeIndexOfCategory > 0 ? `category=${activeIndexOfCategory}` : ''
    const order = activeSortProperty.name.includes('↓') ? `desc` : `asc`

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://63f20e814f17278c9a1f42b0.mockapi.io/pizzas?${sortingCategory}&sortBy=${activeSortProperty.sortProperty}&order=${order}`)
            .then((res) => res.json())
            .then((data) => {
                const searchedPizzas = data.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                setPizzas(searchedPizzas)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [activeIndexOfCategory, activeSortProperty, searchValue])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={activeIndexOfCategory} changeActiveIndex={(i) => setActiveIndexOfCategory(i)}/>
                <Sort activeProperty={activeSortProperty} changeActiveProperty={(item) => setActiveSortProperty(item)}/>
            </div>
            <div className='content__undertop'>
                <h2 className="content__title">Все пиццы</h2>
                <SearchForm searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='content__container'>
                <ul className="content__items">
                    {isLoading ?
                        [...new Array(6)].map((_, i) => (<PizzaCardSkeleton key={i}/>)) :
                        pizzas.map((item) => (<PizzaCard key={item.id} {...item} />))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
