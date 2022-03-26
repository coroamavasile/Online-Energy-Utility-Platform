import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import configStyle from '../config/configStyle'

const ProgramDuration = (props) => {
   const deviceId = props.match.params.id
   const [programHours, setProgramHours] = useState(0)
   const [data, setData] = useState(null)

   const handleSubmit = async (e) => {
      e.preventDefault()

      const body = {
         id: 1,
         jsonrpc: '2.0',
         method: 'bestTimeProgram',
         params: {
            h: programHours,
            deviceId: deviceId,
         },
      }

      const response = await axiosInstance.post('/deviceservice', body)
      console.log(response.data.result)
      let arr = []
      let size = Object.keys(response.data.result).length
      for (let i = 0; i < size; i++) {
         arr.push({ hour: i, value: Object.values(response.data.result)[i] })
      }
      setDataRec(arr)
   }

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
                        id="hours"
                        label="Number of hours"
                        name="number of hours"
                        type="number"
                        //  autoComplete="string"
                        onChange={(e) => setProgramHours(e.target.value)}
                        autoFocus
                     />

                     <Button
                        style={{ marginBottom: '10%' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                     >
                        Find a program
                     </Button>
                  </form>
               </Grid>
            </Container>
         </div>
      )
   }

   return (
      <div
         style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 40,
            flex: 1,
         }}
      >
         <h1>Select a program</h1>
         <div>{renderForm()}</div>
         <div>
            {data && (
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
               >
                  {renderLineChart}
               </div>
            )}
         </div>
      </div>
   )
}

export default ProgramDuration
