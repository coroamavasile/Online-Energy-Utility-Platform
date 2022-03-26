import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import axiosInstance from '../apis/axios'

const LoginPage = (props) => {
   //pentru ca sa dea un reload doar o singura data
   // ar trebui sa gasesc o metoda care nu foloseste asta
   if (!window.location.hash) {
      window.location = window.location + '#loaded'
      window.location.reload()
   }
   const [credentials, setCredentials] = useState({
      username: '',
      password: '',
   })

   useEffect(() => {
      localStorage.removeItem('USER')
      localStorage.removeItem('USER_ID')
   }, [])
   const onSubmit = async (e) => {
      e.preventDefault()
      const response = await axiosInstance.post('/login', credentials)
      console.log(response)
      localStorage.setItem('USER', response.data.role)
      localStorage.setItem('USER_ID', response.data.id)

      if (response.data.role === 'ADMINISTRATOR') {
         props.history.push('/admin')
         window.location.reload()
      } else {
         props.history.push('/client')
         window.location.reload()
      }
   }

   const handleInput = (e) => {
      const { value, name } = e.target
      setCredentials({ ...credentials, ...{ [name]: value } })
   }
   const renderLogin = () => {
      return (
         <div style={styles.positionContainter}>
            <div style={styles.container}>
               <Grid>
                  <form onSubmit={onSubmit}>
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="string"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleInput}
                        autoComplete="current-password"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                     >
                        Sign In
                     </Button>
                  </form>
               </Grid>
            </div>
         </div>
      )
   }
   return (
      <div>
         <h1
            style={{ textAlign: 'center', paddingTop: '80px', color: 'green' }}
         >
            DSRL-2021 PROJECT - Coroama Vasile
         </h1>

         <div>
            <h1 style={{ textAlign: 'center', paddingTop: '30px' }}>
               Login Page
            </h1>
            <div>{renderLogin()}</div>
         </div>
      </div>
   )
}

export default LoginPage

const styles = {
   container: {
      height: 250,
      width: 300,
      padding: 20,
      border: '2px solid black',
      borderRadius: '20%',
      backgroundColor: '#F8F8FF',
   },
   positionContainter: {
      paddingTop: 50,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
}
