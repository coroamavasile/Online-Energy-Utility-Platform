package ro.tuc.ds2020.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SensorNotifDTO {
    private UUID clientId;
    private String sensorDescription;
    private Double maxSensor;
    private Double valCurenta;
}
