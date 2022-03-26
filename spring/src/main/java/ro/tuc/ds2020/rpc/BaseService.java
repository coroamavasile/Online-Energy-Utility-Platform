package ro.tuc.ds2020.rpc;

import com.googlecode.jsonrpc4j.JsonRpcParam;
import com.googlecode.jsonrpc4j.JsonRpcService;
import ro.tuc.ds2020.entities.Record;

import java.util.List;
import java.util.UUID;
import java.util.Map;

@JsonRpcService("/deviceservice")
public interface BaseService {
    List<Record> getmesurement(@JsonRpcParam(value = "days") Long days, @JsonRpcParam(value = "deviceId") UUID deviceId);
    Map<Integer, Double> baseline(@JsonRpcParam(value = "h") Long h,@JsonRpcParam(value = "deviceId") UUID deviceId);
    Map<Integer, Double>bestTimeProgram(@JsonRpcParam(value = "h") Long h,@JsonRpcParam(value = "deviceId") UUID deviceId);
}
