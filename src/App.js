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
import { Routes, Route } from 'react-router-dom';
import Usuarios from "./components/usuarios/Usuarios";

const ROLES = {
  'Professor': 1001,
  'Coordenador': 1002,
  'Administrador': 1003,
  'Aluno': 1000
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rotas Publicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Rotas Protegidas */}


        {/* Mista entre ususarios */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Aluno, ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador, ROLES.Professor]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Administrador, ROLES.Coordenador]} />}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>

        {/* Somente para Administradores */}

        {/* Somente para Coordenadores */}

        {/* Somente para Professores */}

        {/* Somente para Alunos */}


        {/* Liberada */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
