import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/Faq.css'
import noteContext from '../Context/noteContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Faq = () => {

    const {Api , store , footMain} = useContext(noteContext)
    const [activeCategory, setActiveCategory] = useState('Registration1');
    const [openIndex, setOpenIndex] = useState(null);
    const [data, setData] = useState([])
    const location = useLocation()
    const [footerMain , setFooterMain] = useState(location?.state?.faq)
    const [returnFooter , setReturnFooter] = useState(location?.state?.return)
    const [mainFaq, setMainFaq] = useState([])
    const [subFaq, setSubFaq] = useState([])
    
    

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);        
    };



  
    useEffect(() => {
      const faqData = async (retryCount = 0) => {
        try {
          const response = await axios.get(`${Api}/faqs/getall`, {
            headers: {
              Authorization: `Bearer ${store?.access_token}`
            }
          })
          setMainFaq(response?.data?.faqs)
        }
        catch (error) {
          if (error?.response?.status === 429 && retryCount < 5) {
            
            const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
            console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
            setTimeout(() => faqData(retryCount + 1), retryAfter);
          } else {
            console.error("Failed to fetch profile data:", error.message);
          }
        }
      }
  
      faqData()
      // eslint-disable-next-line
    }, [])
  
    useEffect(() => {
  
      const subFaqData = async (retryCount = 0) => {
        try {
          const response = await axios.get(`${Api}/subfaqs/getall`, {
            headers: {
              Authorization: `Bearer ${store?.access_token}`
            }
          })
          setSubFaq(response?.data?.subfaqs)
        }
        catch (error) {
          if (error?.response?.status === 429 && retryCount < 5) {
            // Retry logic with exponential backoff
            const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
            console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
            setTimeout(() => subFaqData(retryCount + 1), retryAfter);
          } else {
            console.error("Failed to fetch profile data:", error.message);
          }
        }
      }
  
      subFaqData()
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let filter = subFaq?.filter((element) => {
            if (footerMain === "shipping") {
                setActiveCategory("Delivery")
                return element?.faq_name === "Delivery";
            } 
            else if (returnFooter === "returns") {
                setActiveCategory("Returns and Exchange")
                return element?.faq_name === "Returns and Exchange";
            }
            else {
                return element?.faq_name === "Registration1";
            }
        });
    
        setData(filter);
      // eslint-disable-next-line
    }, [subFaq, footMain]);

    
    const handleFilter = (name) => {
        setActiveCategory(name)
        
        let filter = subFaq.filter((element)=> {
            return element.faq_name === name
        })
        setData(filter)
    }

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])


      

  return (
    <>
      <section>
        <div className='mb-5'>
            <div className='ds_faq-bg'>
                <div className="ds_container">
                    <div className="row mt-5">
                        <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
                            <div className='position-relative'>
                                <div>
                                    <img src={require("../Img/dhruvin/faq-img.png")} alt="" width="100%" />
                                </div>
                                <div className='ds_faq-box'>
                                    <p>Browse by Topic</p>
                                    <h2 className='ds_color fw-bold text-uppercase'>Frequently Asked Questions.</h2>
                                    <p className='ds_lh'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* **************  DropDown  ************* */}
      <section>
        <div className=''>
            <div className='ds_faq-drop'>
                <div className="ds_container pt-4">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-4 mt-md-5">
                          <div>
                          {mainFaq.map((element, index) => (
                              <button key={index} className={`ds_drop-btn ds_600 mt-2 ${   activeCategory === element?.name ? 'ds_faq-btn-color' : '' }`} onClick={() => handleFilter(element?.name)}>
                                {element.name}
                              </button>
                               ))}
                          </div>
                         </div>
                         <div className="col-xl-9 col-lg-8 col-md-8 mt-5">
                            <div>
                                <div>
                                <h2 className="ds_color fw-bold text-uppercase mb-4">{activeCategory} </h2>
                                  <div className="ds_faq-drop-box">
                                        {data?.map((item, index) => (
                                                          <div key={index} className={`accordion border-0 position-relative ${openIndex === index ? 'open' : ''}`}>
                                                              <div className={`accordion-header ${data.length - 1 === index ? 'border-0' : ''} ${openIndex === index ? 'ds_accor-shadow ds_accor-question' : ''}`} onClick={() => toggleAccordion(index)}>
                                                                  <h5 className="ds_accor-title mb-0 me-1">{item?.question}</h5>
                                                                  <i className={`fas fa-plus ${openIndex === index ? 'd-none' : ''}`}/>
                                                                  <i className={`fa-solid fa-minus ms-2 text-dark ${openIndex === index ? '' : 'd-none'}`}/>
                                                              </div>
                              
                                                              <div className={`accordion-body ds-transition ${openIndex === index ? '' : 'border-0'}`} style={{     maxHeight: openIndex === index ? '500px' : '0',     padding: openIndex === index ? '10px 0px' : '0px', }}>
                                                                  <div className="px-3 pt-2">
                                                                      <p className="ds_accor-para ds_font ds_lh text-muted">
                                                                          {item?.answer}
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          </div>
                                        ))}
                                    </div>
                                </div>

                              
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Faq
