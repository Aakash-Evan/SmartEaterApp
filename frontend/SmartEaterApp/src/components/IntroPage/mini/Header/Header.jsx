/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import styles from './Header.module.css';
import { getImageUrl } from '../../../../utils';
import { useState } from 'react';


function Header() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className={styles.header}>
            <div className={styles.logo}>
                <img src={getImageUrl('header/logo.png')} alt="Logo" />
            </div>
            <div className={styles.nav}>
                <img className={styles.menuBtn} src={
                    showMenu 
                    ? getImageUrl("header/closeMenu.png")
                    : getImageUrl("header/menuHamburger.png")    
                    } 
                    alt="menu-button"
                    onClick = {() => setShowMenu(!showMenu)}/>
                <ul className={`${styles.menuItems}  ${showMenu && styles.showMenu}`}
                onClick = {() => setShowMenu(false)}>
                    <li>
                        <a href="#home">Home</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#smarteater">SmartEater</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
/* 
<header className={styles.header}>
            <div className={styles.logo}>
                <img src={getImageUrl('header/logo.png')} alt="Logo" />
            </div>
            <nav className={styles.nav}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
*/