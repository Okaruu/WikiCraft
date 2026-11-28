import { useState } from "react";
import { Link } from "react-router-dom";

import FormField from "../molecules/FormField";
import BackButton from "../molecules/BackButton";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

import { validateEmail } from "../../utils/emailValidation";
import { validatePassword } from "../../utils/passwordValidation";
import { ADMIN_DOMAIN, isAdminEmail } from "../../utils/adminAccess";

function RegisterForm({ onSubmit, onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorCorreo = validateEmail(email);
        if (errorCorreo) {
            setError(errorCorreo);
            return;
        }

        if (isAdminEmail(email)) {
            setError(`Los correos ${ADMIN_DOMAIN} son solo para administradores.`);
            return;
        }

        const errorPassword = validatePassword(password);
        if (errorPassword) {
            setError(errorPassword);
            return;
        }

        if (password !== confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");
        setLoading(true);

        const errorCuenta = await onSubmit({ email, password });

        setLoading(false);
        if (errorCuenta) setError(errorCuenta);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
            {onBack && <BackButton onClick={onBack} />}

            <Text variant="h2">Crear cuenta</Text>

            <FormField
                id="reg-email"
                label="Correo"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <FormField
                id="reg-password"
                label="Contraseña"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <FormField
                id="reg-confirm"
                label="Repetir contraseña"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />

            {error && <Text className="login-error">{error}</Text>}

            <Button type="submit" className="btn" disabled={loading}>
                {loading ? "Registrando..." : "Registrarme"}
            </Button>

            <Link to="/login" className="login-alt-link">
                ¿Ya tienes cuenta? Inicia sesión
            </Link>
        </form>
    );
}

export default RegisterForm;