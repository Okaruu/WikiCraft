export const zonasOverworld = [
    { valor: "aldea", nombre: "Aldea" },
    { valor: "mansion_bosque", nombre: "Mansión del Bosque" },
    { valor: "iglu", nombre: "Iglú" },
    { valor: "piramide_desierto", nombre: "Pirámide del Desierto" },
    { valor: "piramide_jungla", nombre: "Pirámide de la Jungla" },
    { valor: "puesto_saqueadores", nombre: "Puesto de Saqueadores" },
    { valor: "portal_derruido", nombre: "Portal Derruido" },
    { valor: "mazmorra", nombre: "Mazmorra" },
    { valor: "mina_abandonada", nombre: "Mina Abandonada" },
    { valor: "stronghold", nombre: "Stronghold (Fortaleza del End)" },
    { valor: "ciudad_ancestral", nombre: "Ciudad Ancestral" },
    { valor: "ruinas_oceanicas", nombre: "Ruinas Oceánicas" },
    { valor: "naufragio", nombre: "Naufragio" }
];

export const zonasNether = [
    { valor: "bastion_piglin", nombre: "Bastión Piglin" },
    { valor: "fortaleza_nether", nombre: "Fortaleza del Nether" }
];

export const zonasEnd = [
    { valor: "ciudad_end", nombre: "Ciudad del End" }
];

export const zonasPorMundo = { overworld: zonasOverworld, nether: zonasNether, end: zonasEnd };
export const todasLasZonas = [...zonasEnd, ...zonasNether, ...zonasOverworld];