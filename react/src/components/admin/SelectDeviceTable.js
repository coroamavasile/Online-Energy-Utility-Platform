import { React, useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const SelectDeviceTable = (props) => {
   const [devices, setDevices] = useState([])
   const [selectedRow, setSelectedRow] = useState()
   const search = async () => {
      const response = await axiosInstance.get('/device')
      console.log(props.addSensorProp)
      if (props.addSensorProp) {
         const result = response.data.filter((el) => el.sensor === null)
         setDevices(result)
      } else {
         const response2 = await axiosInstance.get('/device/withoutclient')
         setDevices(response2.data)
      }
   }

   useEffect(() => {
      search()
   }, [])

   const rowStyle = (index, id) => {
      if (id === selectedRow) {
         return { backgroundColor: 'green' }
      }

      if (index % 2 === 0) {
         return { backgroundColor: 'white' }
      }

      return { backgroundColor: '#f3f3f3' }
   }

   const renderDevices = () => {
      const devicesList = devices.map((device, index) => (
         <tr key={devices.id} style={rowStyle(index, device.id)}>
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{device.description}</th>
            <th style={configStyle.spaceTable}>{device.address}</th>
            <th style={configStyle.spaceTable}>
               {device.maximumEnergyConsumption}
            </th>
            <th style={configStyle.spaceTable}>
               {device.avarageEnergyConsumption}
            </th>

            <th>
               <button
                  onClick={() => {
                     props.onSelectedDevice(device.id)
                     setSelectedRow(device.id)
                  }}
                  style={configStyle.button}
               >
                  Select
               </button>
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Description</th>
               <th style={configStyle.spaceTable}>Address</th>
               <th style={configStyle.spaceTable}>Max Energy</th>
               <th style={configStyle.spaceTable}>Avg Energy</th>
               {!props.addSensorProp ? (
                  <th style={configStyle.spaceTable}>Delete</th>
               ) : (
                  <th style={configStyle.spaceTable}>Select</th>
               )}
            </tr>
            <tbody style={style.tableRow}>{devicesList}</tbody>
         </table>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <h1 style={{ textAlign: 'center' }}>Devices</h1>
               <div style={configStyle.tablePosition}>{renderDevices()}</div>
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default SelectDeviceTable

const style = {
   styledTable: {
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '0.9em',
      fontFamily: 'sans-serif',
      minWidth: '400px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
   },
   headerTable: {
      backgroundColor: ' #009879',
      color: '#ffffff',
      textAlign: 'center',
      padding: '1 20px',
   },
   tableRow: {
      borderBottom: '1px solid #dddddd',
      textAlign: 'center',
   },
   tablePos: {
      display: 'flex',
      justifyContent: 'center',
   },
   space: {
      padding: '0 10px 0 10px',
   },
}
