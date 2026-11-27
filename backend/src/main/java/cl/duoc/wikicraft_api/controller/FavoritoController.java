package cl.duoc.wikicraft_api.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import cl.duoc.wikicraft_api.dto.ItemResponse;
import cl.duoc.wikicraft_api.service.FavoritoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios/{usuarioId}/favoritos")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService service;

    @GetMapping
    public List<ItemResponse> listar(@PathVariable Long usuarioId, Authentication auth) {
        verificarDueno(usuarioId, auth);
        return service.listar(usuarioId);
    }

    @PostMapping("/{itemValor}")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse agregar(@PathVariable Long usuarioId, @PathVariable String itemValor, Authentication auth) {
        verificarDueno(usuarioId, auth);
        return service.agregar(usuarioId, itemValor);
    }

    @DeleteMapping("/{itemValor}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void quitar(@PathVariable Long usuarioId, @PathVariable String itemValor, Authentication auth) {
        verificarDueno(usuarioId, auth);
        service.quitar(usuarioId, itemValor);
    }

    private void verificarDueno(Long usuarioId, Authentication auth) {
        boolean esAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!esAdmin && !auth.getName().equals(String.valueOf(usuarioId)))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo puedes gestionar tus propios favoritos");
    }
}