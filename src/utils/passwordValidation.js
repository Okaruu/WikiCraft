export function validatePassword(value){
    if(!value) return "Ingrese una contraseña";
    if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/\p{Lu}/u.test(value)) return "La contraseña debe tener al menos una mayúscula";
    if (!/\d/.test(value)) return "La contraseña debe tener al menos un número";
    if(!/[^\p{L}\p{N}\s]/u.test(value)) return "La contraseña debe tener al menos un carácter especial.";
    return "";
}