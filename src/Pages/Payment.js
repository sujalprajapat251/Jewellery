import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/Payment.css'
import { MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import noteContext from '../Context/noteContext';


const Payment = () => {

  const {Api ,store , setPayCount} = useContext(noteContext)
  const data = JSON.parse(localStorage.getItem("OrderDetails")) || {}
  const login = JSON.parse(localStorage.getItem("Login")) || {}
  const deliverId = JSON.parse(localStorage.getItem("default") || "")
  const [cardData, setCardData] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');

  const finalDate = `${year}-${month}-${day}`

  useEffect(() => {
    const fetchCartData = async (retries = 3, delay = 1000) => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await axios.get(`${Api}/cart/getall`, {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          });
          console.log("Cart Data:", response?.data?.cart);
          setCardData(response?.data?.cart);
          return; 
        } catch (error) {
          if (error.response?.status === 429 && attempt < retries - 1) {
            attempt++;
            const waitTime = delay * 2 ** attempt; 
            console.warn(`Retrying in ${waitTime}ms... (Attempt ${attempt + 1})`);
            await new Promise((resolve) => setTimeout(resolve, waitTime)); 
          } else {
            console.error("Error fetching cart data:", error);
            alert(`Failed to fetch cart data: ${error.message}`);
            return; 
          }
        }
      }
    };

    fetchCartData();
    // eslint-disable-next-line
  }, []);


  const handlePay = async () => {
    if(userInput === captcha) {
          alert("Captcha Verified! Proceeding to Payment.");
          const formattedProducts = (cardData || []).map((item) => ({
            product_id: item?.product_id || 0,
            qty: item?.quantity || 1,
            size: parseInt(item?.size || 2),
            metal: item?.metal || "default_metal",
          }));
        
          const localByNow = JSON.parse(localStorage.getItem("BuyNow")) || [];
          const byNowProducts = (Array.isArray(localByNow) ? localByNow : [localByNow]).map((item) => ({
            product_id: item?.product_id || 0,
            qty: item?.qty || 1,
            size: parseInt(item?.size || 2),
            metal: item?.metal || "default_metal",
          }));
          
            const maxRetries = 3; 
            const retryDelay = (retryCount) => Math.pow(2, retryCount) * 1000; 
            
          
            const createOrder = async (retryCount = 0) => {
              try {          
                const response = await axios.post(
                  `${Api}/order/create`,
                  {
                    customer_id: login?.id,
                    order_date: finalDate,
                    order_status: 'pending',
                    total_amount: data?.total,
                    deliveryAddress_id: deliverId,
                    discount: data?.discount ? data?.discount : 0,
                    products: localByNow?.length !== 0 ? byNowProducts : formattedProducts
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${store?.access_token}`,
                    },
                  }
                );
                alert("Payment SuccessFully")
                localStorage.setItem("orderId", JSON.stringify(response?.data?.order?.order_id));
                if(response?.data?.order){
                  console.log('order',response?.data?.order); 
                  // removeCartItem();
                }
                navigate("/orderdetails");
              } catch (error) {
                if (error.response?.status === 429 && retryCount < maxRetries) {
                  console.warn(`Retrying order creation in ${retryDelay(retryCount)}ms...`);
                  await new Promise((resolve) => setTimeout(resolve, retryDelay(retryCount)));
                  return createOrder(retryCount + 1);
                }
          
                console.error("Error creating order:", error);
                alert(`Error: ${error.response?.data?.message || error.message}`);
              }
      
            };
          
            await createOrder();
    }
    else{
      alert("Invalid CAPTCHA. Please try again.");
    }
      
      
      setPayCount((payCount)=> payCount + 1)
  };

  // const handlePay = async () => {
  //   // Validate cardData
  //   console.log("cardData:", cardData);
  //   const formattedProducts = (cardData || []).map((item) => ({
  //     product_id: item?.product_id || 0,
  //     qty: item?.quantity || 1,
  //     size: parseInt(item?.size || 2),
  //     metal: item?.metal || "default_metal",
  //   }));
  
  //   const localByNow = JSON.parse(localStorage.getItem("BuyNow")) || [];
  //   console.log("localByNow:", localByNow);
  //   const byNowProducts = (Array.isArray(localByNow) ? localByNow : [localByNow]).map((item) => ({
  //     product_id: item?.product_id || 0,
  //     qty: item?.qty || 1,
  //     size: parseInt(item?.size || 2),
  //     metal: item?.metal || "default_metal",
  //   }));
  
  //   // Log processed data
  //   console.log("Processed formattedProducts:", formattedProducts);
  //   console.log("Processed byNowProducts:", byNowProducts);
  
  //   // Final product selection
  //   const products = localByNow.length > 0 ? byNowProducts : formattedProducts;
  //   console.log("Final products:", products);
  
  //   // Prevent proceeding if products are invalid
  //   if (!products.every((p) => p.product_id && p.qty)) {
  //     alert("Invalid product data.");
  //     return;
  //   }
  
  //   // Additional logic for API request can go here...
  //   setPayCount((payCount) => payCount + 1);
  // };
  


  // *************** Razorpay **************
  
  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/create-order", { method: "POST" });
    const orderData = await response.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://yourlogo.com/logo.png", // Optional
      order_id: orderData.id, // Order ID generated by your server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Company Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  //  ------------------ Captha  --------------

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };


  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");


  const handleRefresh = () => {
    setCaptcha(generateCaptcha());
    setUserInput(""); 
  };



  // const handlePay = () => {
  //   if (userInput === captcha) {
  //     alert("Captcha Verified! Proceeding to Payment.");
  //     // Add further payment logic here
  //   } else {
  //     alert("Invalid CAPTCHA. Please try again.");
  //   }
  // };
  

  return (
    <>
      <section className='mb-5 pb-4 ds_cart-main'>
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
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 mt-3 text-sm-center">
                                  {/* <img src={require("../Img/dhruvin/captha.png")} alt="" className="ds_cod-cap" /> */}
                                  <h5 className='ds_cod-captha'>{captcha}</h5>

                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 mt-3">
                                  <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="ds_cod-input" placeholder="Enter the captcha" />
                                </div>
                                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 mt-3">
                                  <MdRefresh className="ds_cod-refresh ds_cursor" onClick={handleRefresh} />
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
                                     <button onClick={handlePayment} className="ds_cod-razo ds_color fw-bold" >Pay with <img src={require("../Img/dhruvin/razor.png")} alt="" width="25%" /> </button>
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
