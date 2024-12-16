import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/TrackOrder.css'
import ReviewFeedback from './ReviewFeedback'
import { Link } from 'react-router-dom'
import noteContext from '../Context/noteContext'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

const TrackOrder = () => {

const {trackData , Api , store} = useContext(noteContext)
const [trackPopup, setTrackPopup] = useState(false)
const [trackId, setTrackId] = useState(null)

let data = JSON.parse(localStorage.getItem("TrackOrder")) || [];

// console.log("TrackData ", data);

const handleCancelOrder = (id) => {
     setTrackPopup(true)
     setTrackId(id)     
}


// ********** Reason For Cencellation Popup **********

const [reasonPopData, setReasonPopData] = useState([])
const [checkData, setCheckData] = useState("")

useEffect(()=>{
  axios.get(`${Api}/reasonCancellation/getall`,{
    headers: {
      Authorization: `Bearer ${store?.access_token}`
    }
  }).then((value)=>{
    // console.log("Reason " , value?.data?.reasonCancellation.filter((element)=> element.status === 'active'));
    setReasonPopData(value?.data?.reasonCancellation.filter((element)=> element.status === 'active'))
  })
},[])


// ************* Order cancelled Popup ************ 
const [orderCancel, setOrderCancel] = useState(false)

const handleContinue = () => {
     setTrackPopup(false)
     setOrderCancel(true)

     axios.post(`${Api}/order/updatestatus/${trackId}`,{
      order_status:'cancelled',
      reason:checkData
     } ,
     {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
     }
     ).then((value)=>{
       console.log("Response " , value);
     }).catch((error)=>{
       alert(error)
     })  
}

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
                           { data?.map((element , index)=>{
                            console.log(element);
                            
                             return (
                                        <div key={index}> 
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
                                          {element?.order_items?.map((item)=>{
                                             return (
                                              <div className="row px-4 mt-4">
                                                 <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                                                     <div>
                                                         <div className='d-flex ds_track-manage'>
                                                           <div className='ds_track-center'>
                                                               <img className='ds_TrackOrder-img' src={item?.image[0]} alt="" />
                                                               <p className='ds_tcolor mb-0 ds_track-mini text-center'>Order Id : <span className='ds_color'>{element?.order_number}</span></p>
                                                           </div>
                                                           <div className='ds_cart-deta mt-xl-0 mt-2'>
                                                              <h6>{item?.product_name}</h6>
                                                              <h6 className='mb-0'><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h6>
                                                              <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'> {item?.metal_color}</span>  <span className='ds_tcolor ms-4'>Size : </span> <span className='ds_color'>{item?.size}</span></p>
                                                              <p className='ds_tcolor mb-0'>Diamond Quality:  <span className='ds_color'>{item?.diamond_quality}</span></p>
                                                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>{item?.sku}</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> {item?.metal}</span></p>
                                                              <p className='ds_tcolor mb-0'>Order Date : <span className='ds_color'> {element?.order_date}</span></p>
                                                           </div>
                                                         </div>
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 ">
                                                     <div>
                                                       <h6 className='fw-bold'>{element?.customer_name}</h6>
                                                       <p className='ds_600 mb-1'>+91 {element?.customer_phone}</p>
                                                       <p className='ds_600' style={{whiteSpace:"wrap"}}>{element?.delivery_address}</p>
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
                                                  <button className='ds_track-cancel' onClick={()=> handleCancelOrder(element?.id)}>Cancel Order</button>
                                              </div>
                                          </div>
                                       </div> 
                                      )
                                   })}
                          
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
        <Modal  show={trackPopup} onHide={()=> setTrackPopup(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className='pb-0 border-0'>
            </Modal.Header>
            <Modal.Body className='pt-0 px-4'>
                     <div>
                         <h4 className='text-center ds_color'>Reason for Cancellation</h4>
                         <div className='mt-4 pt-2'>
                            {reasonPopData?.map((element , index)=>{
                              //  console.log("resDAta " , element);
                               
                              return (
                                  <div key={index} className='d-flex justify-content-between mb-2'>
                                    <label className="form-check-label ds_cancel-label ds_600" htmlFor="exampleRadios1">{element?.name}</label>
                                    <input className=" ds_cancel-check" onClick={()=> setCheckData(element?.name)} type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                                  </div>
                              )
                            })}
                            <div className='text-ceter mx-4 mt-4 pt-3 mb-3'>
                                <button className='ds_cancel-btn' onClick={()=> handleContinue()}>Continue</button>
                            </div>
                         </div>
                       </div>
            </Modal.Body>
         </Modal>
        </div>
      </section>

      {/* ************* Order cancelled ************ */}
      <section>
        <div>
        <Modal show={orderCancel} onHide={()=> setOrderCancel(false)} aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-vcenter">
               Modal heading
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <h4>Centered Modal</h4>
             <p>
               Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
               dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
               consectetur ac, vestibulum at eros.
             </p>
           </Modal.Body>
        </Modal>
        </div>
      </section>


      
    </>
  )
}

export default TrackOrder
