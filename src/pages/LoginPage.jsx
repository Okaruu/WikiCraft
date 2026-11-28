import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { iniciarSesion } from "../utils/cuentas";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async ({ email, password, role }) => {
        const { error, sesion } = await iniciarSesion({ email, password });
        if (error) return error;
        if (role === "admin" && sesion.role !== "admin")
            return "Esta cuenta no tiene permisos de administrador";
        login(sesion);
        navigate("/");
        return "";
    };

    return (
        <AuthTemplate>
            <LoginForm onSubmit={handleLogin} onBack={() => navigate("/")} />
        </AuthTemplate>
    );
}

export default LoginPage;