import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from './apis/axios'

export default function MenuBar(props) {
   const [client, setClient] = useState()

   const search = async () => {
      const response = await axiosInstance.get(
         `/client/get?id=${localStorage.getItem('USER_ID')}`
      )
      setClient(response.data)
      // console.log(response.data)
   }

   useEffect(() => {
      search()
   }, [])

   return (
      <div>
         {client ? (
            <div style={styles.bar}>
               <p style={{ ...styles.a, ...{ color: 'red' } }}>CLIENT PAGE</p>
               <p style={styles.a}>Hello, {client.firstName}</p>
               <Link style={styles.a_right} to={'/'}>
                  Logout
               </Link>

               <Link style={styles.a_right} to={'/client'}>
                  Device
               </Link>
               <Link
                  style={styles.a_right}
                  to={`/notification/${localStorage.getItem('USER_ID')}`}
               >
                  Notifications
               </Link>
               {/* <Link style={styles.a_right} to={'/energy/filter/:id'}>
                  Energy filter
               </Link>
               <Link style={styles.a_right} to={'/energy/avarage/:id'}>
                  Avaraged energy
               </Link> */}
            </div>
         ) : (
            <div>Loading...</div>
         )}
      </div>
   )
}

const styles = {
   bar: {
      width: '100%',
      backgroundColor: '#555',
      overflow: 'auto',
   },
   a: {
      float: 'left',
      textAlign: 'center',
      width: '20%',
      padding: '12px 0',
      color: 'white',
      fontSize: '27px',
      textDecoration: 'none',
   },
   a_right: {
      float: 'right',
      textAlign: 'center',
      width: '20%',
      padding: '12px 0',
      color: 'white',
      fontSize: '27px',
      textDecoration: 'none',
   },
}
