package ro.tuc.ds2020.dtos;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RecordDTO {
    private Long timestamp = new Timestamp(System.currentTimeMillis()).getTime();
    private Double energyConsumption;
}
