import AuthTemplate from "../components/templates/AuthTemplate";
import LoginForm from "../components/organisms/LoginForm";

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