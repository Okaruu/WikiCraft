package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.ItemRequest;
import cl.duoc.wikicraft_api.dto.ItemResponse;
import cl.duoc.wikicraft_api.model.Item;
import cl.duoc.wikicraft_api.repository.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional //(readOnly = true)
public class ItemService {

    private final ItemRepository repo;

    public List<ItemResponse> listar() {
        return repo.findAll().stream().map(ItemResponse::from).toList();
    }

    public ItemResponse obtener(Long id) {
        return ItemResponse.from(buscar(id));
    }

    @Transactional
    public ItemResponse crear(ItemRequest req) {
        if (repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un item con ese valor");
        Item i = new Item();
        copiar(req, i);
        return ItemResponse.from(repo.save(i));
    }

    @Transactional
    public ItemResponse actualizar(Long id, ItemRequest req) {
        Item i = buscar(id);
        if (!i.getValor().equals(req.valor()) && repo.existsByValor(req.valor()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un item con ese valor");
        copiar(req, i);
        return ItemResponse.from(repo.save(i));
    }

    @Transactional
    public void eliminar(Long id) {
        repo.delete(buscar(id));
        repo.flush();
    }

    private void copiar(ItemRequest req, Item i) {
        i.setValor(req.valor());
        i.setNombre(req.nombre());
        i.setImagen(req.imagen());
        i.setInformacion(req.informacion());
        i.setAtributos(req.atributos());
    }

    private Item buscar(Long id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Item no encontrado"));
    }
}
