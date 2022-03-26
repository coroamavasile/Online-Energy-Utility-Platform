package ro.tuc.ds2020.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.ClientDTO;
import ro.tuc.ds2020.dtos.NotificationClientDTO;
import ro.tuc.ds2020.entities.Client;
import ro.tuc.ds2020.services.ClientService;
import ro.tuc.ds2020.services.NotificationClientService;

import java.util.UUID;

@RestController
@RequestMapping("/client")
@CrossOrigin
public class ClientController {
    @Autowired
    private ClientService clientService;

    @Autowired
    private NotificationClientService notificationClientService;

    @GetMapping()
    public ResponseEntity findAllClients(){
        return ResponseEntity.status(HttpStatus.OK).body(clientService.findAll());
    }

    @GetMapping("/notification")
    public ResponseEntity findAllNotificationByClientId(@RequestParam UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(notificationClientService.findAllByClientId(id));
    }

    @GetMapping("/get")
    public ResponseEntity getClientById(@RequestParam UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getClientById(id));
    }

    @PostMapping
    public ResponseEntity saveNewClient(@RequestBody ClientDTO dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(clientService.save(dto));
    }

    @DeleteMapping()
    public ResponseEntity deleteClientById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.delete(id));
    }

    @PutMapping()
    public ResponseEntity updateClientById(@RequestParam UUID id, @RequestBody Client dto) {
        System.out.println(dto);
        return ResponseEntity.status(HttpStatus.OK).body(clientService.update(id,dto));
    }

    @PutMapping("/add")
    public ResponseEntity addDevice(@RequestParam UUID idClient, @RequestParam UUID idDevice) {
        System.out.println("controller");
        System.out.println(idClient);
        System.out.println(idClient);
        System.out.println("controller out");
        return ResponseEntity.status(HttpStatus.OK).body(clientService.addDevice(idClient,idDevice));
    }

    @GetMapping("/device")
    public ResponseEntity getDevices(@RequestParam UUID idClient) {

        return ResponseEntity.status(HttpStatus.OK).body(clientService.getDevicesByClientId(idClient));
    }

    @GetMapping("/sensor")
    public ResponseEntity getSensors(@RequestParam UUID idClient) {

        return ResponseEntity.status(HttpStatus.OK).body(clientService.getSensorsByClientId(idClient));
    }


}
