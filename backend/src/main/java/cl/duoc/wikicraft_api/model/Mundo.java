package cl.duoc.wikicraft_api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "mundos")
@AllArgsConstructor 
@Getter 
@Setter 
@NoArgsConstructor 
public class Mundo {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String valor;

    @Column(nullable = false, unique = true, length =  50)
    private String nombre;

    //Conexion con estructura
}
