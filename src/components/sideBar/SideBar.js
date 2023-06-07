import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import AuthContext from '../../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faBars } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'avataaars';

const SideBar = ({ user }) => {
    const { setAuth, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const avatarUser = user.avatar;

    const logout = async () => {
        setAuth({});
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`${styles['user-sidebar']} ${sidebarOpen ? styles.open : styles.closed}`}>
            <div className={`${styles['avatar-container']} ${sidebarOpen ? '' : styles.closed}`}>
                <Avatar
                    className={`avataaar ${sidebarOpen ? '' : styles.closed}`}
                    avatarStyle="Circle"
                    topType={avatarUser.topType}
                    accessoriesType={avatarUser.accessoriesType}
                    hairColor={avatarUser.hairColor}
                    facialHairType={avatarUser.facialHairType}
                    clotheType={avatarUser.clotheType}
                    clotheColor={avatarUser.clotheColor}
                    eyeType={avatarUser.eyeType}
                    eyebrowType={avatarUser.eyebrowType}
                    mouthType={avatarUser.mouthType}
                    skinColor={avatarUser.skinColor}
                />
            </div>
            <h2 className={`${sidebarOpen ? styles.closed : styles.hidden}`}>{user.nome}</h2>
            <h3 className={`${sidebarOpen ? styles.closed : styles.hidden}`}>{user.roles[0].nome}</h3>
            <Link to="/linkpage" className={`${sidebarOpen ? styles.closed : styles.hidden}`}>
                Editar Perfil
            </Link>
            <div className={`flexGrow ${sidebarOpen ? '' : styles.closed}`}>
                <button className={styles['logout-button']} onClick={logout}>
                    <FontAwesomeIcon icon={faPowerOff} size="sm" /> Sair
                </button>
            </div>
            <div className={styles['toggle-button']} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
        </div>
    );
};

export default SideBar;
