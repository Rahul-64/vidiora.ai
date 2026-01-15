'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { Userdetailcontext } from '@/context/Userdetailcontext'

const Provider = ({children} : {children : React.ReactNode}) => {
  
  const [newuser , setnewuser] = useState(null);


  useEffect(
    () => {CreateNewUser()}
    , [])

  const CreateNewUser = async () =>{
    const result = await axios.post('/api/Users' , {});
    console.log(result.data); 
    setnewuser(result?.data);
  }
  
  
  return (
    <div>
      <Userdetailcontext.Provider value={{newuser , setnewuser}}>

      {children}
      </Userdetailcontext.Provider>
      </div>
  )
}

export default Provider