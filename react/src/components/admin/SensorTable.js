import { React, useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import { Link } from 'react-router-dom'
import configStyle from '../config/configStyle'
import { saveAs } from 'file-saver'

const SensorTable = (props) => {
   const [sensors, setSensors] = useState([])
   const [sensorsId, setSensorsId] = useState([])

   const search = async () => {
      const response = await axiosInstance.get('/sensor')
      setSensors(response.data)
      console.log(response.data)
   }

   useEffect(() => {
      search()
   }, [])

   const deleteHandler = async (idSensor) => {
      const response = await axiosInstance.delete('/sensor', {
         params: {
            id: idSensor,
         },
      })
      console.log(response)
      window.location.reload()
   }

   // const styleTable = ()

   const renderSensors = () => {
      const sensorsList = sensors.map((sensor, index) => (
         <tr
            key={sensor.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{sensor.description}</th>
            <th style={configStyle.spaceTable}>{sensor.maximumValue}</th>

            <th>
               <Link
                  onClick={deleteHandler.bind(this, sensor.id)}
                  style={configStyle.button}
               >
                  Confirm
               </Link>
            </th>
            <th>
               <Link to={`editsensor/${sensor.id}`} style={configStyle.button}>
                  Edit
               </Link>
            </th>
            <th>
               {!sensor.deviceId ? (
                  <div>Without device</div>
               ) : (
                  <input
                     type="checkbox"
                     style={configStyle.button}
                     onClick={() => {
                        sensorsId.push(sensor.id)
                     }}
                  />
               )}
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Description</th>
               <th style={configStyle.spaceTable}>Max Value</th>
               <th style={configStyle.spaceTable}>Delete</th>
               <th style={configStyle.spaceTable}>Edit</th>
               <th style={configStyle.spaceTable}>Simulator</th>
            </tr>
            <tbody style={style.tableRow}>{sensorsList}</tbody>
         </table>
      )
   }

   const fileSaver = () => {
      let typeForBlob = 'text/plain;charset=utf-8'
      let rez = sensorsId.map((sens) => {
         return sens + '\n'
      })
      let blob = new Blob(rez, { type: typeForBlob })
      saveAs(blob, 'configurationFile.txt')
      console.log(sensorsId)
      //console.log(blob)
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <div style={{ paddingLeft: 350, paddingTop: 20 }}>
                  <button
                     style={configStyle.button}
                     onClick={() => {
                        fileSaver()
                     }}
                  >
                     Download configFile.
                  </button>

                  <button
                     style={{ ...configStyle.button, ...{ width: 130 } }}
                     onClick={() => {
                        window.location.reload()
                     }}
                  >
                     Clear
                  </button>
               </div>
               <div style={configStyle.tablePosition}>{renderSensors()}</div>
            </div>
         ) : (
            <div>You cannot access this page!</div>
         )}
      </div>
   )
}

export default SensorTable
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
      padding: '0.5rem',
   },
}
