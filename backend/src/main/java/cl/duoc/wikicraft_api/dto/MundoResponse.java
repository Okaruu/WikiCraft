package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.Mundo;

public record MundoResponse(Long id, String valor, String nombre) {
    public static MundoResponse from (Mundo m) {
        return new MundoResponse(m.getId(),m.getValor(), m.getNombre());
    }


}
