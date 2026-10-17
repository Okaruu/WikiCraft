import AuthTemplate from "../components/templates/AuthTemplate";
import RegisterForm from "../components/organisms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registrarCuenta } from "../utils/cuentas";

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = ({ email, password }) => {
        const error = registrarCuenta({email,password});
        if (error) return error;
        login({ email: email.trim().toLowerCase(), role: "user" });
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