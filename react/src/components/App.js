import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AdminPage from './admin/AdminPage'
import LoginPage from './login/LoginPage'
import EditClient from './admin/EditClient'
import AddClient from './admin/AddClient'
import DeviceEdit from './admin/DeviceEdit'
import DeviceTable from './admin/DeviceTable'
import DeviceAdd from './admin/DeviceAdd'
import SensorTable from './admin/SensorTable'
import SensorEdit from './admin/SensorEdit'
import SensorAdd from './admin/SensorAdd'
import AddSensorToDevice from './admin/AddSensorToDevice'
import ClientPage from './client/ClientPage'
import AddDeviceToClient from './admin/AddDeviceToClient'
import MenuBarClient from './MenuBarClient'
import SensorDetails from './client/SensorDetails'
import Charts from './Charts'
import EnergyConsumption from './client/EnergyConsumption'
import EnergyConsumptionChart from './client/EnergyConsumptionChart'
import MenuBarAdmin from './MenuBarAdmin'
import NotificationClient from './client/NotificationClient'
import Teest from './Teest'
import EnergyConsumtionFilter from './client/EnergyConsumptionFilter'
import EnergyAvarageConsumption from './client/EnergyAvarageConsumption'
import ProgramDuration from './client/ProgramDuration'

const App = (props) => {
   const user = localStorage.getItem('USER')

   return (
      <BrowserRouter>
         {user === 'ADMINISTRATOR' ? (
            <Route path="" render={() => <MenuBarAdmin />} />
         ) : user === 'CLIENT' ? (
            <Route path="" render={() => <MenuBarClient />} />
         ) : null}

         <Switch>
            <Route
               path="/"
               exact
               component={LoginPage}
               // render={() => <LoginPage logout={logout} />}
            />
            {/* DOAR PENTRU TEST */}
            <Route path="/chart" exact component={Charts} />
            {/* DOAR PENTRU TEST */}
            <Route path="/admin" exact component={AdminPage} />
            <Route
               path="/consumption/:id"
               exact
               component={EnergyConsumption}
            />
            <Route path="/editclient/:id" exact component={EditClient} />
            <Route
               path="/chart/:id/:date"
               exact
               component={EnergyConsumptionChart}
            />
            <Route path="/addclient" exact component={AddClient} />
            <Route path="/editdevice/:id" exact component={DeviceEdit} />
            <Route path="/device" exact component={DeviceTable} />
            <Route path="/adddevice" exact component={DeviceAdd} />
            <Route path="/addsensor" exact component={SensorAdd} />
            <Route path="/editsensor/:id" exact component={SensorEdit} />
            <Route
               path="/notification/:id"
               exact
               component={NotificationClient}
            />
            <Route path="/sensor" exact component={SensorTable} />
            <Route path="/client" exact component={ClientPage} />
            <Route path="/sensor/details/:id" exact component={SensorDetails} />
            <Route path="/teest" exact component={Teest} />
            <Route
               path="/add/sensortodevice"
               exact
               component={AddSensorToDevice}
            />
            <Route
               path="/add/devicetoclient"
               exact
               component={AddDeviceToClient}
            />{' '}
            <Route
               path="/energy/filter/:id"
               exact
               component={EnergyConsumtionFilter}
            />{' '}
            <Route
               path="/energy/avarage/:id"
               exact
               component={EnergyAvarageConsumption}
            />{' '}
            <Route path="/program/:id" exact component={ProgramDuration} />
         </Switch>
      </BrowserRouter>
   )
}

export default App
