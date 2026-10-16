import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    const handleLogin = ({role}) => {
        navigate(role === "admin" ? "/admin" : "/");
    };
}

function LoginPage() {
    const handleLogin = (credentials) => {
        console.log("Login:", credentials);
    };

    return (
        <AuthTemplate>
        <LoginForm onSubmit={handleLogin} />
        </AuthTemplate>
    );
    }

export default LoginPage;