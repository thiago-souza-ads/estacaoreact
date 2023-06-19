import Register from './components/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/naoEncontrada/Missing';
import Unauthorized from './components/naoAutorizado/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import {Route, Routes} from 'react-router-dom';
import Usuarios from "./components/usuarios/Usuarios";
import Dashboard from "./components/dashboard/Dashboard";
import Alunos from "./components/alunos/Alunos";
import Mapa from "./components/mapa/Mapa";
import Questionarios from "./components/questionarios/Questionarios";
import AvatarEdit from "./components/avatarEdit/AvatarEdit";
import PerfilEdit from "./components/perfilEdit/PerfilEdit";

const ROLES = {
    'Professor': 1001,
    'Coordenador': 1002,
    'Administrador': 1003,
    'Aluno': 1000
}

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* Rotas Publicas */}
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="linkpage" element={<LinkPage/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>

                {/* Rotas Protegidas */}


                {/* Mista entre ususarios */}
                <Route element={<RequireAuth
                    allowedRoles={[ROLES.Aluno, ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]}/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[ROLES.Aluno, ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]}/>}>
                    <Route path="/editar-perfil" element={<PerfilEdit/>}/>
                </Route>

                <Route element={<RequireAuth
                    allowedRoles={[ROLES.Aluno, ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]}/>}>
                    <Route path="/editar-avatar" element={<AvatarEdit/>}/>
                </Route>

                <Route
                    element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]}/>}>
                    <Route path="editor" element={<Editor/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]}/>}>
                    <Route path="admin" element={<Admin/>}/>
                </Route>

                <Route
                    element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]}/>}>
                    <Route path="lounge" element={<Lounge/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]}/>}>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]}/>}>
                    <Route path="/alunos" element={<Alunos/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]}/>}>
                    <Route path="/mapas" element={<Mapa/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]}/>}>
                    <Route path="/questionarios" element={<Questionarios/>}/>
                </Route>

                {/* Somente para Administradores */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Administrador]}/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Route>

                {/* Somente para Coordenadores */}

                {/* Somente para Professores */}

                {/* Somente para Alunos */}


                {/* Liberada */}
                <Route path="*" element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
