package ro.tuc.ds2020.dtos;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SensorDateDTO {
    private String date;
    private UUID sensorId;
}
