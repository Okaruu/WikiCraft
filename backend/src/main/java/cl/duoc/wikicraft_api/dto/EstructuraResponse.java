package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.Estructura;
public record EstructuraResponse(Long id, String valor, String nombre, Long mundoId, String mundoValor) {

    public static EstructuraResponse from(Estructura e) {
        return new EstructuraResponse(
                e.getId(), e.getValor(), e.getNombre(),
                e.getMundo().getId(), e.getMundo().getValor());
    }
}