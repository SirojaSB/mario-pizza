import React from "react";

type CategoriesProps = {
    activeIndex: number;
    changeActiveIndex: any;
}

const Categories: React.FC<CategoriesProps> = ({ activeIndex, changeActiveIndex }) => {
    const categories: string[] = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li key={index}
                        onClick={() => changeActiveIndex(index)}
                        className={Number(activeIndex) === index ? 'active' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
