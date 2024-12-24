import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/Payment.css'
import { MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import noteContext from '../Context/noteContext';

const Payment = () => {

  const {Api ,store} = useContext(noteContext)
  const data = JSON.parse(localStorage.getItem("OrderDetails")) || {}
  const login = JSON.parse(localStorage.getItem("Login")) || {}
  const deliverId = JSON.parse(localStorage.getItem("default") || "")
  const navigate = useNavigate()
  const [cardData, setCardData] = useState([])
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');

  const finalDate = `${year}-${month}-${day}`

  useEffect(()=>{
     axios.get(`${Api}/cart/getall`,{
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
     }).then((value)=>{
        console.log(value?.data?.cart);
        setCardData(value?.data?.cart)
     }).catch((error)=>{
        alert("PaymentPage" , error)
     })
  },[])

  const formattedProducts = cardData?.map((item) => ({
    product_id: item?.product_id,
    qty: item?.quantity,
    size: parseInt(item?.size ? item?.size : 2),
    metal: item?.metal,
  }));

    console.log("format " , formattedProducts);


  const handlePay = () => {

    const formattedProducts = cardData?.map((item) => ({
      product_id: item?.product_id,
      qty: item?.quantity,
      size: parseInt(item?.size ? item?.size : 2),
      metal: item?.metal,
    }));

    // console.log("format " , formattedProducts);
  
    axios.post(`${Api}/order/create`,{
      customer_id:login?.id,
      order_date:finalDate,
      order_status:'pending',
      total_amount:data?.total,
      order_status:'pending',
      deliveryAddress_id:deliverId,
      discount:data?.discount ? data?.discount : 0,
      products: formattedProducts,
    },{
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value)=>{
      console.log(value);
      localStorage.setItem("orderId" , JSON.stringify(value?.data?.order?.order_id))
      //  console.log(value?.data?.order?.order_id);
       navigate("/orderdetails");
    }).catch((error)=>{
       alert(error)
    })
  };
  

  return (
    <>
      <section className='mb-5 pb-4'>
        <div className='ds_container'>
          <h2>Cart</h2>
           <div className="row">
             <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
             <div className="ds_cod-main mt-sm-5 mt-4 ds_cod-bg">
                      <div className="row p-0 m-0" style={{ borderBottom: '1px solid black' }}>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center p-0">
                            <button  className={` h-100  ds_cod-on-btn`} >
                              Pay On Delivery
                            </button>
                          </div>
                      </div>
                        <section className="ds_pay-box mt-sm-4">
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

                              <div className="row mt-sm-4 pt-2 mt-3">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                                  <button className=" ds_cod-pay" onClick={handlePay} >Pay ₹ {data?.total}</button>
                                </div>
                              </div>

                              <div className="row mt-sm-4 pt-2 mt-3">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 text-center">
                                    <span className='text-muted'>Or</span>
                                </div>
                              </div>


                              <div>
                                <div className="row mt-sm-4 mt-3">
                                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
                                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                                     <button className="ds_cod-razo ds_color fw-bold" >Pay with <img src={require("../Img/dhruvin/razor.png")} alt="" width="25%" /> </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                     

                     


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
                         <p className="fw-600 ds_color ds_600">₹{data?.sub_total}</p>
                       </div>
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Discount</p>
                         <p className="fw-600 ds_add-color ds_600">-₹{data?.discount}</p>
                       </div>
                       <div className="d-flex justify-content-between">
                         <p className="ds_tcolor">Tax</p>
                         <p className="fw-600 ds_color ds_600">₹{data?.tax}</p>
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
                         <h5 className="h5 mb-0 ds_color">₹{data?.total}</h5>
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
