import React from 'react'
import '../Css/dhruvin/OrderDetails.css'
import { RiArrowDropDownLine } from 'react-icons/ri'

const OrderDetails = () => {
  return (
    <div>
      <section className="" id="ds_order_conformation">
        <div className="ds_container">
          <div className="mt-4  mb-5 pb-4">
            <div>
              <h4 className="ds_con-title ds_color">Order Details</h4>
              <p className="ds_con-text mt-3">Order placed successfully!</p>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                <div>
                  <iframe title='Map' className="ds_con-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7439.261324736735!2d72.87650904796955!3d21.2068260871905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f76476e9ea7%3A0x361d912920aa035b!2sSilver%20Chowk%2C%20Punagam%20Parmukhpark%20Society%2C%20Yoginagar%20Society%2C%20Surat%2C%20Gujarat%20395010!5e0!3m2!1sen!2sin!4v1730193943220!5m2!1sen!2sin"  loading="lazy" ></iframe>
                </div>
                <div className="ds_con-box mt-4">
                  <div>
                    <p className="px-3 ds_600 mt-1">Order details</p>
                    <div className="ds_con-line"></div>
                    <div className="px-3">
                      <div className="row justify-content-between">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                          <div>
                            <div className="d-flex ">
                              <p className="ds_con-bill-txt ">Order ID:</p>
                              <p className="ds_con-bill-deta text-dark ds_600 text-start" >#123456</p>
                            </div>
                            <div className="d-flex ">
                              <p className="ds_con-bill-txt">Order Date:</p>
                              <p className="ds_con-bill-deta text-dark ds_600" >21/09/2024</p>
                            </div>
                            <div className="d-flex ">
                              <p className="ds_con-bill-txt">Payment Method:</p>
                              <p className="ds_con-bill-deta text-dark ds_600" >Debit card <RiArrowDropDownLine /></p>
                            </div>
                            <div className="d-flex  mt-1">
                              <p className="ds_con-bill-txt">Card name</p>
                              <p className="ds_con-bill-deta text-dark ds_600" >VISA</p>
                            </div>
                            <div className="d-flex ">
                              <p className="ds_con-bill-txt">Card no.</p>
                              <p className="ds_con-bill-deta text-dark ds_600" >1234 5678 9123 4567</p>
                            </div>
                            <div className="d-flex ">
                              <p className="ds_con-bill-txt">Card holder name</p>
                              <p className="ds_con-bill-deta text-dark ds_600" >Jhon Wick</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12  mt-3">
                          <div>
                            <p className="ds_con-bill-txt">Billing Address</p>
                            <p className="ds_con-font text-dark ds_600 " >Jhon Wick</p>
                            <p className="ds_con-font text-dark ds_600">Ehrenkranz 13 Washington Square S, New York,Washington Square, NY 10012, USA</p>
                            <p className="ds_con-font text-dark ds_600">+1 565 5656 565</p>
                          </div>
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12  mt-3 mb-3">
                          <div>
                            <p className="ds_con-bill-txt">Shipping Address</p>
                            <p className="ds_con-font text-dark ds_600 " >Jhon Wick</p>
                            <p className="ds_con-font text-dark ds_600">Ehrenkranz 13 Washington Square S, New York,Washington Square, NY 10012, USA</p>
                            <p className="ds_con-font text-dark ds_600">+1 565 5656 565</p>
                            <button className=" ds_con-btn" >View Invoice</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-4 mt-lg-0 mt-4">
                <div className="ds_con-buy">
                  <div className="d-flex justify-content-between px-3">
                    <div>
                      <div className="d-flex">
                        <div>
                          <img src={require("../Img/dhruvin/hello.png")} alt="" />
                        </div>
                        <div className="ms-2">
                          <p className="ds_600 mb-0 ds_con-trade ds_lh">Dual Tone Halo Diamond Finger Ring</p>
                           <div className='d-flex'>
                             <p className="ds_qantity me-3 mb-1" style={{ color: '#6A6A6ABF' }}>Qty : <span className="ds_600 text-dark">01</span></p>
                             <p className="ds_qantity mb-0" style={{ color: '#6A6A6ABF' }}>Size : <span className="ds_600 text-dark">5</span></p>
                           </div>
                           <p className="ds_qantity" style={{ color: '#6A6A6ABF' }}>Metal :  <span className="ds_600 text-dark">925 Silver</span></p>
                        </div>
                      </div>
                    </div>
                    <p className="ds_con-price ds_600">₹1200</p>
                  </div>

                  <div className="d-flex justify-content-between mt-3 px-3">
                    <div>
                      <div className="d-flex">
                        <div>
                          <img src={require("../Img/dhruvin/hello.png")} alt="" />
                        </div>
                        <div className="ms-2">
                          <p className="ds_600 mb-0 ds_con-trade ds_lh">Dual Tone Halo Diamond Finger Ring</p>
                           <div className='d-flex'>
                             <p className="ds_qantity me-3 mb-1" style={{ color: '#6A6A6ABF' }}>Qty : <span className="ds_600 text-dark">01</span></p>
                             <p className="ds_qantity mb-0" style={{ color: '#6A6A6ABF' }}>Size : <span className="ds_600 text-dark">5</span></p>
                           </div>
                           <p className="ds_qantity" style={{ color: '#6A6A6ABF' }}>Metal :  <span className="ds_600 text-dark">925 Silver</span></p>
                        </div>
                      </div>
                    </div>
                    <p className="ds_con-price ds_600">₹1200</p>
                  </div>

                  <div className="d-flex justify-content-between mt-3 px-3">
                    <div>
                      <div className="d-flex">
                        <div>
                          <img src={require("../Img/dhruvin/hello.png")} alt="" />
                        </div>
                        <div className="ms-2">
                          <p className="ds_600 mb-0 ds_con-trade ds_lh">Dual Tone Halo Diamond Finger Ring</p>
                           <div className='d-flex'>
                             <p className="ds_qantity me-3 mb-1" style={{ color: '#6A6A6ABF' }}>Qty : <span className="ds_600 text-dark">01</span></p>
                             <p className="ds_qantity mb-0" style={{ color: '#6A6A6ABF' }}>Size : <span className="ds_600 text-dark">5</span></p>
                           </div>
                           <p className="ds_qantity" style={{ color: '#6A6A6ABF' }}>Metal :  <span className="ds_600 text-dark">925 Silver</span></p>
                        </div>
                      </div>
                    </div>
                    <p className="ds_con-price ds_600">₹1200</p>
                  </div>
                  <div className="ds_con-line mt-3"></div>

                  <div>
                    <div className="d-flex px-3 mt-3 justify-content-between">
                      <h6 className="ds_con-total">Sub Total</h6>
                      <h6 className="ds_con-total-price text-dark ds_600">₹1200</h6>
                    </div>
                    <div className="d-flex px-3 mt-3 justify-content-between">
                      <h6 className="ds_con-total">Delivery Charge</h6>
                      <h6 className="ds_con-total-price ds_600" style={{ color: "#03CF18" }}>FREE</h6>
                    </div>
                  </div>
                  <div className="ds_con-dash mt-3"></div>

                  <div className="d-flex justify-content-between px-3 mt-3">
                    <h4 className="ds_con-amount">Total Amount</h4>
                    <h4 className="ds_con-amount">₹1200</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderDetails
