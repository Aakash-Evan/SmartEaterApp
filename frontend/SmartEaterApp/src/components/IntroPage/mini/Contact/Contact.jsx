/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import styles from './Contact.module.css';
import { getImageUrl } from '../../utils';

function Contact() {
    return (
        <section className={styles.container} id="contact">
            <div className={styles.titleSection}>
                <h2 className={styles.title}>Contact Us</h2>
                <p className={styles.description}>We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
            </div>
            <div className={styles.content}>
                <form className={styles.form} action="https://formspree.io/f/mkgwjyky" method="POST">
                    <div className={styles.formGroup}>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" className="form-control" required />
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="form-control" required />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="email" id="email" name="email" placeholder="Email" className="form-control" required />
                        <input type="tel" id="phone" name="phone" placeholder="Phone Number" className="form-control" pattern="\d{10}" />
                    </div>
                    <div className={styles.formGroup}>
                        <textarea id="message" name="message" placeholder="Enter your message*" className="form-control" rows="3" required></textarea>
                    </div>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;