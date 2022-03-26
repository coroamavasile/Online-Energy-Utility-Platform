package ro.tuc.ds2020.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO {
    private UUID id;

    private String description;

    private String address;

    private Double maximumEnergyConsumption;

    private Double avarageEnergyConsumption;

    private UUID  clientId;

    private UUID sensorId;

}
