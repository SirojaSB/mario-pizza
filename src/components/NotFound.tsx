import {useNavigate} from "react-router-dom";
import React from "react";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <h3 className='not-found__error'>404</h3>
            <p>Страница не найдена &#129300;</p>
            <button type='button'  onClick={() => navigate(-1)}>Вернуться назад</button>
        </div>
    )
}

export default NotFound
