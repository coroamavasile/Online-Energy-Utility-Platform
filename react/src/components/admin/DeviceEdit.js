import { React, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'

const DeviceEdit = (props) => {
   let deviceId = props.match.params.id
   const [device, setDevice] = useState({
      address: '',
      description: '',
      maximumEnergyConsumption: '',
      avarageEnergyConsumption: '',
   })

   const handleSubmit = async (event) => {
      event.preventDefault()
      const response = await axiosInstance.put(`/device?id=${deviceId}`, device)
      console.log(response)
      props.history.push('/device')
   }

   const search = async () => {
      const response = await axiosInstance.get('/device/get', {
         params: {
            id: deviceId,
         },
      })
      setDevice(response.data)
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setDevice({ ...device, ...{ [name]: value } })
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
                     placeholder={device.description}
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
                     placeholder={device.address}
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
                     placeholder={device.maximumEnergyConsumption}
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
                     placeholder={device.avarageEnergyConsumption}
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
               <h1 style={{ textAlign: 'center' }}>Edit device</h1>
               {device ? <div>{renderForm()}</div> : <div>Loading</div>}
            </div>
         ) : (
            <div>You cannot access this page!</div>
         )}
      </div>
   )
}

export default DeviceEdit
