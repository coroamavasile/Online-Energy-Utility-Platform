package ro.tuc.ds2020.controllers;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.RecordDTO;
import ro.tuc.ds2020.dtos.SensorDateDTO;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.services.SensorService;

import java.util.UUID;

@RestController
@RequestMapping("/sensor")
@CrossOrigin
public class SensorController {
    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @GetMapping
    public ResponseEntity findAllSensors(){
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.findAll());
    }

    @GetMapping("/device")
    public ResponseEntity getSensorByDeviceId(@RequestParam UUID deviceId){
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.getSensorByDeviceId(deviceId));
    }


    @GetMapping("/get")
    public ResponseEntity findSensorById(@RequestParam UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.findSensorById(id));
    }

    @PostMapping
    public ResponseEntity saveNewSensor(@RequestBody Sensor sensor)
    {
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.save(sensor));
    }

    @DeleteMapping()
    public ResponseEntity deleteSensorById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.delete(id));
    }

    @PutMapping()
    public ResponseEntity updateDeviceById(@RequestParam UUID id, @RequestBody Sensor dto) {
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.update(id,dto));
    }

    @PostMapping("/record")
    public ResponseEntity addRecordBySensorId(@RequestParam UUID sensorId, @RequestBody RecordDTO recordDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(sensorService.addRecordBySensorId(sensorId,recordDTO));
    }

    @GetMapping("/records")
    public ResponseEntity findRecordsBySensorId(@RequestParam UUID sensorId) {

        return ResponseEntity.status(HttpStatus.OK).body(sensorService.findRecordsBySensorId(sensorId));
    }

    @PostMapping("/records/date")
    public ResponseEntity findRecordsBySensorIdAndDate(@RequestBody SensorDateDTO sensorDateDTO) {

        return ResponseEntity.status(HttpStatus.OK).body(sensorService.findRecordsBySensorIdAndDate(sensorDateDTO));
    }
}
