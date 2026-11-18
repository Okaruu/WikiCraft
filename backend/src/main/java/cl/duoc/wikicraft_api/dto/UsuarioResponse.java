package cl.duoc.wikicraft_api.dto;

import cl.duoc.wikicraft_api.model.Usuario;

public record UsuarioResponse(Long id, String correo, String role) {

    public static UsuarioResponse from(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getCorreo(), u.getTipo().name().toLowerCase());
    }
}
