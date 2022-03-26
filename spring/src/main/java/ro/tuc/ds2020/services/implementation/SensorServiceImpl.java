package ro.tuc.ds2020.services.implementation;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.RecordDTO;
import ro.tuc.ds2020.dtos.SensorDTO;
import ro.tuc.ds2020.dtos.SensorDateDTO;
import ro.tuc.ds2020.dtos.SensorNotifDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.NotificationClient;
import ro.tuc.ds2020.entities.Record;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.RecordRepository;
import ro.tuc.ds2020.repositories.SensorRepository;
import ro.tuc.ds2020.services.NotificationClientService;
import ro.tuc.ds2020.services.SensorService;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private SimpMessagingTemplate tamplate;

    @Autowired
    private NotificationClientService notificationClientService;

    public SensorServiceImpl(SensorRepository sensorRepository1) {
        this.sensorRepository = sensorRepository1;
    }

    @Override
    @Transactional
    public Sensor save(Sensor dto) {
        return sensorRepository.save(dto);
    }

    @Override
    @Transactional
    public Sensor delete(UUID id) {
        Sensor sensor = sensorRepository.findById(id).get();
        List<Device> devices = new ArrayList<>();
        deviceRepository.findAll().forEach(device -> devices.add(device));

        for(Device d:devices){
            try{
                if(d.getSensor().equals(sensor)){
                    d.setSensor(null);
                    deviceRepository.save(d);
                    break;
                }
            }
            catch (Exception e){

            }
        }

        sensorRepository.delete(sensor);
        return sensor;
    }

    @Override
    @Transactional
    public Sensor update(UUID id, Sensor dto) {
        Sensor sensor = sensorRepository.findById(id).get();

        if(dto.getDescription()!=null){
            sensor.setDescription(dto.getDescription());
        }

        if(dto.getMaximumValue()!=null){
            sensor.setMaximumValue(dto.getMaximumValue());
        }

        if(dto.getRecords()!=null){
            sensor.setRecords(dto.getRecords());
        }
        System.out.println(sensor.toString());
        return sensor;
    }

    @Override
    @Transactional
    public List<Sensor> findAll() {
        List<Sensor> sensors = new ArrayList<>();
        sensorRepository.findAll().forEach(sensor -> sensors.add(sensor));
        System.out.println(sensors.toString());
        return sensors;
    }


    @Override
    @Transactional
    public Object findSensorById(UUID id) {
        Sensor sensor = sensorRepository.findById(id).get();
        System.out.println(sensor);
        return sensor;
    }

    @Override
    @Transactional
    public Sensor addRecordBySensorId(UUID id, RecordDTO recordDTO) throws  Exception{
        System.out.println(recordDTO.toString());
        Sensor sensor = sensorRepository.findById(id).get();

        Record record = new Record(null, recordDTO.getTimestamp(),recordDTO.getEnergyConsumption(),
                sensor);
        System.out.println(sensor);
        System.out.println("inainte de add");
        sensor.addRecord(record);
        System.out.println("ajunge aici");
        recordRepository.save(record);

        Double maxValue = sensor.getMaximumValue();
        List<RecordDTO> records = findRecordsBySensorId(id);

        if(records.size() > 2) {
            Double lastValue = records.get(records.size() - 2).getEnergyConsumption();
            Double crtValue = records.get(records.size() - 1).getEnergyConsumption();
            System.out.println("max value " + maxValue);
            System.out.println("last value " + lastValue);
            System.out.println("crt value " + crtValue);

            Device device = deviceRepository.findById(sensor.getDeviceId()).get();
            UUID idClient = device.getClient().getId();
//        Double valueTest =
//                1000 * (crtValue - lastValue)/(records.get(records.size() - 1).getTimestamp() - records.get(records.size() - 2).getTimestamp());
//        System.out.println(valueTest);
            if ((crtValue - lastValue) > maxValue) {
            SensorNotifDTO dtoo = new SensorNotifDTO(idClient,sensor.getDescription(),sensor.getMaximumValue(),(crtValue - lastValue));
                System.out.println("trimite notificare");
                notificationClientService.save(new NotificationClient(null,id,idClient,
                        "ALERT FOR SENSOR WITH ID" + id, record.getTimestamp()));
                tamplate.convertAndSend("/topic/socket/record",
                        dtoo);

            }
        }

        return sensor;
    }


    @Override
    @Transactional
    public SensorDTO getSensorByDeviceId(UUID deviceId) {
        Sensor sensor = sensorRepository.findSensorByDeviceId(deviceId);

        if(sensor == null){
            return null;
        }

        SensorDTO sensorDTO = new SensorDTO();
        sensorDTO.setDeviceId(deviceId);
        sensorDTO.setDescription(sensor.getDescription());
        sensorDTO.setId(sensor.getId());
        sensorDTO.setMaximumValue(sensor.getMaximumValue());
        return sensorDTO;
    }

    @Override
    @Transactional
    public List<RecordDTO> findRecordsBySensorId(UUID sensorId) {
        Sensor sensor = sensorRepository.findById(sensorId).get();
        List<Record> records = sensor.getRecords();
        List<RecordDTO> result = new ArrayList<>();
        for(Record rec: records){
            result.add(new RecordDTO(rec.getTimestamp(),rec.getEnergyConsumption()));
        }

        return result;
    }

    @Override
    @Transactional
    public List<RecordDTO> findRecordsBySensorIdAndDate(SensorDateDTO sensorDateDTO) {

        Sensor sensor = sensorRepository.findById(sensorDateDTO.getSensorId()).get();
        List<Record> records = sensor.getRecords();
        List<RecordDTO> results = new ArrayList<>();
        System.out.println(sensorDateDTO.getDate());
//        DateTimeFormatter  formatter = DateTimeFormatter.ofPattern("yyyy-MM-d", Locale.ENGLISH);
//        LocalDate startDate = LocalDate.parse(sensorDateDTO.getDate(),formatter);
        String startDateStr = sensorDateDTO.getDate() + " 00:00";

        String endDateStr = sensorDateDTO.getDate() + " 23:59";


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTimeStart = LocalDateTime.parse(startDateStr, formatter);

        LocalDateTime dateTimeEnd = LocalDateTime.parse(endDateStr, formatter);

        Long timestampStart = Timestamp.valueOf(dateTimeStart).getTime();

        Long timestampEnd = Timestamp.valueOf(dateTimeEnd).getTime();
        System.out.println("start " + timestampStart);
        System.out.println("end " +timestampEnd);

        for(Record rec: records){

//            System.out.println("crt time " + rec.getTimestamp());
//            System.out.println(rec.getTimestamp() * 1000 > timestampStart);

            System.out.println(rec.getTimestamp() < timestampEnd);
            if(rec.getTimestamp()  > timestampStart && rec.getTimestamp()  < timestampEnd){
                results.add(new RecordDTO(rec.getTimestamp(),rec.getEnergyConsumption()));
            }
        }
        System.out.println(results.size());
        return results;
    }
}
