package cl.duoc.wikicraft_api.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import cl.duoc.wikicraft_api.model.Estructura;
public interface EstructuraRepository extends JpaRepository<Estructura, Long> {

    boolean existsByValor(String valor);
    boolean existsByNombre(String nombre);
    Optional<Estructura> findByValor(String valor);
    List<Estructura> findByMundoValorOrderByNombreAsc(String mundoValor);
}
