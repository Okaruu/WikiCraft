package cl.duoc.wikicraft_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import cl.duoc.wikicraft_api.dto.EstructuraRequest;
import cl.duoc.wikicraft_api.dto.EstructuraResponse;
import cl.duoc.wikicraft_api.dto.ItemDeCofreResponse;
import cl.duoc.wikicraft_api.service.EstructuraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estructuras")
@RequiredArgsConstructor
public class EstructuraController {

    private final EstructuraService service;

    @GetMapping
    public List<EstructuraResponse> listar(@RequestParam(required = false) String mundo) {
        return service.listar(mundo);
    }

    @GetMapping("/{id}")
    public EstructuraResponse obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @GetMapping("/{valor}/cofre")
    public List<ItemDeCofreResponse> cofre(@PathVariable String valor) {
        return service.cofre(valor);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EstructuraResponse crear(@Valid @RequestBody EstructuraRequest req) {
        return service.crear(req);
    }

    @PutMapping("/{id}")
    public EstructuraResponse actualizar(@PathVariable Long id, @Valid @RequestBody EstructuraRequest req) {
        return service.actualizar(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}