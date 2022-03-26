import React, { useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const NotificationClient = (props) => {
   const [notifications, setNotifications] = useState([])
   const clientId = props.match.params.id

   const search = async () => {
      const response = await axiosInstance.get(
         `/client/notification?id=${clientId}`
      )
      setNotifications(response.data)
      console.log(response.data)
   }

   useEffect(() => {
      search()
   }, [])

   const renderTable = () => {
      const devicesList = notifications.map((device, index) => (
         <tr
            key={device.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{device.sensorName}</th>
            <th style={configStyle.spaceTable}>{device.description}</th>
            <th style={configStyle.spaceTable}>
               {new Date(device.timestamp).toString().substring(0, 24)}
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Sensor</th>
               <th style={configStyle.spaceTable}>Description</th>
               <th style={configStyle.spaceTable}>Time</th>
            </tr>
            <tbody style={style.tableRow}>{devicesList}</tbody>
         </table>
      )
   }
   return (
      <div>
         <div style={{ left: '25%', position: 'absolute' }}>
            {renderTable()}
         </div>
      </div>
   )
}

export default NotificationClient
const style = {
   ////    container: { padding: 30, margin: 30 },
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
