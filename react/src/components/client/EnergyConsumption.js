import React from 'react'

const EnergyConsumption = (props) => {
   const sensorId = props.match.params.id
   return <div>{sensorId}</div>
}

export default EnergyConsumption
