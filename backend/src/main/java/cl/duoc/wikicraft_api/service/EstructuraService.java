package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.EstructuraRequest;
import cl.duoc.wikicraft_api.dto.EstructuraResponse;
import cl.duoc.wikicraft_api.dto.ItemDeCofreResponse;
import cl.duoc.wikicraft_api.model.Estructura;
import cl.duoc.wikicraft_api.model.Mundo;
import cl.duoc.wikicraft_api.repository.CofreItemRepository;
import cl.duoc.wikicraft_api.repository.EstructuraRepository;
import cl.duoc.wikicraft_api.repository.MundoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
@Transactional
public class EstructuraService {

    private final EstructuraRepository repo;
    private final MundoRepository mundoRepo;
    private final CofreItemRepository cofreRepo;

    public List<EstructuraResponse> listar(String mundoValor) {
        List<Estructura> lista = (mundoValor == null || mundoValor.isBlank())
                ? repo.findAll()
                : repo.findByMundoValorOrderByNombreAsc(mundoValor);
        return lista.stream().map(EstructuraResponse::from).toList();
    }

    public EstructuraResponse obtener(Long id) {
        return EstructuraResponse.from(buscar(id));
    }
    

    public List<ItemDeCofreResponse> cofre(String valor) {
    if (repo.findByValor(valor).isEmpty())
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Estructura no encontrada");
    return cofreRepo.buscarCofrePorEstructura(valor).stream().map(ItemDeCofreResponse::from).toList();
}

    @Transactional
    public EstructuraResponse crear(EstructuraRequest req) {
        if (repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una estructura con ese valor");
        if (repo.existsByNombre(req.nombre()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una estructura con ese nombre");
        Estructura e = new Estructura();
        e.setValor(req.valor());
        e.setNombre(req.nombre());
        e.setMundo(buscarMundo(req.mundoId()));
        return EstructuraResponse.from(repo.save(e));
    }

    @Transactional
    public EstructuraResponse actualizar(Long id, EstructuraRequest req) {
        Estructura e = buscar(id);
        if (!e.getValor().equals(req.valor()) && repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una estructura con ese valor");
        if (!e.getNombre().equals(req.nombre()) && repo.existsByNombre(req.nombre()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una estructura con ese nombre");
        e.setValor(req.valor());
        e.setNombre(req.nombre());
        e.setMundo(buscarMundo(req.mundoId()));
        return EstructuraResponse.from(repo.save(e));
    }

    @Transactional
    public void eliminar(Long id) {
        Estructura e = buscar(id);
        cofreRepo.deleteByEstructuraId(id);
        repo.delete(e);
        repo.flush();
    }
    private Estructura buscar(Long id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Estructura no encontrada"));
    }

    private Mundo buscarMundo(Long mundoId) {
        return mundoRepo.findById(mundoId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "El mundo indicado no existe"));
    }
}
