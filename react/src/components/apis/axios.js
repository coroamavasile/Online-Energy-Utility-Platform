import axios from 'axios'

export default axios.create({
   //------------------------------HEROKU-API---------------------------//
   baseURL: 'https://ds2021-coroama-vasile-2b.herokuapp.com/',
   // baseURL: 'https://ds2021-30644-coroama-vasile-1b.herokuapp.com/',
   //------------------------------------------------------------------//
   //-----------------------------------------------------------------//
   //----------------localhost---------------------------------------//
   // baseURL: 'http://localhost:8080/',
   //--------------------------------------------------------------//
   headers: {
      post: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         // 'Access-Control-Allow-Headers':
         //    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      },
   },
})
