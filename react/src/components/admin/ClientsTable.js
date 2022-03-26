import { React, useEffect, useState } from 'react'
import axiosInstance from '../apis/axios'
import { Link } from 'react-router-dom'
import configStyle from '../config/configStyle'
const ClientsTable = (props) => {
   const [clients, setClients] = useState([])
   const search = async () => {
      const response = await axiosInstance.get('/client')
      setClients(response.data)
   }

   useEffect(() => {
      search()
   }, [])

   const deleteHandler = async (idClient) => {
      const response = await axiosInstance.delete('/client', {
         params: {
            id: idClient,
         },
      })
      console.log(response)
      window.location.reload()
   }

   const renderClients = () => {
      const clientsList = clients.map((client, index) => (
         <tr
            key={client.id}
            style={
               index % 2 === 0
                  ? { backgroundColor: '#f3f3f3' }
                  : { backgroundColor: 'white' }
            }
         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{client.username}</th>
            <th style={configStyle.spaceTable}>{client.address}</th>
            <th style={configStyle.spaceTable}>
               {client.birthDate.substring(0, 10)}
            </th>
            <th style={configStyle.spaceTable}>{client.firstName}</th>
            <th style={configStyle.spaceTable}>{client.lastName}</th>
            <th>
               <Link
                  onClick={deleteHandler.bind(this, client.id)}
                  style={configStyle.button}
               >
                  Confirm
               </Link>
            </th>
            <th>
               <Link to={`editclient/${client.id}`} style={configStyle.button}>
                  Edit
               </Link>
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Username</th>
               <th style={configStyle.spaceTable}>Address</th>
               <th style={configStyle.spaceTable}>Birthdate</th>
               <th style={configStyle.spaceTable}>FirstName</th>
               <th style={configStyle.spaceTable}>LastName</th>
               <th style={configStyle.spaceTable}>Delete</th>
               <th style={configStyle.spaceTable}>Edit</th>
            </tr>
            <tbody style={style.tableRow}>{clientsList}</tbody>
         </table>
      )
   }

   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div style={configStyle.tablePosition}>{renderClients()}</div>
         ) : (
            <div>You cannot access this page!</div>
         )}
      </div>
   )
}

export default ClientsTable

const style = {
   //    container: { padding: 30, margin: 30 },
   styledTable: {
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '0.9em',
      fontFamily: 'sans-serif',
      minWidth: '400px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
   },
   headerTable: {
      backgroundColor: ' #009879',
      color: '#ffffff',
      textAlign: 'center',
      padding: '1 20px',
   },
   tableRow: {
      borderBottom: '1px solid #dddddd',
      textAlign: 'center',
   },
   tablePos: {
      display: 'flex',
      justifyContent: 'center',
   },
   space: {
      padding: '0 10px 0 10px',
   },
}
