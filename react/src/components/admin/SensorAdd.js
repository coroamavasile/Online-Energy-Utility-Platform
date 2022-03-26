import { React, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const SensorAdd = (props) => {
   const [sensor, setSensor] = useState({
      description: '',
      maximumValue: '',
   })

   const handleSubmit = async (event) => {
      event.preventDefault()
      const response = await axiosInstance.post('/sensor', sensor)
      console.log(response)
      props.history.push('/sensor')
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setSensor({ ...sensor, ...{ [name]: value } })
   }

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
               <h1 style={{ textAlign: 'center' }}>Add Sensor</h1>
               <div>{renderForm()}</div>
            </div>
         ) : (
            <div>You cannot access this page!</div>
         )}
      </div>
   )
}

export default SensorAdd
