package cl.duoc.wikicraft_api.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.wikicraft_api.dto.UsuarioResponse;
import cl.duoc.wikicraft_api.model.TipoUsuario;
import cl.duoc.wikicraft_api.model.Usuario;
import cl.duoc.wikicraft_api.repository.FavoritoRepository;
import cl.duoc.wikicraft_api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional //(readOnly = true)
public class UsuarioService {

    private final UsuarioRepository repo;
    private final FavoritoRepository favoritoRepo;

    public List<UsuarioResponse> listar() {
        return repo.findAll().stream().map(UsuarioResponse::from).toList();
    }

    public UsuarioResponse obtener(Long id) {
        return UsuarioResponse.from(buscar(id));
    }

    @Transactional
    public UsuarioResponse cambiarRol(Long id, String role) {
        Usuario u = buscar(id);
        u.setTipo(TipoUsuario.valueOf(role.trim().toUpperCase()));
        return UsuarioResponse.from(repo.save(u));
    }

    @Transactional
    public void eliminar(Long id) {
        Usuario u = buscar(id);
        favoritoRepo.deleteByUsuarioId(id);
        repo.delete(u);
    }

    private Usuario buscar(Long id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }
}
