package ro.tuc.ds2020.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.services.DeviceService;

import java.util.UUID;

@RestController
@RequestMapping("/device")
@CrossOrigin
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public ResponseEntity findAllDevices(){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.findAll());
    }

    @GetMapping("/description")
    public ResponseEntity findByDescription(@RequestParam String description){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.findByDescription(description));
    }

    @GetMapping("/withoutclient")
    public ResponseEntity findAllDevicesWithoutClient(){
        System.out.println("1");
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.findDeviceWithoutClient());
    }

    @GetMapping("/get")
    public ResponseEntity getDeviceById(@RequestParam UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.getDeviceById(id));
    }

    @PostMapping
    public ResponseEntity saveNewDevice(@RequestBody Device device)
    {
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.save(device));
    }

    @DeleteMapping()
    public ResponseEntity deleteDeviceById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.delete(id));
    }

    @PutMapping()
    public ResponseEntity updateDeviceById(@RequestParam UUID id, @RequestBody Device dto) {
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.update(id,dto));
    }

    @PutMapping("/add")
    public ResponseEntity addSensorToDevice(@RequestParam UUID idDevice, @RequestParam UUID idSensor) {

        return ResponseEntity.status(HttpStatus.OK).body(deviceService.addSensor(idDevice,idSensor));
    }

    @PutMapping("/detach")
    public ResponseEntity detachSensorByDeviceId(@RequestParam UUID idDevice) {

        return ResponseEntity.status(HttpStatus.OK).body(deviceService.detachSensorByDeviceId(idDevice));
    }



}
