package cl.duoc.wikicraft_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.duoc.wikicraft_api.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByValor(String valor);
    Optional<Item> findByValor(String valor);
}
