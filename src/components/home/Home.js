import {useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import style from './Home.module.css';
import {HomeAdministrador} from "./homeImpl/homeAdministrador/HomeAdministrador";
import {HomeCoordenador} from "./homeImpl/homeCoordenador/HomeCoordenador";
import {HomeProfessor} from "./homeImpl/homeProfessor/HomeProfessor";
import {HomeAluno} from "./homeImpl/homeAluno/HomeAluno";
import NavBarSite from "../navBar/NavBarSite";


const Home = () => {
    const {auth} = useContext(AuthContext);
    const {usuario} = auth;
    const userData = usuario;

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
