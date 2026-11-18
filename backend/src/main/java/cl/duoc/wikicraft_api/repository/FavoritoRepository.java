package cl.duoc.wikicraft_api.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import cl.duoc.wikicraft_api.model.Favorito;
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    @EntityGraph(attributePaths = "item")
    List<Favorito> findByUsuarioId(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndItemValor(Long usuarioId, String itemValor);
    void deleteByUsuarioId(Long usuarioId);
}
