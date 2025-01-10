import React  from 'react'
import '../Css/dhruvin/SubmitReview.css'
import { FaStar } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'


const SubmitReview = () => {

  return (
    <>
        <section className='mb-5'>

      

            <div className='mt-4'>
                <div className='ds_container'>
                    <div>
                        <div>
                            <h2>Submit Review</h2>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 mt-4">
                              <div className='ds_submit-box'>
                                      <div className='d-flex flex-column '>
                                          <div className='mx-auto'>
                                              <img className='ds_oder-img' src={require("../Img/dhruvin/ring.png")} alt="" />
                                          </div>
                                          <div className='ds_cart-deta  mt-2 ms-4'>
                                             <h6 className='mb-0'>Dual Tone Halo Diamond Finger Ring</h6>
                                             <h6 className='mb-0'><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h6>
                                             <p className='ds_tcolor mb-0 ds_track-mini mt-2'>Order Id : <span className='ds_color'>12057598140</span></p>
                                             <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'> Silver</span> </p>
                                             <p className='ds_tcolor mb-0'> <span className='ds_tcolor'>Size : </span> <span className='ds_color'>5</span> </p>
                                             <p className='ds_tcolor mb-0'>Diamond Quality:  <span className='ds_color'>FG / VVS-VS</span></p>
                                             <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>PD00003-14-RS-FGVVSVS</span></p>
                                             <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> 925 Silver</span></p>
                                             <p className='ds_tcolor mb-0'>Order Date : <span className='ds_color'> 10 Oct 2023</span></p>
                                          </div>
                                     </div>
                                </div>
                            </div>

                            <div className="col-xl-9 col-lg-8 col-md-7 col-sm-6 mt-4">
                                <div>
                                <div className='ds_review-box'>
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
                                                    {/* <img src={require("../Img/dhruvin/ring.png")} alt="" width="100%"/> */}
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
                </div>
            </div>
        </section>
    </>
  )
}

export default SubmitReview
