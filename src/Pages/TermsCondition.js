import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/noteContext'

const TermsCondition = () => {

const {Api , store} = useContext(noteContext) 

const [data, setData] = useState([])

useEffect(() => {
  const fetchTermsAndConditions = async (retries = 3, delay = 1000) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        const response = await axios.get(`${Api}/termconditions/getall`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        });
        console.log("Terms:", response.data.data);
        setData(response.data.data);
        return; 
      } catch (error) {
        if (error.response?.status === 429 && attempt < retries - 1) {
          attempt++;
          const waitTime = delay * 2 ** attempt; 
          console.warn(`Retrying in ${waitTime}ms... (Attempt ${attempt + 1})`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        } else {
          console.error("Error fetching terms and conditions:", error);
          alert(`Failed to fetch terms and conditions: ${error.message}`);
          return; 
        }
      }
    }
  };

  fetchTermsAndConditions();
}, []);


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
