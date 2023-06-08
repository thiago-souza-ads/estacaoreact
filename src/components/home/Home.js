import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import style from './Home.module.css';
import {HomeAdministrador} from "./homeImpl/HomeAdministrador";
import {HomeCoordenador} from "./homeImpl/HomeCoordenador";
import {HomeProfessor} from "./homeImpl/HomeProfessor";
import {HomeAluno} from "./homeImpl/HomeAluno";


const Home = () => {
    const { setAuth, auth } = useContext(AuthContext);
    const { usuario } = auth;
    const userData = usuario;
    const navigate = useNavigate();
    const role = userData.roles[0].name;

    const logout = async () => {
        setAuth({});
        navigate('/linkpage');
    }

    const getComponent = () => {
        switch (role) {
            case "Administrador":
                return <HomeAdministrador />;
            case "Coordenador":
                return <HomeCoordenador />;
            case "Professor":
                return <HomeProfessor />;
            default:
                return <HomeAluno />;
        }
    }

    return (
        <div className={style.fullScreen}>
            {getComponent()}
            <button onClick={logout}>Sign Out</button>
        </div>
    );
}

export default Home;
