package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.ItemResponse;
import cl.duoc.wikicraft_api.model.Favorito;
import cl.duoc.wikicraft_api.model.Item;
import cl.duoc.wikicraft_api.model.Usuario;
import cl.duoc.wikicraft_api.repository.FavoritoRepository;
import cl.duoc.wikicraft_api.repository.ItemRepository;
import cl.duoc.wikicraft_api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional //(readOnly = true)
public class FavoritoService {

    private final FavoritoRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final ItemRepository itemRepo;

    public List<ItemResponse> listar(Long usuarioId) {
        verificarUsuario(usuarioId);
        return repo.findByUsuarioId(usuarioId).stream()
                .map(f -> ItemResponse.from(f.getItem())).toList();
    }

    @Transactional
    public ItemResponse agregar(Long usuarioId, String itemValor) {
        Usuario u = verificarUsuario(usuarioId);
        Item item = itemRepo.findByValor(itemValor).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Item no encontrado"));
        if (repo.findByUsuarioIdAndItemValor(usuarioId, itemValor).isEmpty()) {
            Favorito f = new Favorito();
            f.setUsuario(u);
            f.setItem(item);
            repo.save(f);
        }
        return ItemResponse.from(item);
    }

    @Transactional
    public void quitar(Long usuarioId, String itemValor) {
        verificarUsuario(usuarioId);
        repo.findByUsuarioIdAndItemValor(usuarioId, itemValor).ifPresent(repo::delete);
    }

    private Usuario verificarUsuario(Long usuarioId) {
        return usuarioRepo.findById(usuarioId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }
}