package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sensor {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    private String description;

    private Double maximumValue;

    private UUID deviceId;

//    @OneToMany(targetEntity = Record.class, mappedBy = "sensor",  cascade = CascadeType.ALL)
    @OneToMany(targetEntity = Record.class, mappedBy = "sensor",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Record> records = new ArrayList<>();

    public void addRecord(Record record){
        records.add(record);
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", maximumValue=" + maximumValue +
                ", deviceId=" + deviceId +
                '}';
    }
}
