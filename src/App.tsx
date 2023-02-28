import {Route, Routes} from "react-router-dom";
import React from "react";

import './scss/app.scss';
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";


const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <main className="content">
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
