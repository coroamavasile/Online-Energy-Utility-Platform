import React, { useState, useEffect } from 'react'
import axios from '../apis/axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const EnergyAvarageConsumption = (props) => {
   const deviceId = props.match.params.id
   const [device, setDevice] = useState()
   const [h, setH] = useState(0)
   const [avaragedEnergyConsumption, setAvaragedEnergyConsumption] = useState(0)
   const [avrData, setAvrData] = useState({})
   const [data, setData] = useState()

   const searchDevice = async () => {
      const response = await axios.get(`/device/get?id=${deviceId}`)
      setDevice(response.data)
   }

   const searchAvrCons = async () => {
      const body = {
         id: 1,
         jsonrpc: '2.0',
         method: 'baseline',
         params: {
            h: h,
            deviceId: deviceId,
         },
      }

      const response = await axios.post('/deviceservice', body)
      console.log(response.data.result)
      setAvrData(response.data.result)
      let avr = 0.0
      let arr = []
      for (let i = 0; i < 24; i++) {
         arr.push({ hour: i, value: Object.values(response.data.result)[i] })
         avr = avr + Object.values(response.data.result)[i]
      }
      setAvaragedEnergyConsumption(avr)
      setDataRec(arr)
   }

   useEffect(() => {
      searchDevice()
      searchAvrCons()
   }, [])

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
            uv: element.value,
            name: element.hour,
         }
      })
      setData(result)
   }

   if (!device) {
      return <div>Loading..</div>
   }

   return (
      <div
         style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: 10,
         }}
      >
         <div>
            <h1>Averaged energy consumption menu</h1>
            <h2 style={{ marginTop: 50 }}>
               Device:{' '}
               <p style={{ color: 'green', display: 'inline-block' }}>
                  {device.description}
               </p>
            </h2>
            <h2>
               Avaraged energy consumption:{' '}
               <p style={{ color: 'green', display: 'inline-block' }}>
                  {avaragedEnergyConsumption.toFixed(3)}
               </p>
            </h2>
         </div>
         <div
            style={{
               flex: 1,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginTop: 50,
            }}
         >
            {renderLineChart}
         </div>
      </div>
   )
}

export default EnergyAvarageConsumption
