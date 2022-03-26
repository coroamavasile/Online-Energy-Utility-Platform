import React, { useEffect } from 'react'
import ClientDevices from './ClientDevices'
import * as SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'

const ClientPage = (props) => {
   const connect = () => {
      // const URL = 'http://localhost:8080/socket'
      const URL = 'https://ds2021-coroama-vasile-2b.herokuapp.com/socket'
      const websocket = new SockJS(URL)
      const stompClient = Stomp.over(websocket)
      stompClient.connect({}, (frame) => {
         stompClient.subscribe('/topic/socket/record', (notification) => {
            const obj = JSON.parse(notification.body)
            console.log(obj)
            console.log(obj.clientId)
            console.log(obj.sensorDescription)

            if (obj.clientId === localStorage.getItem('USER_ID')) {
               console.log('trimite notificare')
               alert(
                  'A fost depasita limita sensorului ' +
                     obj.sensorDescription +
                     '\n' +
                     'Valoarea sensorului:  ' +
                     obj.maxSensor +
                     '\n' +
                     'Valoarea curenta: ' +
                     obj.valCurenta
               )
            }
         })
      })
   }

   useEffect(() => {
      connect()
   }, [])

   return (
      <div>
         {localStorage.getItem('USER') === 'CLIENT' ? (
            <div>
               <ClientDevices />
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default ClientPage
