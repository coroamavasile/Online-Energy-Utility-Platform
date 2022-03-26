package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Device {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    private String description;

    private String address;

    private Double maximumEnergyConsumption;

    private Double avarageEnergyConsumption;


    @ManyToOne()
    @JoinColumn(name = "client_id")
    @JsonBackReference
    private Client client;

    @OneToOne(cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
    @JsonIgnore
    private Sensor sensor;

    @Override
    public String toString() {
        return "Device{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", maximumEnergyConsumption=" + maximumEnergyConsumption +
                ", avarageEnergyConsumption=" + avarageEnergyConsumption +
                ", client=" +
                ", sensor=" + sensor +
                '}';
    }
}
