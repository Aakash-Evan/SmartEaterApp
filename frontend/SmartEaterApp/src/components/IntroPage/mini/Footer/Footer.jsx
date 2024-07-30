// eslint-disable-next-line no-unused-vars
import styles from './Footer.module.css';
import { getImageUrl } from '../../../../utils';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-logo']}>
                <img src={getImageUrl('header/logo.png')} alt="Logo" />
            </div>
            <nav className={styles['footer-nav']}>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#contact">Contact Us</a>
            </nav>
        </footer>
    );
}

export default Footer;
