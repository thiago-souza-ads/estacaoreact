import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import style from './Home.module.css';
import {HomeAdministrador} from "./homeImpl/homeAdministrador/HomeAdministrador";
import {HomeCoordenador} from "./homeImpl/homeCoordenador/HomeCoordenador";
import {HomeProfessor} from "./homeImpl/homeProfessor/HomeProfessor";
import {HomeAluno} from "./homeImpl/homeAluno/HomeAluno";


const Home = () => {
    const {setAuth, auth} = useContext(AuthContext);
    const {usuario} = auth;
    const userData = usuario;
    const navigate = useNavigate();
    const role = userData.roles[0].name;

    const logout = async () => {
        setAuth({});
        navigate('/linkpage');
    }

    const getComponent = () => {
        switch (userData.authorities[0].authority) {
            case "Administrador":
                return <HomeAdministrador/>;
            case "Coordenador":
                return <HomeCoordenador/>;
            case "Professor":
                return <HomeProfessor/>;
            default:
                return <HomeAluno/>;
        }
    }

    return (
        <div className={style.fullScreen}>
            {getComponent()}
        </div>
    );
}

export default Home;
