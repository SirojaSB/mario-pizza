import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import PizzaCardSkeleton from "../components/PizzaCard/PizzaCardSkeleton";
import {useEffect, useState} from "react";

function MainPage() {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://63f20e814f17278c9a1f42b0.mockapi.io/pizzas')
            .then((res) => res.json())
            .then((data) => {
                setPizzas(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className='content__container'>
                <ul className="content__items">
                    {isLoading ? [...new Array(6)].map((_, i) => (<PizzaCardSkeleton key={i}/>)) : pizzas.map((item) => (
                        <PizzaCard key={item.id} {...item} />))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
