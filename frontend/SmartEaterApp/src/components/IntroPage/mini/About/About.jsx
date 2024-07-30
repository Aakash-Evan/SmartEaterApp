/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './About.module.css';
import { getImageUrl } from '../../utils';

function About() {
    return (
        <section className={styles.container}  id="about">
            <h1 className={styles.title}>the healthy way</h1>
            <div className={styles.content}>
                <img className={styles.aboutImg} src={getImageUrl('foodStock.png')} alt="Healhty food" />
                <div className={styles.aboutText}>
                    <h3 className={styles.bigDescription}>Our goal is to help you maintain a healthy diet...</h3>
                    <p className={styles.description}>With SmartEater, you can log the meals you've been consuming, and our intelligent system will analyze your dietary patterns to suggest the best next meals for you by providing personalized meal recommendations based on your eating history.</p>
                </div>
            </div>
        </section>
    );
}

export default About;