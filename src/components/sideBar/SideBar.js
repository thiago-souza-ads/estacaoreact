import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import AuthContext from '../../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'avataaars';

const SideBar = ({ user }) => {
    const { setAuth } = useContext(AuthContext);
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
            {sidebarOpen && (
                <div className={styles['avatar-container']} onClick={() =>  navigate('/editar-avatar')}>
                    <Avatar
                        className="avataaar"
                        avatarStyle="Circle"
                        topType={avatarUser.topType}
                        accessoriesType={avatarUser.accessoriesType}
                        hairColor={avatarUser.hairColor}
                        facialHairType={avatarUser.facialHairType}
                        clotheType={avatarUser.clotheType}
                        clotheColor={avatarUser.clotheColor}
                        eyeType={avatarUser.eyeType}
                        hatColor={avatarUser.hatColor}
                        graphicType={avatarUser.graphicType}
                        facialHairColor={avatarUser.facialHairColor}
                        eyebrowType={avatarUser.eyebrowType}
                        mouthType={avatarUser.mouthType}
                        skinColor={avatarUser.skinColor}
                    />
                </div>
            )}
            <h2 className={sidebarOpen ? styles.closed : styles.hidden}>{user.nome}</h2>
            <h3 className={sidebarOpen ? styles.closed : styles.hidden}>{user.roles[0].nome}</h3>
            <Link to="/editar-perfil" className={sidebarOpen ? styles.closed : styles.hidden}>
                Editar Perfil
            </Link>
            {sidebarOpen && (
                <div className={`flexGrow ${styles.closed}`}>
                    <button className={styles['home-button']} onClick={() => navigate('/')}> {/* Adicione o botão Home */}
                        <FontAwesomeIcon icon={faHome} size="sm" /> Home
                    </button>
                    <button className={styles['logout-button']} onClick={logout}>
                        <FontAwesomeIcon icon={faPowerOff} size="sm" /> Sair
                    </button>
                </div>
            )}
            <div className={styles['toggle-button']} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
        </div>
    );
};

export default SideBar;
