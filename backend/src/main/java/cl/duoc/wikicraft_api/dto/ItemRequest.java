package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ItemRequest(
        @NotBlank @Size(max = 100) String valor,
        @NotBlank @Size(max = 100) String nombre,
        @NotBlank @Size(max = 255) String imagen,
        String informacion,
        String atributos) {
}