package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.MundoRequest;
import cl.duoc.wikicraft_api.dto.MundoResponse;
import cl.duoc.wikicraft_api.model.Mundo;
import cl.duoc.wikicraft_api.repository.MundoRepository;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class MundoService {
    private final MundoRepository repo;

    public List<MundoResponse> listar() {
        return repo.findAll().stream().map(MundoResponse::from).toList();
    }

    public MundoResponse obtener(Long id) {
        return MundoResponse.from(buscar(id));
    }

    public MundoResponse crear(MundoRequest req) {
        if (repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un mundo con este valor");
        Mundo m = new Mundo();
        m.setValor(req.valor());
        m.setNombre(req.nombre());
        return MundoResponse.from(repo.save(m));
    }

    public MundoResponse actualizar(Long id, MundoRequest req) {
        Mundo m = buscar(id);
        if (!m.getValor().equals(req.valor()) && repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un mundo con este valor");
        m.setValor(req.valor());
        m.setNombre(req.nombre());
        return MundoResponse.from(repo.save(m));
    }

    public void eliminar(Long id) {
        repo.delete(buscar(id));
    }

    private Mundo buscar(Long id) {
        return repo.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Mundo no encontrado"));
        
    }

}
