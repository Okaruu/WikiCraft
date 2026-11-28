import { api } from "./api";

function mensajeError(r) {
    return r.data?.mensaje || "Ocurrió un error. Intenta de nuevo.";
}

function leerToken(token) {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const p = JSON.parse(atob(base64));
        return { id: p.sub, role: String(p.role).toLowerCase() };
    } catch {
        return { id: null, role: "user" };
    }
}

// Devuelve "" si salió bien, o el mensaje de error
export async function registrarCuenta({ email, password }) {
    const r = await api("/api/auth/registro", {
        method: "POST",
        body: { correo: email.trim().toLowerCase(), password },
    });
    return r.ok ? "" : mensajeError(r);
}

// Devuelve { error } o { sesion: { email, role, id, token } }
export async function iniciarSesion({ email, password }) {
    const correo = email.trim().toLowerCase();
    const r = await api("/api/auth/login", {
        method: "POST",
        body: { correo, password },
    });
    if (!r.ok || !r.data?.token) return { error: mensajeError(r) };
    const { id, role } = leerToken(r.data.token);
    return { sesion: { email: correo, role, id, token: r.data.token } };
}