/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import styles from './Features.module.css';
import { getImageUrl } from '../../../../utils';

function Features() {
    return (
        <section className={styles.container} id="features">
            <h2 className={styles.title}>Features</h2>
            <div className={styles.content}>
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("features/log.jpg")} alt="Cursor icon"></img>
                        <div className={styles.aboutItemText}>
                            <h3>Log your meals</h3>
                            <p>Be able to log your meals with information such as when and what you ate. You may also take a picture of your meal.</p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("features/stats.jpg")} alt="Server icon"></img>
                        <div className={styles.aboutItemText}>
                            <h3>Look back at your logs</h3>
                            <p>Be able to look back at what you ate in the past. All the information you log will be saved for you to look back on.</p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("features/advice.jpg")} alt="UI icon"></img>
                        <div className={styles.aboutItemText}>
                            <h3>Get meal recommendations</h3>
                            <p>Get personalized meal recommendations based on your eating history to help you maintain a healthy and balanced diet.</p>
                        </div>
                    </li>
                </ul>
            </div>
            
        </section>
    );
}

export default Features;