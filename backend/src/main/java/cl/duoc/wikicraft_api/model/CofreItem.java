package cl.duoc.wikicraft_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "cofreItems")
@AllArgsConstructor
@Getter 
@Setter 
@NoArgsConstructor
public class CofreItem {

    private Long id;


//Aqui iria el id del cofre y de los items
}
