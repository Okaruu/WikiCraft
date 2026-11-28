import AuthTemplate from "../components/templates/AuthTemplate";
import RegisterForm from "../components/organisms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registrarCuenta, iniciarSesion } from "../utils/cuentas";

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async ({ email, password }) => {
        const errorRegistro = await registrarCuenta({ email, password });
        if (errorRegistro) return errorRegistro;
        const { error, sesion } = await iniciarSesion({ email, password });
        if (error) return error;
        login(sesion);
        navigate("/");
        return "";
    };

    return (
        <AuthTemplate>
            <RegisterForm onSubmit={handleRegister} onBack={() => navigate("/")} />
        </AuthTemplate>
    );
}

export default RegisterPage;