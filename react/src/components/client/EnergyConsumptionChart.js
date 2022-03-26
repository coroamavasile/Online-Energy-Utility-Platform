import React, { useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const EnergyConsumptionChart = (props) => {
   const reqBod = {
      date: props.match.params.date,
      sensorId: props.match.params.id,
   }

   // const [records, setRecords] = useState([])
   const [data, setData] = useState([])

   const renderLineChart = (
      <LineChart width={1200} height={500} data={data}>
         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
         <CartesianGrid stroke="#ccc" />
         <XAxis dataKey="name" />
         <YAxis />
      </LineChart>
   )

   const setDataRec = (recHistory) => {
      const result = recHistory.map((element) => {
         return {
            uv: element.energyConsumption,
            name: new Date(element.timestamp).toString().substring(15, 24), //.substring(11, 13) + ':00',
         }
      })
      setData(result)
   }

   const search = async () => {
      console.log(reqBod.date)
      const response = await axiosInstance.post('/sensor/records/date', reqBod)
      console.log(response.data)
      setDataRec(response.data)
   }
   useEffect(() => {
      search()
   }, [])

   return (
      <div>
         {localStorage.getItem('USER') === 'CLIENT' ? (
            <div style={styles.centerPositon}>{renderLineChart}</div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default EnergyConsumptionChart
const styles = {
   centerPositon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
}
