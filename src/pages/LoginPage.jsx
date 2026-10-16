import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = ({role}) => {
        navigate(role === "admin" ? "/admin" : "/");
    };

    return (
        <AuthTemplate>
        <LoginForm onSubmit={handleLogin} />
        </AuthTemplate>
    );
}
export default LoginPage;