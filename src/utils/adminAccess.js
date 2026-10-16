import { validateEmail } from "./emailValidation";

export const ADMIN_DOMAIN = "@wikicraft.wk.com";

export const ADMIN_CODE = "WIKI-2026";

export function isAdminEmail(email) {
    return email.trim().toLowerCase().endsWith(ADMIN_DOMAIN);
}

export function validateAdminEmail(value){
    const base = validateEmail(value);
    if (base) return base;
    if (!isAdminEmail(value)) return 'El correo debe terminar en ${ADMIN_DOMAIN}';
    return "";
}

export function isValidAdminCode(code) {
    return code.trim() === ADMIN_CODE;
}