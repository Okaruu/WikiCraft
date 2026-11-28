const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const KEY_SESION = "wikicraft:sesion";

function leerToken() {
    try {
        return JSON.parse(localStorage.getItem(KEY_SESION))?.token ?? null;
    } catch {
        return null;
    }
}

export async function api(ruta, { method = "GET", body } = {}) {
    const token = leerToken();
    let res;

    try {
        res = await fetch(`${API_URL}${ruta}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        return {
            ok: false,
            status: 0,
            data: {
                mensaje:
                    "No se pudo conectar con el servidor. Si estaba inactivo, espera un minuto e intenta de nuevo.",
            },
        };
    }

    let data = null;
    try {
        data = await res.json();
    } catch {
    }

    return { ok: res.ok, status: res.status, data };
}