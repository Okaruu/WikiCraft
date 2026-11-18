package cl.duoc.wikicraft_api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import cl.duoc.wikicraft_api.dto.CofreItemRequest;
import cl.duoc.wikicraft_api.dto.CofreItemResponse;
import cl.duoc.wikicraft_api.dto.ProbabilidadRequest;
import cl.duoc.wikicraft_api.service.CofreItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cofre-items")
@RequiredArgsConstructor
public class CofreItemController {

    private final CofreItemService service;

    @GetMapping
    public List<CofreItemResponse> listar(@RequestParam(required = false) Long estructuraId) {
        return service.listar(estructuraId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CofreItemResponse crear(@Valid @RequestBody CofreItemRequest req) {
        return service.crear(req);
    }

    @PutMapping("/{id}")
    public CofreItemResponse actualizar(@PathVariable Long id, @Valid @RequestBody ProbabilidadRequest req) {
        return service.actualizarProbabilidad(id, req.probabilidad());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
