import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";

import logo from '../assets/img/Mario-logo.png'
import cart from '../assets/img/Cart-icon-white.svg'
import {getCartSelector} from "../redux/slices/cartSlice";

const Header: React.FC = () => {
    const isFirstMount = useRef(true)

    const data = useSelector(getCartSelector)

    useEffect(() => {
        if(!isFirstMount.current) {
            localStorage.setItem('cart', JSON.stringify(data))
        }

        isFirstMount.current = false
    }, [data])

    return (
        <header className="header">
            <div className="container">
                <Link to='/' className="header__logo">
                    <img src={logo} alt="Pizza logo"/>
                    <div>
                        <h1>Mario Pizza</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </div>
                </Link>
                <div className="header__cart">
                    <Link to='/cart' className="button button--cart">
                        <span>{data.totalPrice} ₽</span>
                        <div className="button__delimiter"></div>
                        <img src={cart} alt="Иконка корзины"/>
                        <span>{data.totalCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
