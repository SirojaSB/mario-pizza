import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaCard from "./components/PizzaCard";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <main className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        <PizzaCard />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
