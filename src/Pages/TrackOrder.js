import React, { useContext } from 'react'
import '../Css/dhruvin/TrackOrder.css'
import ReviewFeedback from './ReviewFeedback'
import { Link } from 'react-router-dom'
import noteContext from '../Context/noteContext'

const TrackOrder = () => {

const {filteredOrders} = useContext(noteContext)
console.log(filteredOrders?.map((element)=>{
    return element
}));


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
                              <h6 className='fw-bold text-end ds_track-margin pe-4 mt-2'>
                                  <Link to="" className='text-dark'>Download Invoice</Link>
                              </h6>
                            {filteredOrders?.map((element)=>{
                                
                               return (
                                <div className="row px-4 mt-4">
                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                                       <div>
                                           <div className='d-flex ds_track-manage'>
                                             <div className='ds_track-center'>
                                                 <img className='ds_TrackOrder-img' src={require("../Img/dhruvin/ring.png")} alt="" />
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
                                   {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">
                                       
                                   </div> */}
                            </div>
                               )
                            })}
                            <div className='d-flex flex-column h-100'>
                                        
                                        <div className='text-end ds_track-margin mb-2'>
                                            <button className='ds_track-cancel' data-bs-toggle="modal" data-bs-target="#cancelOrder">Cancel Order</button>
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


      {/* ************* Cancel Order Popup ************ */}
      <section>
        <div>
             <div className="modal fade" id="cancelOrder" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog ds_cancel-dialog modal-dialog-centered">
                 <div className="modal-content">
                   <div className="modal-header pb-0 border-0">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="modal-body pt-0 px-4">
                       <div>
                         <h4 className='text-center ds_color'>Reason for Cancellation</h4>
                         <div className='mt-4 pt-2'>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios1"> I was hopping for a shorter delivery time </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios2"> Price of the product has now decreased </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios3"> I want to change the delivery address </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios4"> I’m worried about the ratings/reviews </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios5"> I want to change the payment option </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios5" value="option5" />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios6"> I want to change the contact details </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios6" value="option6" />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                 <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios7"> My reason are not listed here </label>
                                  <input className=" ds_cancel-check" type="radio" name="exampleRadios" id="exampleRadios7" value="option7" />
                            </div>
                            <div className='text-ceter mx-4 mt-4 pt-3 mb-3'>
                                <button className='ds_cancel-btn' data-bs-toggle="modal" data-bs-target="#cancelled">Continue</button>
                            </div>
                         </div>
                       </div>
                   </div>
                   
                 </div>
               </div>
            </div>
        </div>
      </section>

      {/* ************* Order cancelled ************ */}
      <section>
        <div>
             <div className="modal fade" id="cancelled" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div className="modal-dialog ds_cancel-dialog modal-dialog-centered">
                 <div className="modal-content">
                   <div className="modal-header pb-0 border-0">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="modal-body pt-0 px-4">
                       <div>
                         <h4 className='text-center ds_color'>Order Cancelled</h4>
                         <div className='mt-4 pt-3'>
                            <div className='text-center'>
                               <img src={require("../Img/dhruvin/order-cancel.png")} alt="" width="40%" />
                               <h6 className='ds_tcolor mt-4'>Your order has been cancelled successfully.</h6>
                            </div>
                            <div className='text-ceter mx-4 mt-4 pt-3 mb-3'>
                                <button className='ds_cancel-btn'>Back To Home</button>
                            </div>
                         </div>
                       </div>
                   </div>
                   
                 </div>
               </div>
            </div>
        </div>
      </section>


      {/* ##########  Review Feedback  ########### */}
      <ReviewFeedback/>
    </>
  )
}

export default TrackOrder
