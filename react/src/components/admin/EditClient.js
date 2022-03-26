import { React, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
import configStyle from '../config/configStyle'
const EditClient = (props) => {
   let clientId = props.match.params.id
   const [client, setClient] = useState({
      address: '',
      ziNastere: 0,
      lunaNastere: 0,
      anNastere: 0,
      firstName: '',
      lastName: '',
      password: '',
      username: '',
   })

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(client)
      const response = await axiosInstance.put(`/client?id=${clientId}`, client)
      console.log(response)
      props.history.push('/admin')
   }

   const search = async () => {
      const response = await axiosInstance.get('/client/get', {
         params: {
            id: clientId,
         },
      })
      setClient(response.data)
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setClient({ ...client, ...{ [name]: value } })
   }

   useEffect(() => {
      search()
      // console.log(client)
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
                     id="username"
                     label="Username"
                     placeholder={client.username}
                     name="username"
                     //  autoComplete="string"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="firstName"
                     label="First Name"
                     placeholder={client.firstName}
                     name="firstName"
                     //  autoComplete="string"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="lastName"
                     label="Last Name"
                     placeholder={client.lastName}
                     name="lastName"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="address"
                     label="Adresa"
                     placeholder={client.address}
                     name="address"
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
            <div>
               <h1 style={{ textAlign: 'center' }}>Edit Client</h1>
               {client ? (
                  <div style={configStyle.centerPosition}>{renderForm()}</div>
               ) : (
                  <div>Loading</div>
               )}
            </div>
         ) : (
            <div>You cannot access this page!</div>
         )}
      </div>
   )
}

export default EditClient
