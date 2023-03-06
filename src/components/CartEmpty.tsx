import React from "react";
import cart from '../assets/img/empty-cart.png'
import {useNavigate} from "react-router-dom";

const CartEmpty: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="container cart-page">
            <div className="cart-empty">
                <h2>Корзина пустая 😕</h2>
                <p>
                    Вероятней всего, вы еще не добавили пиццу в корзину.<br/>
                    Чтобы добавить пиццу в корзину, перейди на главную страницу.
                </p>
                <img src={cart} alt="Empty cart"/>
                <button onClick={() => navigate(-1)} type='button' className="button button--black">
                    <span>Вернуться назад</span>
                </button>
            </div>
        </div>
    )
}

export default CartEmpty
