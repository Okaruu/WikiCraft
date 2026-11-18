package cl.duoc.wikicraft_api.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.wikicraft_api.dto.ItemResponse;
import cl.duoc.wikicraft_api.service.FavoritoService;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/favoritos")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService service;

    @GetMapping
    public List<ItemResponse> listar(@PathVariable Long usuarioId) {
        return service.listar(usuarioId);
    }

    @PostMapping("/{itemValor}")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse agregar(@PathVariable Long usuarioId, @PathVariable String itemValor) {
        return service.agregar(usuarioId, itemValor);
    }

    @DeleteMapping("/{itemValor}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void quitar(@PathVariable Long usuarioId, @PathVariable String itemValor) {
        service.quitar(usuarioId, itemValor);
    }
}