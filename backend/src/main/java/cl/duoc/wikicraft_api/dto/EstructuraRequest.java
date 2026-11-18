package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EstructuraRequest(
        @NotBlank @Size(max = 50) String valor,
        @NotBlank @Size(max = 50) String nombre,
        @NotNull Long mundoId) {
}