package cl.duoc.wikicraft_api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import cl.duoc.wikicraft_api.model.CofreItem;
public interface CofreItemRepository extends JpaRepository<CofreItem, Long> {
    boolean existsByEstructuraIdAndItemId(Long estructuraId, Long itemId);
    void deleteByEstructuraId(Long estructuraId);
    @Override
    @EntityGraph(attributePaths = { "estructura", "item" })
    List<CofreItem> findAll();
    @EntityGraph(attributePaths = { "estructura", "item" })
    List<CofreItem> findByEstructuraId(Long estructuraId);
    @Query("select ci from CofreItem ci join fetch ci.item "
            + "where ci.estructura.valor = :valor order by ci.id")
    List<CofreItem> buscarCofrePorEstructura(@Param("valor") String valor);
}
