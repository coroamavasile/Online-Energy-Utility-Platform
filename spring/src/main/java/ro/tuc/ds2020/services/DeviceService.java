package ro.tuc.ds2020.services;


import com.googlecode.jsonrpc4j.JsonRpcService;
import org.springframework.stereotype.Component;
import ro.tuc.ds2020.entities.Device;

import java.util.*;
@Component
public interface DeviceService {
    Device save(Device dto);
    Device delete(UUID id);
    Device update (UUID id, Device dto);
    Device addSensor(UUID idDevice, UUID idSensor);
    List<Device> findAll();
    List<Device> findDeviceWithoutClient();
    Device findByDescription(String description);

    Device getDeviceById(UUID id);

    Device detachSensorByDeviceId(UUID idDevice);
}
