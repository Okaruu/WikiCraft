package cl.duoc.wikicraft_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        @NotBlank @Size(max = 150)
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}$",
                message = "El correo no es válido") String correo,

        @NotBlank @Size(max = 72)
        @Pattern(regexp = "^(?=.*\\p{Lu})(?=.*\\d)(?=.*[^\\p{L}\\p{N}\\s]).{8,}$",
                message = "Mínimo 8 caracteres, con una mayúscula, un número y un carácter especial") String password) {
}