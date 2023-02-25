import cart from '../assets/img/empty-cart.png'
import {useNavigate} from "react-router-dom";

function CartEmpty() {
    const navigate = useNavigate()

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Корзина пустая 😕</h2>
                <p>
                    Вероятней всего, вы не заказывали ещё пиццу.<br/>
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
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
