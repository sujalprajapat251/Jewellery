import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/noteContext'
import axios from 'axios'

const Privacy = () => {

const {Api , store} = useContext(noteContext)

const [data, setData] = useState([])

useEffect(() => {
  const fetchData = async () => {
    const maxRetries = 3; 
    const retryDelay = 2000; 

    const getRequest = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${Api}/privacypolicies/getall`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        });
        // console.log("Privacy", response.data.data);
        setData(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < maxRetries) {
          console.warn(`Retrying... Attempt ${retryCount + 1}`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay)); 
          return getRequest(retryCount + 1);
        } else {
          const errorMessage = error.response
            ? `Error: ${error.response.status} - ${error.response.data.message || "Too Many Requests"}`
            : `Error: ${error.message}`;
          alert(errorMessage);
          console.error(errorMessage);
        }
      }
    };

    await getRequest(); 
  };

  fetchData();
  // eslint-disable-next-line
}, []);
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
