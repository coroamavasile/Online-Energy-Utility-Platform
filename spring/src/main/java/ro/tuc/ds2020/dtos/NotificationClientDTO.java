package ro.tuc.ds2020.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationClientDTO {
    private UUID id;

    private UUID sensorId;

    private UUID clientID;

    private String description;

    private Long timestamp;

    private String sensorName;
}
