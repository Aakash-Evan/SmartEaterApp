import Header from './mini/Header/Header';
import About from './mini/About/About';
import Features from './mini/Features/Features';
import Button from './mini/Button/Button';
import Contact from './mini/Contact/Contact';
import Footer from './mini/Footer/Footer';

import styles from './IntroPage.module.css';


function IntroPage() {
    return (
        <div className={styles.container}>
            <Header />
            <About />
            <Features />
            <Button />
            <Contact />
            <Footer />
            
        </div>
    );
}

export default IntroPage;