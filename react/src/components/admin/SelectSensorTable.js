import { React, useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const SelectSensorTable = (props) => {
   const [sensors, setSensors] = useState([])
   const [selectedRow, setSelectedRow] = useState()

   const search = async () => {
      const response = await axiosInstance.get('/sensor')
      const result = response.data.filter((el) => el.deviceId === null)
      setSensors(result)
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

   const renderSensors = () => {
      const sensorsList = sensors.map((sensor, index) => (
         <tr key={sensor.id} style={rowStyle(index, sensor.id)}>
            <th style={style.space}>{index}</th>
            <th style={style.space}>{sensor.description}</th>
            <th style={style.space}>{sensor.maximumValue}</th>

            <th>
               <button
                  onClick={() => {
                     props.onSelectedSensor(sensor.id)
                     setSelectedRow(sensor.id)
                  }}
               >
                  Select
               </button>
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={style.space}>Index</th>
               <th style={style.space}>Description</th>
               <th style={style.space}>Max Value</th>
               <th style={style.space}>Select</th>
            </tr>
            <tbody style={style.tableRow}>{sensorsList}</tbody>
         </table>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <h1 style={{ textAlign: 'center' }}>Sensors</h1>
               <div style={configStyle.tablePosition}>{renderSensors()}</div>
            </div>
         ) : (
            <div>You cannot acess this page!</div>
         )}
      </div>
   )
}

export default SelectSensorTable
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
      // padding: '5rem',
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
