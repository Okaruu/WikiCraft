import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = ({email, role}) => {
        login({ email, role })
        navigate(role === "admin" ? "/admin" : "/");
    };

    return (
        <AuthTemplate>
        <LoginForm onSubmit={handleLogin} onBack={() => navigate("/")}/>
        </AuthTemplate>
    );
};

export default LoginPage;