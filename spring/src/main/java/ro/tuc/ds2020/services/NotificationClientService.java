package ro.tuc.ds2020.services;

import org.springframework.stereotype.Component;
import ro.tuc.ds2020.dtos.NotificationClientDTO;
import ro.tuc.ds2020.entities.NotificationClient;

import java.util.*;

@Component
public interface NotificationClientService {
    NotificationClient save(NotificationClient notificationClient);
    List<NotificationClient> findAll();
    List<NotificationClientDTO> findAllByClientId(UUID id);
}
