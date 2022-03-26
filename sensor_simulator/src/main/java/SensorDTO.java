import java.sql.Timestamp;
import java.util.UUID;

public class SensorDTO {
    //timestamp, sensor_id, measurement_value
    private Long timestamp;
    private UUID sensorId;
    private Double measurementValue;

    public SensorDTO(){}
    public SensorDTO(Long timestamp, UUID sensorId, Double measurementValue) {
        this.timestamp = timestamp;
        this.sensorId = sensorId;
        this.measurementValue = measurementValue;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public UUID getSensorId() {
        return sensorId;
    }

    public void setSensorId(UUID sensorId) {
        this.sensorId = sensorId;
    }

    public Double getMeasurementValue() {
        return measurementValue;
    }

    public void setMeasurementValue(Double measurementValue) {
        this.measurementValue = measurementValue;
    }

    @Override
    public String toString() {
        return "SensorDTO{" +
                "timestamp=" + timestamp +
                ", sensorId=" + sensorId +
                ", measurementValue=" + measurementValue +
                '}';
    }
}
