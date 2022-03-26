import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../apis/axios'

const SensorDetails = (props) => {
   const deviceId = props.match.params.id
   const [sensor, setSensor] = useState()
   const [records, setRecords] = useState([])
   const [currentData, setCurrentData] = useState()
   const [data, setData] = useState()

   const handleSearch = () => {
      console.log(data)
   }
   const search = async () => {
      const response = await axiosInstance.get(
         `sensor/device?deviceId=${deviceId}`
      )
      console.log(response.data)
      setSensor(response.data)
      searchRecords(response.data.id)
   }

   const searchRecords = async (sensorId) => {
      const responseRecords = await axiosInstance.get(
         `/sensor/records?sensorId=${sensorId}`
      )
      console.log(responseRecords.data)
      setRecords(responseRecords.data)
      setCurrentData(responseRecords.data[responseRecords.data.length - 1])
   }

   const renderRecords = () => {
      const recordsList = records.map((record, index) => (
         <tr
            key={index}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={styles.space}>{index}</th>
            <th style={styles.space}>
               {new Date(record.timestamp * 1000).toString().substring(0, 25)}
            </th>
            <th style={styles.space}>{record.energyConsumption}</th>
         </tr>
      ))

      return (
         <table style={styles.styledTable}>
            <tr style={styles.headerTable}>
               <th style={styles.space}>Index</th>
               <th style={styles.space}>Time</th>
               <th style={styles.space}>Energy</th>
            </tr>
            <tbody style={styles.tableRow}>{recordsList}</tbody>
         </table>
      )
   }

   useEffect(() => {
      search()
   }, [])

   const renderDetails = () => {
      return (
         <div style={styles.container}>
            <div>
               <h3 style={{ display: 'inLine' }}>Description: </h3>
               {sensor.description}
            </div>
            <div>
               <h3 style={{ display: 'inLine' }}>Maximum value: </h3>
               {sensor.maximumValue}
            </div>
            <div>
               <h3 style={{ display: 'inLine' }}>Current Consumption: </h3>
               {currentData ? currentData.energyConsumption : null}
            </div>
            <div>
               <h3 style={{ display: 'inLine' }}>Data: </h3>
               {currentData ? (
                  <div>
                     {new Date(currentData.timestamp * 1000)
                        .toString()
                        .substring(0, 25)}
                  </div>
               ) : null}
            </div>
         </div>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') ? (
            <div style={{}}>
               {sensor ? (
                  <div style={styles.positionContainter}>
                     <div>
                        <div style={{ marginTop: '40px' }}>
                           <h2 style={{ textAlign: 'center' }}>
                              Sensor Details
                           </h2>
                           {renderDetails()}
                        </div>
                     </div>
                     <div>
                        <div style={{ marginTop: '40px' }}>
                           <h2 style={{ textAlign: 'center' }}>History</h2>
                           {renderRecords()}
                        </div>
                     </div>
                     <div>
                        <h3>Select a date</h3>
                        <input
                           type="date"
                           id="start"
                           name="trip-start"
                           min="2021-10-01"
                           max="2022-10-01"
                           onChange={(e) => setData(e.target.value)}
                        />
                        <Link to={`/chart/${sensor.id}/${data}`}>Search</Link>
                        <div style={{ paddingBottom: 20 }}></div>
                     </div>
                  </div>
               ) : (
                  <div>Loading...</div>
               )}
            </div>
         ) : (
            <div> You cannot access this page</div>
         )}
      </div>
   )
}

export default SensorDetails

const styles = {
   centerPosition: {
      position: 'absolute',
      //   display: 'flex',
      //   justifyContent: 'center',
      top: '50%',
      left: '50%',
      marginTop: '-50px',
      marginLeft: '-50px',
      width: '300px',
      height: '300px',
   },
   container: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '5px',
      padding: '2px 16px',
      backgroundColor: '#7FFFD4',
   },
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
   positionContainter: {
      position: 'absolute',
      left: '35%',
   },
}
