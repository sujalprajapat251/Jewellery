import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/noteContext'
import axios from 'axios'

const Privacy = () => {

const {Api , store} = useContext(noteContext)

const [data, setData] = useState([])

useEffect(()=>{
   axios.get(`${Api}/privacypolicies/getall`,{
     headers: {
       Authorization: `Bearer ${store?.access_token}`
     }
   }).then((value)=>{
      console.log("Privacy " , value.data.data);
      setData(value.data.data)
   }).catch((error)=>{
      alert(error)
   })
},[])

  return (
    <>
            <section className='mb-5 pb-3'>
        <div className='ds_container'>
          <div className='mt-5'>
             <div className='text-center'>
                 <h2 className='ds_color fw-bold text-uppercase'>Privacy policy</h2>
                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
             </div>
             <div className='mt-sm-5 mt-4 '>
               {
                 data?.map((element , index)=>{
                   return (
                       <div className='pt-sm-3' key={index}>
                          <h2 className='ds_color fw-bold text-uppercase'>{element?.title}</h2>
                          <p className='ds_lh'>{element?.description}</p>
                      </div>
                   )
                 })
               }
                  
             </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Privacy
