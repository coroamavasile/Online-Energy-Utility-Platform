package ro.tuc.ds2020.services;

import org.springframework.stereotype.Component;
import ro.tuc.ds2020.dtos.RecordDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.SensorDateDTO;
import ro.tuc.ds2020.entities.Sensor;

import java.util.List;
import java.util.UUID;

@Component
public interface SensorService {
    Sensor save(Sensor dto);
    Sensor delete(UUID id);
    Sensor update(UUID id, Sensor dto);
    List<Sensor> findAll();
//    List<Sensor> findAllWithoutDevice();
    Object findSensorById(UUID id);
    Sensor addRecordBySensorId(UUID id, RecordDTO recordDTO) throws Exception;
    SensorDTO getSensorByDeviceId(UUID deviceId);

    List<RecordDTO> findRecordsBySensorId(UUID sensorId);

    List<RecordDTO> findRecordsBySensorIdAndDate(SensorDateDTO sensorDateDTO);
}
