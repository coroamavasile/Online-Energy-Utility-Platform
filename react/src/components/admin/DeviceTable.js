import { React, useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import { Link } from 'react-router-dom'
import configStyle from '../config/configStyle'

const DeviceTable = (props) => {
   const [devices, setDevices] = useState([])
   const search = async () => {
      const response = await axiosInstance.get('/device')
      setDevices(response.data)
      console.log(response.data)
      console.log(props.addSensorProp)
   }

   useEffect(() => {
      search()
   }, [])

   const deleteHandler = async (idDevice) => {
      const response = await axiosInstance.delete('/device', {
         params: {
            id: idDevice,
         },
      })
      console.log(response)
      window.location.reload()
   }

   const detachSensorHandler = async (id) => {
      console.log(id)
      const response = await axiosInstance.put(`/device/detach?idDevice=${id}`)
      console.log(response.data)
      window.location.reload()
   }

   const renderDevices = () => {
      const devicesList = devices.map((device, index) => (
         <tr
            key={devices.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{device.description}</th>
            <th style={configStyle.spaceTable}>{device.address}</th>
            <th style={configStyle.spaceTable}>
               {device.maximumEnergyConsumption}
            </th>
            <th style={configStyle.spaceTable}>
               {device.avarageEnergyConsumption}
            </th>
            {!props.addSensorProp ? (
               <th>
                  <Link
                     onClick={deleteHandler.bind(this, device.id)}
                     style={configStyle.button}
                  >
                     Confirm
                  </Link>
               </th>
            ) : null}
            {!props.addSensorProp ? (
               <th>
                  <Link
                     to={`editdevice/${device.id}`}
                     style={configStyle.button}
                  >
                     Edit
                  </Link>
               </th>
            ) : null}

            {device.sensor ? (
               <th>
                  <button
                     onClick={() => {
                        detachSensorHandler(device.id)
                     }}
                     style={configStyle.button}
                  >
                     OK
                  </button>
               </th>
            ) : (
               <div>Without sensor</div>
            )}
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
                  <th style={style.space}>Delete</th>
               ) : null}
               {!props.addSensorProp ? (
                  <th style={style.space}>Edit</th>
               ) : (
                  <th style={style.space}>Select</th>
               )}
               {!props.addSensorProp ? (
                  <th style={style.space}>Delete sensor</th>
               ) : null}
            </tr>
            <tbody style={style.tableRow}>{devicesList}</tbody>
         </table>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div style={configStyle.tablePosition}>{renderDevices()}</div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default DeviceTable

const style = {
   //    container: { padding: 30, margin: 30 },
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
