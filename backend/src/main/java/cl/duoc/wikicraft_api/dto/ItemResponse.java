package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.Item;

public record ItemResponse(Long id, String valor, String nombre, String imagen,
        String informacion, String atributos) {

    public static ItemResponse from(Item i) {
        return new ItemResponse(i.getId(), i.getValor(), i.getNombre(), i.getImagen(),
                i.getInformacion() == null ? "" : i.getInformacion(),
                i.getAtributos() == null ? "" : i.getAtributos());
    }
}
