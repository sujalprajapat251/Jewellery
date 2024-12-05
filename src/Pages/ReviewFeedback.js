import React from 'react'
import '../Css/dhruvin/ReviewFeedback.css'
import {  FaStar } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'

const ReviewFeedback = () => {
  return (
    <>
      <section className='mb-5'>
        <div>
            <div className='ds_container'>
                <div>
                    <h2>Review & Feedback</h2>
                </div>
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
      </section>
    </>
  )
}

export default ReviewFeedback
