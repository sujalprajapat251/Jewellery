import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/noteContext'

const TermsCondition = () => {

const {Api , store} = useContext(noteContext) 

const [data, setData] = useState([])

useEffect(()=>{
   axios.get(`${Api}/termconditions/getall`,{
     headers: {
       Authorization: `Bearer ${store?.access_token}`
     }
   }).then((value)=>{
      console.log("Terms " , value.data.data);
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
                 <h2 className='ds_color fw-bold text-uppercase'>Terms and Conditions</h2>
                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
             </div>
             <div className='mt-sm-5 '>
              {data?.map((element)=>{
                return (
                   <div className='pt-4'>
                      <h2 className='ds_color fw-bold text-uppercase'>{element?.title}</h2>
                      <p className='mb-2 ds_lh'>{element?.description}</p>
                  </div>
                )
              })}
             </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsCondition
