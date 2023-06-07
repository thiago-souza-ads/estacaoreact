import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import AuthContext from '../../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ user }) => {
    const { setAuth, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = async () => {
        setAuth({});
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`${styles['user-sidebar']} ${sidebarOpen ? styles.open : ''}`}>
            <div className={styles['profile-circle']}>
                <img src="/path/to/user/profile/image" alt="User Profile" />
            </div>
            <h2>{user.nome}</h2>
            <h3>{user.roles[0].nome}</h3>
            <Link to="/linkpage">Editar Perfil</Link>
            <div className="flexGrow">
                <button className={styles['logout-button']} onClick={logout}>
                    <FontAwesomeIcon icon={faPowerOff} size="sm" /> Sair
                </button>
            </div>
            <div className={styles['toggle-button']} onClick={toggleSidebar}>
                <span>{sidebarOpen ? '<' : '>'}</span>
            </div>
        </div>
    );
};

export default SideBar;
