import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";
import { validateEmail } from "../../utils/emailValidation";
import {
    ADMIN_DOMAIN,
    validateAdminEmail,
    isValidAdminCode,
} from "../../utils/adminAccess";

function LoginForm({ onSubmit, onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");

    const handleToggleAdmin = () => {
        setIsAdmin((a) => !a);
        setCode("");
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errorCorreo = isAdmin ? validateAdminEmail(email) : validateEmail(email);
        if (errorCorreo) { setError(errorCorreo); return; }
        if (!password) { setError("Ingresa tu contraseña"); return; }
        if (isAdmin && !isValidAdminCode(code)) { setError("Código de acceso incorrecto"); return; }

        setError("");
        onSubmit({ email: email.trim().toLowerCase(), password, role: isAdmin ? "admin" : "user" });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
            {onBack && (
                <button type="button" className="login-back" onClick={onBack} aria-label="Volver">
                    ←
                </button>
            )}
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

            <button type="button" className="login-admin-link" onClick={handleToggleAdmin}>
                {isAdmin ? "Iniciar como usuario" : "Iniciar como administrador"}
            </button>
            
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

        </form>
    );
}

export default LoginForm;