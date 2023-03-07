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
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"/>
                    </svg>
                </button>
                <b>{count}</b>
                <button onClick={increaseCounter} type="button" className="button button--outline button--circle cart-card__count_plus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"/>
                        <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"/>
                    </svg>
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
