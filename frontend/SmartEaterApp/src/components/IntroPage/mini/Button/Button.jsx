/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import styles from './Button.module.css';

function Button() {
    return (
        <section className={styles.container} id="smarteater">
            <div className={styles.info}>
                <p className={styles.description}>
                    Explore our SmartEater website! The button below will take you to our WebApp, where you can enter your meals, track your diet, and receive personalized meal recommendations to help you maintain a balanced and healthy lifestyle.
                </p>
                <a href="https://your-webapp-url.com" target="_self" rel="noopener noreferrer">
                    <button type="button" className={styles.button}>
                        Go to SmartEater WebApp
                    </button>
                </a>
            </div>
        </section>
    );
}

export default Button;
