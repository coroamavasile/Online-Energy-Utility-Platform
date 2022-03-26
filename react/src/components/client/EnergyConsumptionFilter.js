import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import configStyle from '../config/configStyle'

const EnergyConsumtionFilter = (props) => {
   const deviceId = props.match.params.id
   const [days, setDays] = useState()
   const [hours, setHours] = useState()
   const [records, setRecords] = useState([])
   const [recordsTable, setRecordsTable] = useState([])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const body = {
         id: 1,
         jsonrpc: '2.0',
         method: 'getmesurement',
         params: {
            days: days,
            deviceId: deviceId,
         },
      }

      const response = await axiosInstance.post('/deviceservice', body)
      //   console.log(response.data.result)
      console.log(response.data.result)

      const sortedMeasurements = response.data.result.sort((a, b) =>
         a.timestamp > b.timestamp ? 1 : -1
      )
      setRecords(sortedMeasurements)
      setRecordsTable(sortedMeasurements)
      setDataRec(sortedMeasurements)
   }

   const renderLineChart = (
      <LineChart width={1200} height={500} data={records}>
         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
         <CartesianGrid stroke="#ccc" />
         <XAxis dataKey="name" />
         <YAxis />
      </LineChart>
   )

   const setDataRec = (recHistory) => {
      const result = recHistory.map((element) => {
         console.log()
         return {
            uv: element.energyConsumption,
            name: new Date(element.timestamp).toString().substring(4, 21), //.substring(11, 13) + ':00',
         }
      })
      setRecords(result)
   }

   const renderList = () => {
      console.log(records)
      const devicesList = recordsTable.map((device, index) => (
         <tr
            key={device.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{device.energyConsumption}</th>
            <th style={configStyle.spaceTable}>
               {new Date(device.timestamp).toString().substring(4, 21)}
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Measurement</th>
               <th style={configStyle.spaceTable}>Timestamp</th>
            </tr>
            <tbody style={style.tableRow}>{devicesList}</tbody>
         </table>
      )
   }

   const renderForm = () => {
      return (
         <div>
            <Container>
               <Grid>
                  <form onSubmit={handleSubmit}>
                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="days"
                        label="Days"
                        name="days"
                        type="number"
                        //  autoComplete="string"
                        onChange={(e) => setDays(e.target.value)}
                        autoFocus
                     />

                     <Button
                        style={{ marginBottom: '10%' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                     >
                        Find Mesurements
                     </Button>
                  </form>
               </Grid>
            </Container>
         </div>
      )
   }

   return (
      <div style={{ marginTop: 20, textAlign: 'center' }}>
         <h1>
            Device id:
            <p style={{ display: 'inline-block', color: 'green' }}>
               {deviceId}
            </p>
         </h1>
         <div style={{ marginTop: 20 }}>{renderForm()}</div>
         <div
            style={{
               flex: 1,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginTop: 10,
            }}
         >
            {renderLineChart}
         </div>
         <div style={{ ...style.tablePos, ...{ marginBottom: 50 } }}>
            {renderList()}
         </div>
      </div>
   )
}

export default EnergyConsumtionFilter
// const styles = {}
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
