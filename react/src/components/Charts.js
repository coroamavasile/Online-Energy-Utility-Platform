import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const Charts = (props) => {
   const data = [
      { name: '00:00', uv: 400 },
      { name: '01:00', uv: 300 },
      { name: '02:00', uv: 200 },
      { name: '03:00', uv: 150 },
      { name: '04:00', uv: 600 },
      { name: '05:00', uv: 600 },
      { name: '06:00', uv: 600 },
      { name: '07:00', uv: 600 },
      { name: '08:00', uv: 600 },
      { name: '09:00', uv: 600 },
      { name: '10:00', uv: 600 },
      { name: '11:00', uv: 600 },
      { name: '12:00', uv: 600 },
      { name: '13:00', uv: 600 },
      { name: '14:00', uv: 600 },
      { name: '15:00', uv: 600 },
      { name: '16:00', uv: 600 },
      { name: '17:00', uv: 600 },
      { name: '18:00', uv: 600 },
      { name: '19:00', uv: 600 },
      { name: '20:00', uv: 600 },
      { name: '21:00', uv: 600 },
      { name: '22:00', uv: 200 },
      { name: '23:00', uv: 600 },
      { name: '23:00', uv: 600 },
   ]
   const renderLineChart = (
      <LineChart width={1200} height={500} data={data}>
         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
         <CartesianGrid stroke="#ccc" />
         <XAxis dataKey="name" />
         <YAxis />
      </LineChart>
   )
   return (
      <div style={styles.container}>
         <div style={styles.centerPositon}>{renderLineChart}</div>
      </div>
   )
}

export default Charts
const styles = {
   centerPositon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
   container: {
      //   width: '100%',
      //   height: '100%',
   },
}
