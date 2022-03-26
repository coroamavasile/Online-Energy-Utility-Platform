package ro.tuc.ds2020.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2020.entities.Sensor;

import java.util.UUID;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, UUID> {
    Sensor findSensorByDescription(String description);
    Sensor findSensorByDeviceId(UUID id);
//    Sensor findSensorById(UUID id);
}
