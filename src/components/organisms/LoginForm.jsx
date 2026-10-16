import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";
import {
    ADMIN_DOMAIN,
    isAdminEmail,
    isValidAdminCode,
} from "../../utils/adminAccess";

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");

    const handleToggleAdmin = (e) => {
        setIsAdmin(e.target.checked);
        setCode("");
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
        setError("Completa todos los campos");
        return;
        }   

        if (isAdmin) {
            if (!isAdminEmail(email)) {
                setError(`El correo debe terminar en ${ADMIN_DOMAIN}`);
                return;
            }
            if (!isValidAdminCode(code)) {
                setError("Código de acceso incorrecto");
                return;
            }
        }

        setError("");
        onSubmit({ email, password, role: isAdmin ? "admin" : "user" });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isAdmin ? "Acceso administrador" : "Iniciar sesión"}</h2>

            <FormField
                id="email"
                label={isAdmin ? "Correo de administrador" : "Correo"}
                type="email"
                placeholder={isAdmin ? `usuario${ADMIN_DOMAIN}` : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {isAdmin && (
                <FormField
                    id="code"
                    label="Código de acceso"
                    type="password"
                    autoComplete="off"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            )}

            {error && <Text className="login-error">{error}</Text>}

            <Button type="submit">Entrar</Button>

            <div className="login-admin">
            <input
                id="admin"
                type="checkbox"
                checked={isAdmin}
                onChange={handleToggleAdmin}
            />
            <label htmlFor="admin">Iniciar como administrador</label>
            </div>
        </form>
    );
}

export default LoginForm;