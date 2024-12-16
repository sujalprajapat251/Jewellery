import React, { useContext, useState } from 'react'
import '../Css/dhruvin/ReturnOrder.css'
import { FaStar } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import noteContext from '../Context/noteContext'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import { ReturnOrderSchema } from '../schemas'

const ReturnOrder = () => {

const {Api , store} = useContext(noteContext)

const returnMainData = JSON.parse(localStorage.getItem("ReturnOrder")) || []
// console.log(returnMainData);


// --------------- Return Order Popup -------------
const [returnToggle, setReturnToggle] = useState(false)

const returnOrderVal = {
   order_id:'',
   phone:'',
   reason:''
}

const ReturnOrderFormilk = useFormik({
    initialValues:returnOrderVal,
    validationSchema:ReturnOrderSchema,
    onSubmit: (values , action) => {
        axios.post(`${Api}/verifyMobileNumber`,{
          order_id:values?.order_id,
          phone:values?.phone,
          reason:values.reason
        },
        {
          headers: {
            Authorization: `Bearer ${store?.access_token}`
          }
        }
      )       
    } 
})



// ********** Review & Feedback **********
const [rating, setRating] = useState(0);
const [uploadedImages, setUploadedImages] = useState([]);
const [feedback, setFeedback] = useState("")

const handleRating = (value) => {
  setRating(value); // Update the rating state
};

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files); 
  const uploaded = files.map((file) => URL.createObjectURL(file));
  setUploadedImages([...uploadedImages, ...uploaded]); 
};

const handleRemoveImage = (index) => {
  const updatedImages = uploadedImages.filter((_, i) => i !== index);
  setUploadedImages(updatedImages); 
};

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');

const finalDate = `${year}-${month}-${day}`


const handleReviewSubmit = () => {
  //  const Arr = []
  if (uploadedImages.length === 0 || rating === 0 || feedback === "") {
     alert("Please upload at least one image or video or rating and feedback.");
  }
  else{
     axios.post(`${Api}/reviews/create`,{
      customer_id:returnMainData?.customer_id,
      // product_id:null,
      description:feedback ,
      rating:rating,
      date:finalDate,
      order_id: returnMainData?.id,
      image:uploadedImages
     },
     {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
     } 
    ).then((value)=>{
      console.log(value);
    }).catch((error)=>{
      alert(error)
    })
  }
  
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
                                            <h6 className='fw-bold text-end ds_track-margin mt-2'>
                                                <Link to="" className='text-dark'>Download Invoice</Link>
                                            </h6>
                                       {
                                         returnMainData?.order_items?.map((item , index)=>{
                                            return(
                                              <div className="row px-4 mt-4" key={index}>
                                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                                                  <div>
                                                      <div className='d-flex ds_track-manage'>
                                                        <div className='ds_track-center'>
                                                            <img className='ds_TrackOrder-img' src={item?.image[0]} alt="" />
                                                            <p className='ds_tcolor mb-0 ds_track-mini text-center'>Order Id : <span className='ds_color'>{returnMainData?.order_number}</span></p>
                                                        </div>
                                                        <div className='ds_cart-deta mt-xl-0 mt-2'>
                                                           <h6>{item?.product_name}</h6>
                                                           <h6 className='mb-0'><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h6>
                                                           <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'> {item?.metal_color}</span>  <span className='ds_tcolor ms-4'>Size : </span> <span className='ds_color'>{item?.size}</span></p>
                                                           <p className='ds_tcolor mb-0'>Diamond Quality:  <span className='ds_color'>{item?.diamond_quality}</span></p>
                                                           <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>{item?.sku}</span></p>
                                                           <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> {item?.metal}</span></p>
                                                           <p className='ds_tcolor mb-0'>Order Date : <span className='ds_color'> {returnMainData?.order_date}</span></p>
                                                        </div>
                                                      </div>
                                                  </div>
                                              </div>
              
                                              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 ">
                                                  <div>
                                                    <h6 className='fw-bold'>{returnMainData?.customer_name}</h6>
                                                    <p className='ds_600 mb-1'>+91 {returnMainData?.customer_phone}</p>
                                                    <p className='ds_600' style={{whiteSpace:"wrap"}}>{returnMainData?.delivery_address}</p>
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
                                         })
                                        
                                       }

                                            <div className='text-end ds_track-margin mb-3'>
                                                <button className='ds_track-cancel' onClick={()=> setReturnToggle(true)}>Return Order</button>
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
                                   {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                          key={star}
                                          className={`me-1 ${star <= rating ? 'ds_review-color' : ''}`}
                                          onClick={() => handleRating(star)} style={{cursor: 'pointer',
                                            color: star <= rating ? 'ds_review-color' : '',
                                          }}
                                        />
                                      ))}
                                 </div>
                                <div className='ds_review-line mt-2'></div>
                                <div className='px-4 mt-3'>
                                    <h6 className='ds_600 mb-0'>Add Photo or Video</h6>
                                    <div className='d-flex mt-2'>
                                    {uploadedImages.map((image, index) => (
                                           <div className='ds_review-inner position-relative' key={index}>
                                             <img src={image} alt={`Uploaded ${index}`} width="100%" className='ds_review-upload-img' />
                                             <IoMdClose className='ds_review-cancel-icon' onClick={() => handleRemoveImage(index)}

                                             />
                                           </div>
                                         ))}
                                        <div className='ds_review-add' onClick={() => document.getElementById('imageUploadInput').click()} style={{ cursor: 'pointer' }}>
                                           <FiPlus className='ds_review-plus' />
                                         </div>
                                         <input type="file" id="imageUploadInput" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleImageUpload}/>
                                    </div>
                                </div>
                                <div className='ds_review-line mt-3'></div>
                                <div className='px-4 mt-3'>
                           <h6 className='ds_600 mb-0'>Feedback</h6>
                           <div className="form-floating mt-2">
                              <textarea className="form-control ds_review-area" value={feedback} onChange={(e)=> setFeedback(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                              <label htmlFor="floatingTextarea">Write your feedback</label>
                            </div>
                            <div className='mt-4 pt-2 mb-2'>
                               <button className='ds_review-submit ' onClick={handleReviewSubmit} >Submit</button>
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
        <Modal show={returnToggle} onHide={()=> setReturnToggle(false)} aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header className='mb-0 pb-0 border-0' closeButton>
           </Modal.Header>
           <Modal.Body className='pt-0 px-4'>
           <h4 className="modal-title text-center ds_color fw-bold" >Return Order</h4>
                   <form onSubmit={ReturnOrderFormilk?.handleSubmit} className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Order ID*</label>
                                 <input type="number" name='order_id' value={ReturnOrderFormilk?.values?.order_id} onChange={ReturnOrderFormilk?.handleChange} onBlur={ReturnOrderFormilk?.handleBlur} className='ds_new-input' placeholder="Enter order ID" />
                                 { ReturnOrderFormilk.errors.order_id &&  ReturnOrderFormilk.touched.order_id ? <p className='ds_new-danger mb-0'>{ReturnOrderFormilk.errors.order_id}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Reason for return*</label>
                               <input type="text" name='reason' value={ReturnOrderFormilk?.values?.reason} onChange={ReturnOrderFormilk?.handleChange} onBlur={ReturnOrderFormilk?.handleBlur} className='ds_new-input' placeholder="Enter reason for return" />
                               { ReturnOrderFormilk.errors.reason &&  ReturnOrderFormilk.touched.reason ? <p className='ds_new-danger mb-0'>{ReturnOrderFormilk.errors.reason}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Mobile No.*</label>
                               <input type="number" name='phone' value={ReturnOrderFormilk?.values?.phone} onChange={ReturnOrderFormilk?.handleChange} onBlur={ReturnOrderFormilk?.handleBlur} className='ds_new-input' placeholder="Enter mobile no." />
                               { ReturnOrderFormilk?.errors?.phone &&  ReturnOrderFormilk.touched.phone ? <p className='ds_new-danger mb-0'>{ReturnOrderFormilk.errors.phone}</p> : null}
                             </div>
                         </div>
                     </div>
                     <div>
                       <div className="row justify-content-center">
                         <div className="col-xl-12 mt-5 mb-3">
                           <div>
                              <button type='submit' className='ds_new-save w-100'>Request for OTP</button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </form>
           </Modal.Body>
         </Modal>
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
