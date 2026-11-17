package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;

public record MundoRequest(
    @NotBlank String valor,
    @NotBlank String nombre){}
