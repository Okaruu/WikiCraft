package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.CofreItem;

public record CofreItemResponse(Long id, Long estructuraId, String estructuraValor,
        Long itemId, String itemValor, String itemNombre, String probabilidad) {

    public static CofreItemResponse from(CofreItem c) {
        return new CofreItemResponse(c.getId(),
                c.getEstructura().getId(), c.getEstructura().getValor(),
                c.getItem().getId(), c.getItem().getValor(), c.getItem().getNombre(),
                c.getProbabilidad());
    }
}