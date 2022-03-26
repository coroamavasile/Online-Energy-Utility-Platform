package ro.tuc.ds2020.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.NotificationClientDTO;
import ro.tuc.ds2020.entities.NotificationClient;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.repositories.NotificationClientRepository;
import ro.tuc.ds2020.repositories.SensorRepository;
import ro.tuc.ds2020.services.NotificationClientService;
import ro.tuc.ds2020.services.SensorService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationClientServiceImpl implements NotificationClientService {

    @Autowired
    private NotificationClientRepository notificationClientRepository;

    @Autowired
    private SensorRepository sensorService;

    @Override
    @Transactional
    public NotificationClient save(NotificationClient notificationClient) {

        return notificationClientRepository.save(notificationClient);
    }

    @Override
    @Transactional
    public List<NotificationClient> findAll() {
        List<NotificationClient> notificationClients = new ArrayList<>();
        notificationClientRepository.findAll().forEach(obj -> notificationClients.add(obj));

        return notificationClients;
    }

    @Override
    @Transactional
    public List<NotificationClientDTO> findAllByClientId(UUID id) {
        List<NotificationClient> notifications = findAll();

        List<NotificationClientDTO> result = new ArrayList<>();

        for(NotificationClient notif: notifications)
        {
            Sensor sensor = sensorService.findById(notif.getSensorId()).get();
            if(notif.getClientID().equals(id))
                result.add(new NotificationClientDTO(notif.getId(),notif.getSensorId(),notif.getClientID(),
                    notif.getDescription(),notif.getTimestamp(),sensor.getDescription()));
        }

        return result;
    }

}
