import {useNavigate} from "react-router-dom";
import styles from './NotFound.module.scss'

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <p className={styles.error}>404</p>
            <p >Страница не найдена &#129300;</p>
            <button type='button'  onClick={() => navigate(-1)}>Вернуться назад</button>
        </div>
    )
}

export default NotFound
