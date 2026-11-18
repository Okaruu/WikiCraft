package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CambiarRolRequest(
        @NotBlank @Pattern(regexp = "(?i)^(admin|user)$", message = "El rol debe ser admin o user") String role) {
}
