import './scss/app.scss';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
