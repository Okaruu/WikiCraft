package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.CofreItemRequest;
import cl.duoc.wikicraft_api.dto.CofreItemResponse;
import cl.duoc.wikicraft_api.model.CofreItem;
import cl.duoc.wikicraft_api.model.Estructura;
import cl.duoc.wikicraft_api.model.Item;
import cl.duoc.wikicraft_api.repository.CofreItemRepository;
import cl.duoc.wikicraft_api.repository.EstructuraRepository;
import cl.duoc.wikicraft_api.repository.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional //(readOnly = true)
public class CofreItemService {

    private final CofreItemRepository repo;
    private final EstructuraRepository estructuraRepo;
    private final ItemRepository itemRepo;

    public List<CofreItemResponse> listar(Long estructuraId) {
        List<CofreItem> lista = (estructuraId == null) ? repo.findAll() : repo.findByEstructuraId(estructuraId);
        return lista.stream().map(CofreItemResponse::from).toList();
    }

    @Transactional
    public CofreItemResponse crear(CofreItemRequest req) {
        Estructura estructura = estructuraRepo.findById(req.estructuraId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "La estructura indicada no existe"));
        Item item = itemRepo.findById(req.itemId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "El item indicado no existe"));
        if (repo.existsByEstructuraIdAndItemId(req.estructuraId(), req.itemId()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ese item ya está en el cofre de esa estructura");

        CofreItem c = new CofreItem();
        c.setEstructura(estructura);
        c.setItem(item);
        c.setProbabilidad(req.probabilidad());
        return CofreItemResponse.from(repo.save(c));
    }

    @Transactional
    public CofreItemResponse actualizarProbabilidad(Long id, String probabilidad) {
        CofreItem c = repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro de cofre no encontrado"));
        c.setProbabilidad(probabilidad);
        return CofreItemResponse.from(repo.save(c));
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repo.existsById(id))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro de cofre no encontrado");
        repo.deleteById(id);
    }
}
