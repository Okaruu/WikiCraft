package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.CofreItem;
import cl.duoc.wikicraft_api.model.Item;

public record ItemDeCofreResponse(String valor, String nombre, String imagen,
        String informacion, String atributos, String probabilidad) {

    public static ItemDeCofreResponse from(CofreItem c) {
        Item i = c.getItem();
        return new ItemDeCofreResponse(i.getValor(), i.getNombre(), i.getImagen(),
                i.getInformacion() == null ? "" : i.getInformacion(),
                i.getAtributos() == null ? "" : i.getAtributos(),
                c.getProbabilidad());
    }
}
