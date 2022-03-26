import { React, useState } from 'react'
import axiosInstance from '../apis/axios'
import SelectDeviceTable from './SelectDeviceTable'
import SelectSensorTable from './SelectSensorTable'

const AddSensorToDevice = (props) => {
   const [selectedSensor, setSelectedSensor] = useState()
   const [selectedDevice, setSelectedDevice] = useState()

   const onSubmit = async () => {
      const response = await axiosInstance.put(
         `/device/add?idDevice=${selectedDevice}&idSensor=${selectedSensor}`
      )
      console.log(response.data)
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <SelectDeviceTable
                  addSensorProp={true}
                  onSelectedDevice={(id) => setSelectedDevice(id)}
               />
               <SelectSensorTable
                  addSensorProp={true}
                  onSelectedSensor={(id) => setSelectedSensor(id)}
               />
               <button style={styles.center} onClick={onSubmit}>
                  Add sensor
               </button>
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default AddSensorToDevice
const styles = {
   center: {
      display: 'flex',
      margin: 'auto',
      textAlign: 'center',
   },
}
