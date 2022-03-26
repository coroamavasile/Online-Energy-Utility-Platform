package ro.tuc.ds2020.rpc;

import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Record;
import ro.tuc.ds2020.entities.Sensor;
import ro.tuc.ds2020.repositories.RecordRepository;
import ro.tuc.ds2020.services.DeviceService;
import ro.tuc.ds2020.services.SensorService;

import java.sql.Timestamp;
import java.util.*;

@Service
@AutoJsonRpcServiceImpl
@RequiredArgsConstructor
public class BaseServiceImpl implements BaseService {

    @Autowired
    private SensorService sensorService;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private RecordRepository recordRepository;

    @Override
    public List<Record> getmesurement(Long days, UUID deviceId) {
        List<Sensor> setnsorList = sensorService.findAll();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Date date = new Date(timestamp.getTime());
        Long currentTimestamp = timestamp.getTime();

        Device device = deviceService.getDeviceById(deviceId);
        Sensor sensor = device.getSensor();

        List<Record> recordsList = recordRepository.findAll();
        List<Record> sensorRecords = new ArrayList<>();
//        System.out.println("days=" + days);
        Long startDate = currentTimestamp - days * 86400 * 1000;
//        System.out.println("startDate=" + startDate);
        for(Record rec:recordsList){
            if(rec.getSensor().getId().equals(sensor.getId())){
//                System.out.println("startDate=" + startDate);
//                System.out.println("sensorDate=" + rec.getTimestamp());
                if(rec.getTimestamp() > startDate) {
//                    System.out.println("mesurement:" + rec.getEnergyConsumption());
                    sensorRecords.add(rec);
                }
            }
        }



        return sensorRecords;
    }

    @Override
    public Map<Integer, Double> baseline(Long h, UUID id) {
        List<Record> records = getmesurement(7L,id);
        Double result = 0.0;

        for(Record record:records){
            result+= record.getEnergyConsumption();
        }
        //Practic ar trebui sa returnez un hashMap
        // aici practic ar trebui sa caut valoarea medie pentru fiecare ora din ultimile 7 zile
        //medie ora 00
        //medie ora 01
        //medie ora 02
        //medie ora ..
        //medie ora 24
        Map<Integer,Double> resultMatrix = new HashMap<>();
        //initializare
        for(int i = 0; i < 24 ; ++i){
            resultMatrix.put(i,0.0);
        }

        for(Record rec: records){
            Date date = new Date(rec.getTimestamp());
            resultMatrix.put(date.getHours(),rec.getEnergyConsumption() + resultMatrix.get(date.getHours()));
        }

        for(int i = 0; i < 24; ++i){
            resultMatrix.put(i, resultMatrix.get(i) / 7.0);
        }
        result = result / 7.0;

        return resultMatrix;
    }

    @Override
    public Map<Integer, Double> bestTimeProgram(Long h, UUID deviceId) {
        //prima data luam media
        System.out.println("bestTimeProgram");
        System.out.println(h);
        Map<Integer, Double> avarageConsumption = baseline(0L,deviceId);
        Map<Integer,Double> result = new HashMap<>();

        //trebuie sa cautam media minima
        int min_hour = 0;
        double energyCons = Double.MAX_VALUE;
        for(Map.Entry<Integer,Double> set:avarageConsumption.entrySet()){
            if(energyCons > set.getValue()){
                min_hour = set.getKey();
                energyCons = set.getValue();
            }
        }

        for(Map.Entry<Integer,Double> set:avarageConsumption.entrySet()){
            if(set.getKey() >= min_hour && set.getKey() <= (min_hour + h)){
                result.put(set.getKey(), set.getValue());
            }
        }

        return result;
    }
}
