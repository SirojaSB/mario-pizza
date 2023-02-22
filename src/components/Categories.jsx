function Categories({ activeIndex, changeActiveIndex }) {

    const categories = [
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
                        className={activeIndex === index ? 'active' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
