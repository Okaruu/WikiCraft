export const formatearNombre = (valor) =>
    valor.replaceAll("_", " ").replace(/^./, (c) => c.toUpperCase());