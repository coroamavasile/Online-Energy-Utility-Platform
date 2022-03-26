import { React, useState } from 'react'
import SelectClientTable from './SelectClientTable'
import SelectDeviceTable from './SelectDeviceTable'
import axiosInstance from '../apis/axios'
const AddDeviceToClient = (props) => {
   const [selectedDevice, setSelectedDevice] = useState()
   const [selectedClient, setSelectedClient] = useState()

   const submitHandler = async () => {
      console.log(selectedDevice)
      console.log(selectedClient)

      //este foarte dubios ca in backend mi se face schimbarea dar in frontend imi vine 500
      try {
         const response = await axiosInstance.put(
            `/client/add?idClient=${selectedClient}&idDevice=${selectedDevice}`
         )
         console.log(response.data)
      } catch (err) {
         window.location.reload()
      }
   }
   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <div>
                  <SelectClientTable
                     addDeviceProp={true}
                     onSelectedClient={(id) => setSelectedClient(id)}
                  />
                  <SelectDeviceTable
                     addSensorProp={false}
                     onSelectedDevice={(id) => setSelectedDevice(id)}
                  />
               </div>
               <div style={styles.center}>
                  <button onClick={submitHandler}>Submit</button>
               </div>
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default AddDeviceToClient
const styles = {
   center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
}
