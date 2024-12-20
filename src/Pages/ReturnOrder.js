import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Css/dhruvin/ReturnOrder.css'
import { FaStar } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import noteContext from '../Context/noteContext'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'

const ReturnOrder = () => {
  

const {Api , store , returnOrderData} = useContext(noteContext)

const returnMainData = JSON.parse(localStorage.getItem("ReturnOrder")) || []
// console.log(returnMainData);

const ReturnOrderKey = JSON.parse(localStorage.getItem("ReturnOrderKey")) || null

const [returnData, setReturnData] = useState([])
const [prodID, setProdID] = useState([])

useEffect(()=>{
  axios.post(`${Api}/order/getbyuserid`,
    {
       customer_id:1
    },
    {
    headers: {
      Authorization: `Bearer ${store?.access_token}`
    }
   }) .then((value) => {
    const data = value?.data?.orders?.filter(
      (element) => element?.order_number === ReturnOrderKey
    );    
    const First = data?.map((element)=> element?.order_items)
    const Second = First[0]?.map((element)=> element?.product_id)
    // console.log("Fliter" , new Set(Second) );
    setProdID([...new Set(Second)]);
    setReturnData(data)
    
  }).catch((error)=>{
      alert(error)
   })
},[returnOrderData])


// console.log("Hello ", prodID);


// --------------- Return Order Popup -------------
const [returnToggle, setReturnToggle] = useState(false)
const [returnPopup, setReturnPopup] = useState({
     order_id:'',
     phone:'',
     reason:''
})

const [returnOtpToggle, setReturnOtpToggle] = useState(false)


const handleRequestOtp = (e) => {
    e.preventDefault();

    axios.post(`${Api}/verifyMobileNumber`,{
      order_id:returnPopup?.order_id,
      phone:`${returnPopup?.phone}`,
      reason:returnPopup?.reason,
    },
    {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }
    ).then((value)=>{
      console.log(value);
      // setReturnToggle(false)
      // setReturnOtp(true)
      setReturnOtpToggle(true)
    }).catch((error)=>{
      alert(error)
    })  
}





// ---------------  Return Order With OTP Popup  ------------------- }
const [returnOtp, setReturnOtp] = useState(false)

const [returnOtpVal, setReturnOtpVal] = useState({
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:''
})

const MergeOtp = returnOtpVal.otp1 +  returnOtpVal.otp2 + returnOtpVal.otp3 + returnOtpVal.otp4 + returnOtpVal.otp5 + returnOtpVal.otp6

const otpRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

const handleOtpChange = (e, index) => {
  const { value } = e.target;
  if (!/^\d?$/.test(value)) return; // Allow only digits
  const updatedOtpVal = { ...returnOtpVal, [`otp${index + 1}`]: value };
  setReturnOtpVal(updatedOtpVal);

  // Move to next field if input is filled
  if (value && index < 5) {
    otpRefs.current[index + 1].current.focus();
  }
};

const handleBackspace = (e, index) => {
  if (e.key === "Backspace" && !returnOtpVal[`otp${index + 1}`] && index > 0) {
    otpRefs.current[index - 1].current.focus();
  }
};

const returnOtpFormik = useFormik({
  initialValues: returnOtpVal,
  onSubmit: (values, action) => {
    console.log("Otp Data", values);
  },
});


const handleConfirmReturn = (e) => {
   e.preventDefault();
   if(returnPopup.order_id === "" || returnPopup.reason === "" || returnPopup.phone.length !== 10 || !/^\d{10}$/.test(returnPopup.phone || returnOtpVal.otp1 === "" || returnOtpVal.otp2 === "" || returnOtpVal.otp3 === "" || returnOtpVal.otp4 === "" || returnOtpVal.otp5 === "" || returnOtpVal.otp6 === "")){
      alert("Please All Field The Proper Fill")
   }
   else{
     axios.post(`${Api}/returnorder/create`,{
       order_id:returnPopup.order_id,
       stock_id: null,
       product_id: null,
       customer_id:store?.id,
       return_date:finalDate,
       return_status:"pending",
       price:returnData[0]?.total_amount,
       phone:returnPopup.phone,
       otp:MergeOtp,
     },
     {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
     }
    ).then((value)=>{
         console.log("Final Val " , value);
         setReturnToggle(false)
     }).catch((error)=>{
       alert(error)
     })
   }
}




// ********** Review & Feedback **********
const [rating, setRating] = useState(0);
const [uploadedImages, setUploadedImages] = useState([]);
const [feedback, setFeedback] = useState("")

const handleRating = (value) => {
  setRating(value); // Update the rating state
};

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  const newImages = files.map((file) => ({
    file, // Store the actual file object
    preview: URL.createObjectURL(file), // Local preview URL
  }));
  setUploadedImages((prevImages) => [...prevImages, ...newImages]);
};

const handleRemoveImage = (index) => {
  setUploadedImages((prevImages) => {
    const updatedImages = prevImages.filter((_, i) => i !== index);
    prevImages.forEach((image, i) => {
      if (i === index) URL.revokeObjectURL(image.preview); // Clean up
    });
    return updatedImages;
  });
};

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');

const finalDate = `${year}-${month}-${day}`

// console.log("data " , returnData[0]?.customer_id);
// console.log("Pro " , prodID);


const handleReviewSubmit = () => {
  if (!rating || !feedback || uploadedImages.length === 0) {
    alert("Please upload an image, provide a rating, and add feedback.");
    return;
  }

  const formData = new FormData();
  formData.append("customer_id", returnData[0]?.customer_id);
  formData.append("description", feedback);
  formData.append("rating", rating);
  formData.append("date", finalDate);
  formData.append("order_id", returnData[0]?.id);

  // Assuming `uploadedImages` contains an array of objects with the image URL
  uploadedImages.forEach((image, index) => {
    // console.log(image);
    
 if (image.file) {
      console.log(image.file);
      
      formData.append(`image[${index}]`, image?.file); // Append binary file
    }
  });

    prodID.forEach((element, index) => {
    formData.append(`product_id[${index}]`, element);
   });
  

  axios
    .post(`${Api}/reviews/create`, formData, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      alert("Review submitted successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Failed to submit the review.");
    });
};


useEffect(() => {
  return () => {
    uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview)); // Clean up on unmount
  };
}, [uploadedImages]);


console.log(returnData);
console.log(prodID);




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
                                         returnData[0]?.order_items?.map((item , index)=>{
                                              
                                            return(
                                              <div className="row px-4 mt-4" key={index}>
                                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 ">
                                                  <div>
                                                      <div className='d-flex ds_track-manage'>
                                                        <div className='ds_track-center'>
                                                            <img className='ds_TrackOrder-img' src={item?.image[0]} alt="" />
                                                            <p className='ds_tcolor mb-0 ds_track-mini text-center'>Order Id : <span className='ds_color'>{returnData[0]?.order_number}</span></p>
                                                        </div>
                                                        <div className='ds_cart-deta mt-xl-0 mt-2'>
                                                           <h6>{item?.product_name}</h6>
                                                           <h6 className='mb-0'><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h6>
                                                           <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'> {item?.metal_color}</span>  <span className='ds_tcolor ms-4'>Size : </span> <span className='ds_color'>{item?.size}</span></p>
                                                           <p className='ds_tcolor mb-0'>Diamond Quality:  <span className='ds_color'>{item?.diamond_quality}</span></p>
                                                           <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>{item?.sku}</span></p>
                                                           <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> {item?.metal}</span></p>
                                                           <p className='ds_tcolor mb-0'>Order Date : <span className='ds_color'> {returnData[0]?.order_date}</span></p>
                                                        </div>
                                                      </div>
                                                  </div>
                                              </div>
              
                                              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 ">
                                                  <div>
                                                    <h6 className='fw-bold'>{returnData[0]?.customer_name}</h6>
                                                    <p className='ds_600 mb-1'>+91 {returnData[0]?.customer_phone}</p>
                                                    <p className='ds_600' style={{whiteSpace:"wrap"}}>{returnData[0]?.delivery_address}</p>
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
                                    {uploadedImages.map((image, index)=> {
                                         return(
                                          <div className='ds_review-inner position-relative' key={index}>
                                             <img src={image?.preview} alt={`Uploaded ${index}`} width="100%" className='ds_review-upload-img' />
                                             <IoMdClose className='ds_review-cancel-icon' onClick={() => handleRemoveImage(index)}

                                             />
                                           </div>
                                         )
                                      })}
                                           
                                          
                                        
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
                   <div className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Order ID*</label>
                                 <input type="number" name='order_id' value={returnPopup.order_id} onChange={(e)=> setReturnPopup({...returnPopup , order_id:e.target.value})}  className='ds_new-input' placeholder="Enter order ID" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Reason for return*</label>
                               <input type="text" name='reason' value={returnPopup.reason} onChange={(e)=> setReturnPopup({...returnPopup , reason:e.target.value})} className='ds_new-input' placeholder="Enter reason for return" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Mobile No.*</label>
                               <input type="number" name='phone' value={returnPopup.phone} onChange={(e)=> setReturnPopup({...returnPopup , phone:e.target.value})} className='ds_new-input' placeholder="Enter mobile no." />
                             </div>
                         </div>
                         {returnOtpToggle &&
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                            <div>
                              <label htmlFor="" className='ds_600 mb-1'>Enter OTP</label>
                              <div className='d-flex justify-content-between'>
                              {Array.from({ length: 6 }).map((_, index) => ( <input   key={index}   type="text"   ref={otpRefs.current[index]}   maxLength="1"   name={`otp${index + 1}`}   value={returnOtpVal[`otp${index + 1}`]}   onChange={(e) => handleOtpChange(e, index)}   onKeyDown={(e) => handleBackspace(e, index)}   className="ds_return-otp-input" />))}
                                  {/* <input ref={otp1Ref} maxLength="1"  type='text' name='otp1' value={OtpFormik.values.otp1} onChange={(e) => {OtpFormik.handleChange(e);if (e.target.value.length === 1) otp2Ref.current.focus();}} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp1) { e.preventDefault(); } }}></input> */}
                           {/* <input ref={otp2Ref} maxLength="1" type='text' name='otp2' value={OtpFormik.values.otp2} onChange={(e) => {OtpFormik.handleChange(e);if (e.target.value.length === 1) otp3Ref.current.focus();}} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp2) { otp1Ref.current.focus(); } }}></input> */}
                           {/* <input ref={otp3Ref} maxLength="1" type='text' name='otp3' value={OtpFormik.values.otp3} onChange={(e) => {OtpFormik.handleChange(e);if (e.target.value.length === 1) otp4Ref.current.focus();}} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp3) { otp2Ref.current.focus(); } }}></input> */}
                           {/* <input ref={otp4Ref} maxLength="1" type='text' name='otp4' value={OtpFormik.values.otp4} onChange={OtpFormik.handleChange} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp4) { otp3Ref.current.focus(); } }}></input> */}
                              </div>
                            </div>
                        </div>
                         }
                         
                     </div>
                     <div>
                       {!returnOtpToggle && 
                           <div className="row justify-content-center">
                             <div className="col-xl-12 mt-5 mb-3">
                               <div>
                                  <button onClick={(e)=> handleRequestOtp(e)}  className='ds_new-save w-100'>Request for OTP</button>
                               </div>
                             </div>
                           </div>
                       }

                       {returnOtpToggle && 
                             <div className="row justify-content-center">
                             <div className="col-xl-12 mt-5 mb-3">
                               <div>
                                  <button onClick={(e)=> handleConfirmReturn(e)}  className='ds_new-save w-100'>Confirm Return</button>
                               </div>
                             </div>
                           </div>
                         }

                     </div>
                   </div>
           </Modal.Body>
         </Modal>
        </div>
      </section>

      {/* ********************  Return Order With OTP Popup  ********* */}
      {/* <section>
        <div>
        <Modal show={returnOtp} onHide={()=> setReturnOtp(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='mb-0 pb-0 border-0' closeButton>
            </Modal.Header>
            <Modal.Body className='pt-0 px-4'>
           <h4 className="modal-title text-center ds_color fw-bold" >Return Order</h4>
            <form onSubmit={returnOtpFormik?.handleSubmit} className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Order ID*</label>
                                 <input type="text" name='order_id' value={returnOtpFormik?.values?.order_id} onChange={returnOtpFormik?.handleChange} onBlur={returnOtpFormik?.handleBlur} className='ds_new-input' placeholder="Enter order ID" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Reason for return*</label>
                               <input type="text" name='reason' value={returnOtpFormik?.values?.reason} onChange={returnOtpFormik?.handleChange} onBlur={returnOtpFormik?.handleBlur} className='ds_new-input' placeholder="Enter reason for return" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Mobile No.*</label>
                               <input type="text" name='phone' value={returnOtpFormik?.values?.phone} onChange={returnOtpFormik?.handleChange} onBlur={returnOtpFormik?.handleBlur} className='ds_new-input' placeholder="Enter mobile no." />
                             </div>
                         </div>

                         

                        
                     </div>
                     <div>
                       
                     </div>
               </form>
            </Modal.Body>
        </Modal>
        </div>
      </section> */}
    </>
  )
}

export default ReturnOrder
