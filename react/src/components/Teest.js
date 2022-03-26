import React from 'react'
import axiosInstance from './apis/axios'
import axios from 'axios'

const Teest = (props) => {
   const submitHandler = () => {
      const body = {
         id: 1,
         jsonrpc: '2.0',
         method: 'method2',
         params: { param1: 'dada' },
      }
      // const response = await fetch('http://localhost:8080/calculator', body)
      //   const response = await axios.post(
      //      'http://localhost:8080/calculator',
      //      {
      //         id: 1,
      //         jsonrpc: '2.0',
      //         method: 'method2',
      //         params: { param1: 'eqw' },
      //      },
      //      {
      //         headers: {
      //            'Content-Type': 'application/json',
      //            'Access-Control-Allow-Origin': '*',
      //         },
      //      }
      //   )
      //   console.log(response)
      console.log(body)

      axios
         .post('http://localhost:8080/calculator', body, {
            headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
            },
         })
         .then((response) => {
            console.log(response)
         })
         .catch((err) => console.log(err))

      //   console.log(response)

      //   const response = axiosInstance.post('/calculator', body)

      //   try {
      //      const response = await axios.post(
      //         'http://localhost:8080/calculator',
      //         {
      //            jsonrpc: '2.0',
      //            id: +new Date(),
      //            method: 'method2',
      //            params: { param1: 'dada' },
      //         },
      //         {
      //            headers: {
      //               'Content-Type': 'application/json',
      //               'Access-Control-Allow-Origin': '*',
      //            },
      //         }
      //      )

      //      console.log(response.data)
      //   } catch (error) {
      //      console.error(error)
      //   }

      //   const response = await axiosInstance.post(
      //      '/calculator',
      //      {
      //         jsonrpc: '2.0',
      //         id: +new Date(),
      //         method: 'method2',
      //         params: { param1: 'dada' },
      //      },
      //      {
      //         headers: {
      //            'Content-Type': 'application/json',
      //            'Access-Control-Allow-Origin': '*',
      //         },
      //      }
      //   )
      //   console.log(response)
   }

   return (
      <div>
         <button
            onClick={() => {
               submitHandler()
            }}
         >
            TEST REQUEST
         </button>
      </div>
   )
}

export default Teest
