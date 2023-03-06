import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import cart from '../assets/img/Cart-icon.svg'
import trash from '../assets/img/trash.svg'
import back from '../assets/img/grey-arrow-left.svg'
import CartPizzaCard from "../components/CartPizzaCard";
import {clearCart, getCartSelector} from "../redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty";

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {items, totalPrice, totalCount} = useSelector(getCartSelector)

    const clearFullCart = () => {
        dispatch(clearCart())
    }

    if (!totalPrice) {
        return <CartEmpty/>
    }

    return (
        <div className="container cart-page">
            <div className="cart-page__top">
                <h2 className="cart-page__title">
                    <img src={cart} alt="Иконка корзины"/>
                    Корзина
                </h2>
                <div onClick={clearFullCart} className="cart-page__clear">
                    <img src={trash} alt="Очистка корзины"/>
                    <span>Очистить корзину</span>
                </div>
            </div>
            <div className="content__items cart-page__items_cart">
                {items.map((pizza: any) => (
                    <CartPizzaCard key={pizza.id} {...pizza}/>
                ))}
            </div>
            <div className="cart-page__bottom">
                <div className="cart-page__bottom-details">
                    <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                    <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                </div>
                <div className="cart-page__bottom-buttons">
                    <button type='button' className="button button--outline button--add go-back-btn"
                            onClick={() => navigate(-1)}>
                        <img src={back} alt="Стрелка назад"/>
                        <span>Вернуться назад</span>
                    </button>
                    <div className="button pay-btn">
                        <span>Оплатить сейчас</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
