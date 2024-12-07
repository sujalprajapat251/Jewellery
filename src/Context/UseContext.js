import React from 'react'
import noteContext from './noteContext'

const UseContext = (props) => {

 let a = 10;
 let Arr = [1,2,3,4,5]

 const hello  = (data) => {
    console.log("I Am Context");
        
 }

  return (
      <noteContext.Provider value={{a , Arr , hello}}>   
        {props.children}
      </noteContext.Provider>
  )
}

export default UseContext
