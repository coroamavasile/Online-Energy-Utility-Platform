import { React, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const DeviceAdd = (props) => {
   const [device, setDevice] = useState()

   const handleInput = (e) => {
      const { value, name } = e.target
      setDevice({ ...device, ...{ [name]: value } })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      const response = await axiosInstance.post('/device', device)
      console.log(response)
      props.history.push('/device')
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
                     id="address"
                     label="Adresa"
                     name="address"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="maximumEnergyConsumption"
                     label="Max Energy"
                     name="maximumEnergyConsumption"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="avarageEnergyConsumption"
                     label="Avg Energy"
                     name="avarageEnergyConsumption"
                     onChange={handleInput}
                     autoFocus
                  />

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                  >
                     Add
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
               <h1 style={{ textAlign: 'center' }}>Device Add </h1>
               <div>{renderForm()}</div>
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default DeviceAdd
