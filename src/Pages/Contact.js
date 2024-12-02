import React from 'react'
import '../Css/dhruvin/Contact.css'

const Contact = () => {
  return (
    <>
      <section>
        <div>
            <div className='ds_contact-bg'>
                <div className="ds_container">
                    <div className='ds_contact-inner'>
                     <div className='row'>
                        <div className="col-xl-8 col-lg-10 col-md-12 pt-5">
                            <div className='position-relative'>
                               <div>
                                  <img src={require("../Img/dhruvin/contact-bg.png")} alt="" width="100%" />
                               </div>
                               <div className='ds_contact-box'>
                                 <p className='mb-0'>Contact us</p>
                                 <h2 className='ds_color text-uppercase fw-bold'>Leave us a message</h2>
                                 <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                 <div>
                                    <div className="row">
                                        <div className="col-xl-6 mt-4">
                                            <div>
                                               <label htmlFor="" className='d-block ds_600 mb-1'>Name</label> 
                                               <input type="text" className='ds_contact-input' placeholder='Enter Name' />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 mt-4">
                                            <div>
                                               <label htmlFor="" className='d-block ds_600 mb-1'>Email</label> 
                                               <input type="email" className='ds_contact-input' placeholder='Enter Email' />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 mt-4">
                                            <div>
                                               <label htmlFor="" className='d-block ds_600 mb-1'>Subject</label> 
                                               <input type="text" className='ds_contact-input' placeholder='Enter Subject' />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 mt-4">
                                            <div>
                                               <label htmlFor="" className='d-block ds_600 mb-1'>Message</label> 
                                               <textarea class="ds_contact-area" rows="4" placeholder="Write your Meassage...." id="floatingTextarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <button className='ds_contact-btn'>Submit</button>
                                    </div>
                                 </div>
                               </div>
                            </div>
                        </div>
                     </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section>
        <div>
            <div className='ds_contact-card'>
                <div className="ds_container">
                <div className='pb-5'>
                    <div className="row pt-4">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-4">
                            <div className='ds_contact-body h-100 me-xl-3'>
                               <div className='text-center'>
                                  <div className='d-flex justify-content-center'>
                                     <div>
                                       <div className='ds_contact-rot'>
                                        <img src={require("../Img/dhruvin/contact-location.png")} alt="" width="100%" />
                                       </div>
                                     </div>
                                  </div>
                                  <h4 className='ds_color mt-3'>Head Office</h4>
                                  <h5>4140 Parker Rd. Allentown, New Mexico 31134</h5>
                               </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-4">
                            <div className='ds_contact-body h-100 ms-xl-3 me-xl-2'>
                               <div className='text-center'>
                                  <div className='d-flex justify-content-center'>
                                     <div>
                                       <div className='ds_contact-rot'>
                                        <img src={require("../Img/dhruvin/contact-call.png")} alt="" width="100%" />
                                       </div>
                                     </div>
                                  </div>
                                  <h4 className='ds_color mt-3'>Head Office lorem100</h4>
                                  <h5>(207) 555-0119</h5>
                                  <h5>(207) 555-0119</h5>
                               </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-4">
                            <div className='ds_contact-body h-100 ms-xl-4'>
                               <div className='text-center'>
                                  <div className='d-flex justify-content-center'>
                                     <div>
                                       <div className='ds_contact-rot'>
                                        <img src={require("../Img/dhruvin/contact-email.png")} alt="" width="100%" />
                                       </div>
                                     </div>
                                  </div>
                                  <h4 className='ds_color mt-3'>Email us</h4>
                                  <h5>example@gmail.com</h5>
                                  <h5>example@gmail.com</h5>
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

export default Contact
