/* eslint-disable no-unused-vars */
import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import styles from './Button.module.css';


function Button() {
    return (
        <section className={styles.container} id="smarteater">
            <div className={styles.info}>
                <p className={styles.description}>
                    Explore our SmartEater website! The button below will take you to our WebApp, where you can enter your meals, track your diet, and receive personalized meal recommendations to help you maintain a balanced and healthy lifestyle.
                </p>
                <SignInButton mode="modal" forceRedirectUrl={'/smart-eater'} className={styles.button}>
                        Sign up / Log in
                </SignInButton>
            </div>
        </section>
    );
}

export default Button;