package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ProbabilidadRequest(
        @NotBlank @Pattern(regexp = "^\\d{1,3}(\\.\\d+)?%$",
                message = "Debe tener formato como 60% o 12.5%") String probabilidad) {
}
