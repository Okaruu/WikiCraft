package cl.duoc.wikicraft_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.duoc.wikicraft_api.model.Mundo;

public interface MundoRepository extends JpaRepository<Mundo, Long> {
    boolean existsByValor(String valor);

}
