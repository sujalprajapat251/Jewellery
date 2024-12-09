import React, { useState } from 'react'
import noteContext from './noteContext'

const UseContext = (props) => {


  const Api = 'https://shreekrishnaastrology.com/api'

  

  return (
      <noteContext.Provider value={{Api}}>   
        {props.children}
      </noteContext.Provider>
  )
}

export default UseContext
