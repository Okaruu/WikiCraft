package cl.duoc.wikicraft_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "recetaIngredientes")
@AllArgsConstructor 
@Getter 
@Setter 
@NoArgsConstructor
public class RecetaIngrediente {


    private Long id;

    private String crafteo;
    //
    
}
