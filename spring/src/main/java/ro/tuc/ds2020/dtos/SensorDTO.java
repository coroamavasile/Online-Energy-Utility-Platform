package ro.tuc.ds2020.dtos;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SensorDTO {
    private UUID id;
    private String description;
    private Double maximumValue;
    private UUID deviceId;

}
