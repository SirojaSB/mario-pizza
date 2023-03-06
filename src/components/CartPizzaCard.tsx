import {useDispatch} from "react-redux";
import React from "react";

import minus from '../assets/img/Minus.svg'
import plus from '../assets/img/plus.svg'
import remove from '../assets/img/Remove.svg'
import {increaseCountOfItem, decreaseCountOfItem, removeItem} from "../redux/slices/cartSlice";

type CartCardProps = {
    id: number;
    imageUrl: string;
    title: string;
    size: number;
    type: string;
    count: number;
    price: number;
}

const CartPizzaCard: React.FC<CartCardProps> = ({id, imageUrl, title, size, type, count, price}) => {
    const dispatch = useDispatch()

    const increaseCounter = () => {
        dispatch(increaseCountOfItem(id))
    }

    const decreaseCounter = () => {
        dispatch(decreaseCountOfItem(id))
    }

    const removePizza = () => {
        dispatch(removeItem(id))
    }

    return (
        <div className="cart-card">
            <div className="cart-card__img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart-card__info">
                <h3>{title}</h3>
                <p>{type}, {size} см.</p>
            </div>
            <div className="cart-card__count">
                <button onClick={decreaseCounter} type="button" className="button button--outline button--circle cart-card__count_minus">
                    <img src={minus} alt="Минус"/>
                </button>
                <b>{count}</b>
                <button onClick={increaseCounter} type="button" className="button button--outline button--circle cart-card__count_plus">
                    <img src={plus} alt="Плюс"/>
                </button>
            </div>
            <div className="cart-card__price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart-card__remove">
                <button onClick={removePizza} type='button' className="button button--outline button--circle">
                    <img src={remove} alt="Удалить"/>
                </button>
            </div>
        </div>
    )
}

export default CartPizzaCard
