package ro.tuc.ds2020.services;


import org.springframework.stereotype.Component;
import ro.tuc.ds2020.dtos.ClientDTO;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.entities.Client;

import java.util.List;
import java.util.UUID;

@Component
public interface ClientService {
    Client save(ClientDTO dto);
    Client delete(UUID id);
    Client update (UUID id, Client dto);
    ClientDTO getClientById(UUID id);
    List<Client> findAll();
    Client addDevice(UUID idClient,UUID idDevice);
    List<DeviceDTO> getDevicesByClientId(UUID idClient);

    List<SensorDTO> getSensorsByClientId(UUID idClient);
}
