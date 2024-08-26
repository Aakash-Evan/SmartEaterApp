import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Some Title</h1>
            <div className={styles.block} onClick={() => handleClick('/smart-eater/meal-logger')}>
                <h1 className={styles.title}>Meal Logger</h1>
                <p className={styles.description}>Log your meals</p>
            </div>
            <div className={styles.block} onClick={() => handleClick('/smart-eater/meal-records')}>
                <h1 className={styles.title}>Meal Tracker</h1>
                <p className={styles.description}>Track your meals</p>
            </div>
            <div className={styles.block} onClick={() => handleClick('/smart-eater/meal-list')}>
                <h1 className={styles.title}>Meal Planner</h1>
                <p className={styles.description}>Plan your meals with AI</p>
            </div>
        </div>
    );
}

export default Home;
