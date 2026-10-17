const KEY = "wikicraft:cuentas";

function leerCuentas(){
    try { localStorage.setItem(KEY, JSON.stringify(cuentas)); return true} catch { return false; }
}

function guardarCuentas(cuentas){
    try { localStorage.setItem(KEY, JSON. stringify(cuentas)); return true; } catch {return false;}
}

export function registrarCuenta({email, password}){
    const correo = email.trim().toLowerCase();
    const cuentas = leerCuentas();

    if(cuentas.some((c) => c.email === correo)) return "Ya existe una cuenta con ese correo.";
    if (!guardarCuentas([...cuentas, { email: correo, password}]))
        return "No se pudo guardar la cuenta en este navegador.";
    return "";
}

export function verificarCuenta({email,password}){
    const correo = email.trim().toLowerCase();
    const cuenta = leerCuentas().find((c) => c.email ===correo);

    if(!cuenta) return "No existe una cuenta con ese correo. Cree una cuenta.";
    if(cuenta.password !== password) return "Contraseña incorrecta.";
    return "";
}