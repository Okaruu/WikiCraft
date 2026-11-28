import { useState } from "react";
import { Link } from "react-router-dom";

import FormField from "../molecules/FormField";
import BackButton from "../molecules/BackButton";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

import { validateEmail } from "../../utils/emailValidation";
import { validatePassword } from "../../utils/passwordValidation";
import { ADMIN_DOMAIN, validateAdminEmail, isValidAdminCode } from "../../utils/adminAccess";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorCorreo = isAdmin ? validateAdminEmail(email) : validateEmail(email);
        if (errorCorreo) {
            setError(errorCorreo);
            return;
        }

        if (isAdmin) {
            const errorPassword = validatePassword(password);
            if (errorPassword) {
                setError(errorPassword);
                return;
            }
            if (!isValidAdminCode(code)) {
                setError("Código de acceso incorrecto");
                return;
            }
        } else if (!password) {
            setError("Ingresa tu contraseña");
            return;
        }

        setError("");

        const errorCuenta = await onSubmit({
            email: email.trim().toLowerCase(),
            password,
            role: isAdmin ? "admin" : "user",
        });

        if (errorCuenta) setError(errorCuenta);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
            {onBack && <BackButton onClick={onBack} />}

            <Text variant="h2">
                {isAdmin ? "Acceso administrador" : "Iniciar sesión"}
            </Text>

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

            <Button className="login-admin-link" onClick={handleToggleAdmin}>
                {isAdmin ? "Iniciar como usuario" : "Iniciar como administrador"}
            </Button>

            {error && <Text className="login-error">{error}</Text>}

            <Button type="submit" className="btn">
                Entrar
            </Button>

            {!isAdmin && (
                <Link to="/registro" className="login-alt-link">
                    ¿No tienes cuenta? Regístrate
                </Link>
            )}
        </form>
    );
}

export default LoginForm;