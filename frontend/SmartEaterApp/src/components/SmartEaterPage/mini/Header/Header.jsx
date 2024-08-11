/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import styles from './Header.module.css';
import { getImageUrl } from '../../utils';
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };
    return (
        <nav className={styles.header}>
            <div className={styles.logo}>
                <img src={getImageUrl('logo.png')} alt="Logo" onClick={() => handleClick('/smart-eater')} />
            </div>
            <div className={styles.nav}>
                <UserButton className={styles.userButton}/>
            </div>
        </nav>
    );
}

export default Header;