import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addItem, CartItem} from '../../redux/slices/cartSlice'
import {SelectedPizzaItem, setSelectedPizza} from "../../redux/slices/pizzasSlice";

type PizzaCardProps = {
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
    info: string;
    onClickCard: (arg: boolean) => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({imageUrl, title, price, sizes, types, info, onClickCard}) => {
    const [activeIndexOfType, setActiveIndexOfType] = useState(0)
    const [activeIndexOfSize, setActiveIndexOfSize] = useState(0)

    const typeNames = ['тонкое', 'традиционное']

    const dispatch = useDispatch()

    const addPizzaToCart = () => {
        const pizza: CartItem = {
            imageUrl,
            title,
            price,
            size: sizes[activeIndexOfSize],
            type: typeNames[activeIndexOfType],
            count: 0
        }

        dispatch(addItem(pizza))
    }

    const openCard = () => {
        dispatch(setSelectedPizza({imageUrl, title, info}))

        onClickCard(true)
    }

    return (
        <li className="pizza-block">
            <div onClick={openCard} className='pizza-block__pointer'>
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
            </div>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((id) => <li key={id}
                                           onClick={() => setActiveIndexOfType(id)}
                                           className={activeIndexOfType === id ? 'active' : ''}>{typeNames[id]}</li>)}
                </ul>
                <ul>
                    {sizes.map((size, i) => <li key={size}
                                                onClick={() => setActiveIndexOfSize(i)}
                                                className={activeIndexOfSize === i ? 'active' : ''}>{size} см.</li>)}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <button onClick={addPizzaToCart} className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>В корзину</span>
                </button>
            </div>
        </li>
    )
}

export default PizzaCard
