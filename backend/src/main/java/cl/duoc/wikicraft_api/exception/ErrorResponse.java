package cl.duoc.wikicraft_api.exception;

import java.util.Map;

public record ErrorResponse(String mensaje, Map<String, String> errores) {
}
