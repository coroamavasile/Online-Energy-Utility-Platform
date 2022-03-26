import * as React from 'react'
import { Link } from 'react-router-dom'

export default function MenuBarAdmin(props) {
   return (
      <div style={styles.bar}>
         <Link style={styles.a} to={'/admin'}>
            Clients
         </Link>
         <Link style={styles.a} to={'/sensor'}>
            Sensors
         </Link>
         <Link style={styles.a} to={'/device'}>
            Devices
         </Link>
         <Link style={styles.a} to={'/adddevice'}>
            Add Device
         </Link>
         <Link style={styles.a} to={'/addsensor'}>
            Add Sensor
         </Link>
         <Link style={styles.a} to={'/addclient'}>
            Add Client
         </Link>
         <Link style={styles.a} to={'/add/sensortodevice'}>
            Add Sensor to Device
         </Link>
         <Link style={styles.a} to={'/add/devicetoclient'}>
            Add Device to Client
         </Link>
         <Link style={styles.a} to={'/'} onClick={props.onLogout}>
            Logout
         </Link>
         <p style={{ ...styles.a, ...{ color: 'red' } }}>ADMIN PAGE</p>
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

   // bar: {
   //    width: '20%',
   //    backgroundColor: '#555',
   //    // overflow: 'auto',
   // },
   // a: {
   //    display: 'block',
   //    // float: 'left',
   //    textAlign: 'center',
   //    padding: 16,
   //    // width: '20%',
   //    // padding: '12px 0',
   //    color: 'white',
   //    fontSize: '27px',
   //    // textDecoration: 'none',
   // },
}
