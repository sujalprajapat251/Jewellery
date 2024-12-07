import React from 'react'
import '../Css/dhruvin/ReturnOrder.css'
import { FaStar } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ReturnOrder = () => {
  return (
    <>
      <section className='mb-5'>
        <div className='mt-4'>
            <div className='ds_container'>
                <div>
                    <div>
                        <h2>Track Order</h2>
                    </div>

                  <div className='mt-4 pt-3 position-relative ds_track-container'>
                    <div className='position-relative'> 
                      <div className='d-flex justify-content-between ds_track-hello'>
                            <div>
                               <div className='ms-4 ps-1'>
                                 <div className='ds_track-round ds_track-active'>
                                   <img src={require("../Img/dhruvin/track-order.png")} alt="" width="100%" />
                                 </div>
                               </div>
                               <h6 className='ds_color mt-3'>Order Confirmed</h6>
                            </div>

                            <div>
                               <div className=''>
                                 <div className='ds_track-round'>
                                   <img src={require("../Img/dhruvin/track-ship.png")} alt="" width="100%" />
                                 </div>
                               </div>
                               <h6 className=' mt-3'>Shipped</h6>
                            </div>

                            <div>
                               <div className='ms-4'>
                                 <div className='ds_track-round'>
                                   <img src={require("../Img/dhruvin/track-truck.png")} alt="" width="100%" />
                                 </div>
                               </div>
                               <h6 className=' mt-3'>Out for delivery</h6>
                            </div>

                            <div>
                               <div className=''>
                                 <div className='ds_track-round'>
                                   <img src={require("../Img/dhruvin/track-deliver.png")} alt="" width="100%" />
                                 </div>
                               </div>
                               <h6 className=' mt-3'>Delivered</h6>
                            </div>
                      </div>

                      <div className='ds_track-border'></div>

                    </div> 
                  </div>

                 <div className='mt-4 pt-3'>
                    <div>
                      <h2>Product Details</h2>
                    </div>
                    <div>
                    <div className='ds_track-overflow mt-4'>
                        <div className='ds_track-box '>
                          <div> 
                            <div className='px-4'>
                              <div className="row">
                                 <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                    <div>
                                        <h6 className='fw-bold'>Order Details</h6>
                                    </div>
                                 </div>
                                 <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                    <div>
                                        <h6 className='fw-bold'>Shipping Address</h6>
                                    </div>
                                 </div>
                                 <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                    <div>
                                        <h6 className='fw-bold'>Payment method</h6>
                                    </div>
                                 </div>
                                 <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div>
                                        <h6 className='fw-bold'>Invoice</h6>
                                    </div>
                                 </div>
                              </div>
                            </div>
                            <div className='ds_track-line mt-1'></div>
                            <div className="row px-4 mt-4">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                                    <div>
                                        <div className='d-flex ds_track-manage'>
                                          <div className='ds_track-center'>
                                              <img className='ds_oder-img' src={require("../Img/dhruvin/ring.png")} alt="" />
                                              <p className='ds_tcolor mb-0 ds_track-mini'>Order Id : <span className='ds_color'>12057598140</span></p>
                                          </div>
                                          <div className='ds_cart-deta mt-xl-0 mt-2'>
                                             <h6>Dual Tone Halo Diamond Finger Ring</h6>
                                             <h6 className='mb-0'><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h6>
                                             <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'> Silver</span>  <span className='ds_tcolor ms-4'>Size : </span> <span className='ds_color'>5</span></p>
                                             <p className='ds_tcolor mb-0'>Diamond Quality:  <span className='ds_color'>FG / VVS-VS</span></p>
                                             <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>PD00003-14-RS-FGVVSVS</span></p>
                                             <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> 925 Silver</span></p>
                                             <p className='ds_tcolor mb-0'>Size : <span className='ds_color'> 5</span></p>
                                             <p className='ds_tcolor mb-0'>Order Date : <span className='ds_color'> 10 Oct 2023</span></p>
                                          </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 ">
                                    <div>
                                      <h6 className='fw-bold'>Johan Patel</h6>
                                      <p className='ds_600 mb-1'>+91 8541200236</p>
                                      <p className='ds_600' style={{whiteSpace:"wrap"}}>510, Shelley Street, Sydney, NSW 2000, dgdf, ruhwbd, Perth 650145, Australia</p>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 ">
                                    <div>
                                        <h6 className='fw-bold'>Debit Card</h6>
                                        <p className='ds_tcolor mb-0'>Card Name : <span className='ds_color'> American Express</span></p>
                                        <p className='ds_tcolor mb-0'>Transaction Id :  <span className='ds_color'> 2154786787</span></p>
                                        <p className='ds_tcolor mb-0'>Payment Status : <span className='ds_color'>  Success</span></p>
    
                                    </div>
                                </div>

                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">
                                    <div className='d-flex flex-column h-100'>
                                        <h6 className='fw-bold'>
                                            <Link to="" className='text-dark'>Download Invoice</Link>
                                        </h6>
                                        <div className='mt-auto mb-3'>
                                            <button className='ds_track-cancel' data-bs-toggle="modal" data-bs-target="#returnOrder">Return Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div> 
                        </div>
                    </div>
                  </div>
                 </div>

                 <div className='mt-5'>
                   <div>
                      <h2>Review & Feedback</h2>
                   </div>
                       <div className='ds_review-box mt-4'>
                            <div>
                                <div className='px-4'>
                                   <h6 className='ds_600 mb-0'>Overall Rating</h6>
                                   <FaStar className='me-1 ds_review-color' />
                                   <FaStar className='me-1 ds_review-color' />
                                   <FaStar className='me-1 ds_review-color' />
                                   <FaStar className='me-1 ds_review-color' />
                                   <FaStar className='me-1' />
                                </div>
                                <div className='ds_review-line mt-2'></div>
                                <div className='px-4 mt-3'>
                                    <h6 className='ds_600 mb-0'>Add Photo or Video</h6>
                                    <div className='d-flex mt-2'>
                                        <div className='ds_review-inner position-relative'>
                                            <img src={require("../Img/dhruvin/ring.png")} alt="" width="100%"/>
                                            <IoMdClose className='ds_review-cancel-icon' />
                                        </div>
                                        <div className='ds_review-add'>
                                           <FiPlus className='ds_review-plus' />
                                        </div>
                                    </div>
                                </div>
                                <div className='ds_review-line mt-3'></div>
                                <div className='px-4 mt-3'>
                           <h6 className='ds_600 mb-0'>Feedback</h6>
                           <div className="form-floating mt-2">
                              <textarea className="form-control ds_review-area" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                              <label htmlFor="floatingTextarea">Write your feedback</label>
                            </div>
                            <div className='mt-4 pt-2 mb-2'>
                               <button className='ds_review-submit '>Submit</button>
                            </div>
                                </div>
                           </div>
                       </div>
                 </div>
                </div>
            </div>
        </div>
      </section> 

      {/* ********************  Return Order Popup  ********* */}
      <section>
        <div>
          <div className="modal fade" id="returnOrder"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  ds_return-popup  modal-dialog-centered">
              <div className="modal-content" style={{borderRadius:'0'}}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 px-5">
                   <h4 className="modal-title text-center ds_color fw-bold" >Return Order</h4>
                   <div className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Order ID*</label>
                                 <input type="text" className='ds_new-input' placeholder="Enter order ID" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Reason for return*</label>
                               <input type="text" className='ds_new-input' placeholder="Enter reason for return" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Mobile No.*</label>
                               <input type="text" className='ds_new-input' placeholder="Enter mobile no." />
                             </div>
                         </div>
                     </div>
                     <div>
                       <div className="row justify-content-center">
                         <div className="col-xl-12 mt-5 mb-3">
                           <div>
                              <button className='ds_new-save w-100' data-bs-toggle="modal" data-bs-target="#returnOrderOtp">Request for OTP</button>
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

      {/* ********************  Return Order With OTP Popup  ********* */}
      <section>
        <div>
          <div className="modal fade" id="returnOrderOtp"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  ds_return-popup  modal-dialog-centered">
              <div className="modal-content" style={{borderRadius:'0'}}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 px-sm-5">
                   <h4 className="modal-title text-center ds_color fw-bold" >Return Order</h4>
                   <div className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Order ID*</label>
                                 <input type="text" className='ds_new-input' placeholder="Enter order ID" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Reason for return*</label>
                               <input type="text" className='ds_new-input' placeholder="Enter reason for return" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Mobile No.*</label>
                               <input type="text" className='ds_new-input' placeholder="Enter mobile no." />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Enter OTP</label>
                               <div className='d-flex justify-content-between'>
                                   <input type="text" className='ds_return-otp-input'/>
                                   <input type="text" className='ds_return-otp-input'/>
                                   <input type="text" className='ds_return-otp-input'/>
                                   <input type="text" className='ds_return-otp-input'/>
                                   <input type="text" className='ds_return-otp-input'/>
                                   <input type="text" className='ds_return-otp-input'/>
                               </div>
                             </div>
                         </div>

                        
                     </div>
                     <div>
                       <div className="row justify-content-center">
                         <div className="col-xl-12 mt-5 mb-3">
                           <div>
                              <button className='ds_new-save w-100'>Request for OTP</button>
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
    </>
  )
}

export default ReturnOrder
