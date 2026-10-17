import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { verificarCuenta } from "../utils/cuentas";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = ({email, password, role}) => {
        if (role==="user"){
            const error = verificarCuenta({email, password});
            if(error) return error;
        }
        login({ email, role })
        navigate("/");
    };

    return (
        <AuthTemplate>
        <LoginForm onSubmit={handleLogin} onBack={() => navigate("/")}/>
        </AuthTemplate>
    );
};

export default LoginPage;