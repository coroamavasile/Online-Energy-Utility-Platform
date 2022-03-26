import { React, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const SensorEdit = (props) => {
   let sensorId = props.match.params.id
   const [sensor, setSensor] = useState({
      description: '',
      maximumValue: '',
   })

   const handleSubmit = async (event) => {
      event.preventDefault()
      const response = await axiosInstance.put(`/sensor?id=${sensorId}`, sensor)
      console.log(response)
      props.history.push('/sensor')
   }

   const search = async () => {
      const response = await axiosInstance.get('/sensor/get', {
         params: {
            id: sensorId,
         },
      })
      setSensor(response.data)
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setSensor({ ...sensor, ...{ [name]: value } })
   }

   useEffect(() => {
      search()
   }, [])

   const renderForm = () => {
      // console.log(client)
      return (
         <div>
            <Grid>
               <form onSubmit={handleSubmit}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="description"
                     label="Description"
                     placeholder={sensor.description}
                     name="description"
                     //  autoComplete="string"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="maximumValue"
                     label="Max Value"
                     placeholder={sensor.maximumValue}
                     name="maximumValue"
                     onChange={handleInput}
                     autoFocus
                  />

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                  >
                     Edit
                  </Button>
               </form>
            </Grid>
         </div>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div style={configStyle.centerPosition}>
               <h1 style={{ textAlign: 'center' }}>Edit Sensor</h1>
               {sensor ? <div>{renderForm()}</div> : <div>Loading</div>}
            </div>
         ) : (
            <div>You cannot acess this page</div>
         )}
      </div>
   )
}
export default SensorEdit
