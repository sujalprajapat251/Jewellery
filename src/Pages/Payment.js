import React, { useState } from 'react'
import '../Css/dhruvin/Payment.css'
import { MdRefresh } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';

const Payment = () => {

    const [activeButton, setActiveButton] = useState('Pay on Delivery');



    const handlePayment = (paymentType) => {
        setActiveButton(paymentType);
        console.log(paymentType);
      };

      const handlePaymentsuccess = () => {
        // document.getElementById("ds_order_conformation").classList.remove("d-none")
        // document.getElementById("ds_cartsec").classList.add("d-none")
      }


  return (
    <>
      <section>
        <div className='ds_container'>
          <h2>Cart</h2>
           <div className="row">
             <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
             <div className="ds_cod-main mt-5 ds_cod-bg">
                      <div className="row p-0 m-0" style={{ borderBottom: '1px solid black' }}>
                        {['Pay on Delivery', 'Credit / Debit Card', 'UPI ID', 'Net Banking'].map((paymentType, index) => (
                          <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 text-center p-0">
                            <button className={` h-100 ${activeButton === paymentType ? 'ds_cod-on-btn' : 'ds_cod-on-btn-txt'}`} style={{ padding: '13px 0px' }} onClick={() => handlePayment(paymentType)}>
                              {paymentType}
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* {********** Pay On Delivery Section **********} */}
                      {activeButton === 'Pay on Delivery' && (
                        <section className="ds_pay-box mt-4">
                          <div className="row justify-content-center mx-xl-0 mx-2">
                            <div className="col-xl-8">
                              <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 mt-3"></div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-3">
                                  <p className="ds_pay-text ds_tcolor mb-0">Enter the captcha to confirm order.</p>
                                </div>
                              </div>
                              <div className="row justify-content-center align-items-center">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 mt-3">
                                  <img src={require("../Img/dhruvin/captha.png")} alt="" className="ds_cod-cap" />
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-3">
                                  <input type="text" className="ds_cod-input" placeholder="Enter the captcha" />
                                </div>
                                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 mt-3">
                                  <MdRefresh className="ds_cod-refresh" />
                                </div>
                              </div>
                              <div className="row mt-sm-5 mt-3">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                                  <button className=" ds_cod-pay" onClick={() => handlePaymentsuccess()}>Pay ₹1240</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {/* {**********Credit / Debit Card Section **********} */}
                      {activeButton === 'Credit / Debit Card' && (
                        <section className="ds_pay-box mt-4">
                          <div className="row justify-content-center mx-xl-0 mx-2">
                            <div className="col-xl-10">
                              <div className="row justify-content-center">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                                  <input type="text" className="ds_cod-input" placeholder="Enter card holder name" />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                                  <input type="text" className="ds_cod-input" placeholder="Enter card number" />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                                  <input type="text" className="ds_cod-input" placeholder="MM/YYYY" />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                                  <input type="text" className="ds_cod-input" placeholder="Enter CVV" />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-sm-5 mt-3">
                                  <button className=" ds_cod-pay" onClick={() => handlePaymentsuccess()}>Pay ₹1240</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {/* {********** UPI ID Section **********} */}
                      {activeButton === 'UPI ID' && (
                        <section className="ds_pay-box mt-4 pt-4">
                          <div className="">
                            <div className="row justify-content-center mx-xl-0 mx-2">
                              <div className="col-xl-10">
                                <div className="position-relative ds_upi-arrow d-flex">
                                  <input type="text" className="ds_upi-input" placeholder="Enter UPI ID" />
                                  <select  className="form-select ds_upi-select">
                                    <option value="@okicici">@okicici</option>
                                    <option value="@oksbi">@oksbi</option>
                                    <option value="@okhdfc">@okhdfc</option>
                                    <option value="@okaxis">@okaxis</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-xl-5 mt-5">
                                <button className=" ds_cod-pay" onClick={() => handlePaymentsuccess()}>Pay ₹1240</button>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {/* {********** Net Banking Section **********} */}
                      {activeButton === 'Net Banking' && (
                        <section className="ds_pay-box mt-4 pt-4">
                          <div className="mx-xl-0 mx-2">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-xl-10">
                                <div className="position-relative">
                                  <input type="text" className="ds_net-input" placeholder="Search your bank" />
                                  <IoSearch className="ds_net-icon" />
                                </div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center mt-5">
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/city.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Citi <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/well copy.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Wells Fargo <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/capital.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Capital One <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/td.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">TD <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/city.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Citi <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/capital.png")}  alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Capital One <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/td.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">TD <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/city.png")}alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Citi <br /> Bank</p>
                                  </div>
                                  <div className="text-center">
                                    <img src={require("../Img/dhruvin/well copy.png")} alt="" className="ds_net-img" />
                                    <p className="ds_net-text">Wells Fargo <br /> Bank</p>
                                  </div>
                                </div>
                              </div>
                             
                            </div>
                          </div>
                        </section>
                      )}
                    </div>
             </div>
             <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mt-5">
                <div>
                <div className="ds_add-order ">
                     <div>
                       <h6 className="h6 ms-3 fw-600 mb-3 ds_color">
                         Order Details
                       </h6>
                       <div className="ds_with-border"></div>
                     </div>
                     <div className="px-3 mt-3">
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Sub Total</p>
                         <p className="fw-600 ds_color ds_600">₹1200</p>
                       </div>
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Discount</p>
                         <p className="fw-600 ds_add-color ds_600">-₹40</p>
                       </div>
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Tax</p>
                         <p className="fw-600 ds_color ds_600">₹40</p>
                       </div>
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Delivery Charge</p>
                         <p className="fw-600 ds_add-color ds_600">FREE</p>
                       </div>
                     </div>
                     <div className="ds_with-border mt-2"></div>
                     <div className="px-3 mt-3">
                       <div className="d-flex justify-content-between">
                         <h5 className="h5 mb-0 ds_color">Total Amount</h5>
                         <h5 className="h5 mb-0 ds_color">₹1240</h5>
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

export default Payment
