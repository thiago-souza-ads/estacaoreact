import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SideBar from "./sideBar/SideBar";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const { usuario } = auth;
    const userData = usuario;

    return (
        <>
            {allowedRoles.includes(auth?.roles) ? (
                <>
                    <div>
                        <SideBar user={userData} />
                        <Outlet />
                    </div>
                </>
            ) : auth?.user ? (
                <Navigate to="/unauthorized" state={{ from: location }} replace />
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </>
    );
};

export default RequireAuth;
