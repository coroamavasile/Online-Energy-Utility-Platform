import React from 'react'
import ClientsTable from './ClientsTable'

const AdminPage = (props) => {
   return (
      <div>
         {localStorage.getItem('USER') === 'ADMINISTRATOR' ? (
            <div>
               <ClientsTable />
            </div>
         ) : (
            <div>You cannot access this page</div>
         )}
      </div>
   )
}

export default AdminPage
