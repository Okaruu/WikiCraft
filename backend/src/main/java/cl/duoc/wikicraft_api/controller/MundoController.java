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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.wikicraft_api.dto.MundoRequest;
import cl.duoc.wikicraft_api.dto.MundoResponse;
import cl.duoc.wikicraft_api.service.MundoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/api/mundos")
@RequiredArgsConstructor 
public class MundoController {
    private final MundoService service;

    @GetMapping
    public List<MundoResponse> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public MundoResponse obtener(@PathVariable Long id) { return service.obtener(id); } 

    @PostMapping 
    @ResponseStatus(HttpStatus.CREATED)
    public MundoResponse crear(@Valid @RequestBody MundoRequest req) {
        return service.crear(req); }
    
    @PutMapping("/{id}")
    public MundoResponse actualizar(@PathVariable Long id, @Valid @RequestBody MundoRequest req) {
        return service.actualizar(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }

}
