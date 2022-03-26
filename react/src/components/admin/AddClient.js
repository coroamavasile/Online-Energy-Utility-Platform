import { React, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'
const AddClient = (props) => {
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
   const handleInput = (e) => {
      const { value, name } = e.target
      setClient({ ...client, ...{ [name]: value } })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      const response = await axiosInstance.post('/client', client)
      console.log(response)
      props.history.push('/')
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
                        id="username"
                        label="Username"
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
                        name="lastName"
                        onChange={handleInput}
                        autoFocus
                     />

                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="ziNastere"
                        label="Zi Nastere"
                        name="ziNastere"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lunaNastere"
                        label="Luna Nastere"
                        name="lunaNastere"
                        onChange={handleInput}
                        autoFocus
                     />

                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="anNastere"
                        label="An Nastere"
                        name="anNastere"
                        onChange={handleInput}
                        autoFocus
                     />

                     <Button
                        style={{ marginBottom: '10%' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                     >
                        Add Client
                     </Button>
                  </form>
               </Grid>
            </Container>
         </div>
      )
   }
   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div style={styles.centerPosition}>
               <div>
                  <h1 style={{ textAlign: 'center' }}>Add client</h1>
               </div>
               {renderForm()}
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default AddClient
const styles = {
   centerPosition: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '60%',
      paddingBottom: '0.5rem',
   },
}
