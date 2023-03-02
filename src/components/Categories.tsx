import React from "react";

type CategoriesProps = {
    activeIndex: number;
    changeActiveIndex: (i: number) => void;
}

const categories: string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
]

const Categories: React.FC<CategoriesProps> = ({ activeIndex, changeActiveIndex }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li key={index}
                        onClick={() => changeActiveIndex(index)}
                        className={activeIndex === index ? 'active' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
