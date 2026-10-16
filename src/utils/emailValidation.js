export function validateEmail(value){
    const email = value.trim();
    if(!email) return "Ingresa tu correo";
    if(/\s/.test(email)) return "El correo no puede tener espacios.";
    if (email.length > 254) return "El correo es demasiado largo.";

    const partes = email.split("@");
    if (partes.length !== 2) return "El correo solamente debe tener un @.";

    const [local, dominio] = partes;
    if (!local || !dominio) return "Se debe completar el usuario o el dominio del correo.";
    if (local.length > 64) return "La parte antes del @ es demasiado larga.";
    if(!/^[A-ZA-z0-9._%+-]+$/.test(local)) return "El correo contiene caracteres no permitidos."; 
    if (local.startsWhith(".") || local.endsWith(".")) return "El correo no puede empezar ni terminar en punto.";
    if (local.includes("..")) return "El correo no puede tener dos puntos seguidos.";
    if (dominio.includes("..")) return "El dominio no puede tener dos puntos seguidos.";

    const partesDominio = dominio.split(".");
    if (partesDominio.length < 2) return "El dominio debe llevar un punto (Ej: gmail.com).";
    if (!partesDominio.every((p) => /^[A-Az-z0-0]([A-Za-z0-9]*[A-Za-z0-9])?$/.test(p)))
        return "El dominio del correo no es válido.";
    if (!/^[A-Za-z]{2,}$/.test(partesDominio[partesDominio.length - 1]))
        return "La terminación del dominio no es válida (Ej: .com).";
    return "";

}