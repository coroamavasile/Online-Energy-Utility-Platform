import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../apis/axios'
import { Link } from 'react-router-dom'
import configStyle from '../config/configStyle'

const ClientDevices = () => {
   const idClient = localStorage.getItem('USER_ID')
   const [devices, setDevices] = useState([])

   const search = async () => {
      const response = await axiosInstance.get(
         `/client/device?idClient=${idClient}`
      )
      setDevices(response.data)
      console.log(response.data)
   }
   useEffect(() => {
      search()
   }, [])

   const renderList = () => {
      const devicesList = devices.map((device, index) => (
         <tr
            key={device.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={style.space}>{index}</th>
            <th style={style.space}>{device.description}</th>
            <th style={style.space}>{device.address}</th>
            <th style={style.space}>{device.maximumEnergyConsumption}</th>
            <th style={style.space}>{device.avarageEnergyConsumption}</th>
            <th style={style.space}>
               {device.sensorId ? (
                  <Link
                     to={`/sensor/details/${device.id}`}
                     style={configStyle.button}
                  >
                     View
                  </Link>
               ) : (
                  <div>Without sensor</div>
               )}
            </th>
            <th style={style.space}>
               <Link
                  style={configStyle.button}
                  to={`/energy/filter/${device.id}`}
               >
                  View
               </Link>
            </th>
            <th style={style.space}>
               <Link
                  style={configStyle.button}
                  to={`/energy/avarage/${device.id}`}
               >
                  View
               </Link>
            </th>
            <th style={style.space}>
               <Link style={configStyle.button} to={`/program/${device.id}`}>
                  View
               </Link>
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={style.space}>Index</th>
               <th style={style.space}>Description</th>
               <th style={style.space}>Address</th>
               <th style={style.space}>Max Energy</th>
               <th style={style.space}>Avg Energy</th>
               <th style={style.space}>Sensor</th>
               <th style={style.space}>Energy Filter</th>
               <th style={style.space}>Energy Avarage</th>
               <th style={style.space}>Select a program</th>
            </tr>
            <tbody style={style.tableRow}>{devicesList}</tbody>
         </table>
      )
   }
   return (
      <div>
         {localStorage.getItem('USER') === 'CLIENT' ? (
            <div style={configStyle.tablePosition}>{renderList()}</div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default ClientDevices
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
      // height: 10,
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
      padding: '0 30px 0 30px',
      paddingTop: '0.7rem',
      paddingBottom: '0.7rem',
   },
}
