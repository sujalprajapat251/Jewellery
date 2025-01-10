import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/Cart.css'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoBagHandleOutline } from 'react-icons/io5'
import { GoHome } from 'react-icons/go'
import { Modal } from 'react-bootstrap'
import noteContext from '../Context/noteContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

  const { Api, store, myAddData, AddFormik, newAddModal, setNewAddModal, hello, addwishlistHandler,

    cartData, price, removePopup, setRemovePopup, wishId, handleRemove, handleQuantityChange, handleFinalRemove } = useContext(noteContext)

  const navigate = useNavigate()

  const [addType, setAddType] = useState("Home")
  const [changeAddPopup, setChangeAddPopup] = useState(false)

  const [cupon, setCupon] = useState([])
  const [offer, setOffer] = useState([])



  const handleAddType = (type) => {
    setAddType(type)
  }


  const mydefault = JSON.parse(localStorage.getItem("default"))
  const yes = myAddData
  const myAddress = myAddData.filter((element) => element?.id === mydefault);
  const resolvedAddress = myAddress.length > 0 ? myAddress : yes;

  useEffect(() => {
    const fetchCoupons = async (retries = 3, delay = 1000) => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await axios.get(`${Api}/coupons/getall`, {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          });
          // console.log("Coupons:", response?.data?.coupons);
          setCupon(response?.data?.coupons);
          return;
        } catch (error) {
          if (error.response?.status === 429 && attempt < retries - 1) {
            attempt++;
            const waitTime = delay * 2 ** attempt;
            console.warn(`Retrying in ${waitTime}ms... (Attempt ${attempt + 1})`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          } else {
            console.error("Error fetching coupons:", error);
            alert(`Failed to fetch coupons: ${error.message}`);
            return;
          }
        }
      }
    };


    fetchCoupons();
    // eslint-disable-next-line
  }, []);

  const [cupanOffer, setCupanOffer] = useState("")
  const [cupanVal, setCupanVal] = useState("")
  const [cupanText, setCupanText] = useState({
    text: '',
    toggle: false
  })
  const [appyVal, setAppyVal] = useState("")
  const [orderData, setOrderData] = useState({
    sub_total: '',
    discount: '',
    tax: '',
    total: ''
  })

  const handleCupanType = (type, amount) => {
    if (type === "fixed") {
      // console.log("hello ", amount);

      setCupanOffer(parseInt(amount))
    }
    else {
      let offer = price * amount / 100;
      // console.log("Offer ", offer);
      setCupanOffer(Math.round(offer))
    }
  }

  const handleApply = (e) => {
    e.preventDefault();
    const isValidCoupon = cupon?.some((element) => element?.code === cupanVal);
    if (isValidCoupon) {
      // console.log("Successfully applied coupon!");
      setCupanText({ text: 'Successfully applied coupon!', toggle: true })
      cupon?.map((element) => {
        if (element.type === 'fixed') {
          return setAppyVal(Math.round(element?.price))
        }
        else {
          const sum = price * element?.price / 100;
          return setAppyVal(Math.round(sum))
        }
      })
    } else {
      console.log("Invalid coupon code.");
      setCupanText({ text: 'Invalid coupon code.', toggle: false })
      setAppyVal(0)
    }
  }
let sum = 0;
let jab = cartData.map((item)=>{
  if (item?.product_offer?.type === "fixed") {
    console.log(item?.product_offer)
    sum += parseFloat(item?.product_offer?.price); 
    // newPrice -= parseFloat(item.product_offer.price);
    console.log('sum1',sum)
  } else if (item.product_offer.type === "percentage") {
    sum += ((parseFloat(item?.product_price)*item?.quantity)*parseFloat(item?.product_offer?.discount)) /100;
    console.log('sum1',sum)
  }
})
console.log("job" , sum);

let sum1 = parseFloat(price);
if(cupanOffer){
  sum1 -= cupanOffer;
}
else if(appyVal){
  sum1 -= appyVal;
}
else{
  sum1 = parseFloat(price);
}
let tax = parseFloat((sum1 * 3)/100);
console.log("sum123",sum1);
  useEffect(() => {
    const discount = cupanOffer ? cupanOffer : appyVal ? appyVal : 0;
    tax = (sum1 * 3)/100;
    const total = parseFloat(price)  + parseFloat(tax) - parseFloat(discount)
    setOrderData({
      sub_total: price,
      discount: discount ? discount : 0,
      tax,
      total,
      productDiscount: parseFloat(sum).toFixed(2),
    });

    // Storing data in localStorage after the state update
    localStorage.setItem("OrderDetails", JSON.stringify({
      sub_total: price,
      discount,
      tax : tax,
      total,
      productDiscount: parseFloat(sum).toFixed(2),
    }));

    // eslint-disable-next-line

  }, [price, cupanOffer, appyVal]);

  const handleProcessCheckout = () => {
    localStorage.removeItem("BuyNow")
    navigate("/payment")
  }

  useEffect(() => {
    const fetchOfferData = async (retries = 3, delay = 1000) => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await axios.get(`${Api}/offers/getallactive`, {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          });
          // console.log("Offers:", response?.data?.offers);
          setOffer(response?.data?.offers);
          return;
        } catch (error) {
          if (error.response?.status === 429 && attempt < retries - 1) {
            attempt++;
            const waitTime = delay * 2 ** attempt;
            console.warn(`Retrying in ${waitTime}ms... (Attempt ${attempt + 1})`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          } else {
            console.error("Error fetching offers:", error);
            alert(`Failed to fetch offers: ${error.message}`);
            return;
          }
        }
      }
    };

    fetchOfferData();
    // eslint-disable-next-line
  }, []);


  // const myOffer = (cupanOffer ? -parseFloat(cupanOffer) : -parseFloat(appyVal) ? -parseFloat(appyVal) : parseFloat(price))

  return (
    <>

      {/* *************** Empty Cart ************    */}
      {
        cartData?.length === 0 &&
        <section >
          <div className='ds_empty-inner'>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-center'>
                <img src={require("../Img/dhruvin/empty-cart.png")} alt="" width="20%" />
                <h3 className='ds_color'>Your cart is empty</h3>
                <p>You have no items in your cart</p>
                <button className='ds_empty-btn' onClick={() => navigate("/")}>Continue Shopping</button>
              </div>
            </div>
          </div>
        </section>
      }


      {/* *************** Cart ************    */}
      {cartData?.length !== 0 &&
        <section className='mb-5 pb-sm-5 ds_cart-main'>
          <div className='ds_container'>
            <div>
              <h2>Cart</h2>
            </div>
            <div className="row ">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-3">

                {cartData?.map((element, index) => {
                  // console.log("CartData ", element);

                  const totalPrice = isNaN(element?.total_price) ? 0 : Math.round(element?.total_price);
                  const discountedPrice = isNaN(element?.total_price) ? 0 : Math.round(element?.product_price * element?.quantity);
                  const offerID = element?.product_offer?.id ? element?.product_offer?.id : null
                  // console.log("doiscountPrice" , Math.round(parseInt(element?.total_price * element?.discount / 100) + parseInt(element?.total_price)))

                  return (
                    <div key={element?.id} className='ds_cart-box mt-4'>
                      <div className='text-end'>
                        <IoIosCloseCircle onClick={() => handleRemove(element?.id)} className='ds_cart-cancel ds_cursor' />
                      </div>
                      <div className='d-flex justify-content-between ds_cart-main-flex'>
                        <div>
                          <div className='d-flex ds_cart-flex'>
                            <div className='mx-auto'>
                              <img src={element?.product_image[0]} alt="" className='ds_cart-img' />
                            </div>
                            <div className='ds_cart-deta'>
                              <h6>{element?.product_name}</h6>
                              <p className='ds_tcolor mb-0'>Metal : <span className='ds_color'>{element?.metal} {element?.metal_color}</span></p>
                              <p className='ds_tcolor mb-0'>Metal Color  : <span className='ds_color'> {element?.metal_color}</span></p>
                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'> {element?.sku}</span></p>
                              <p className='ds_tcolor mb-0'>Size : <span className='ds_color'> {element?.size}</span></p>
                              <p className='ds_tcolor mb-0'>Diamond Quality: <span className='ds_color'> {element?.diamond_quality}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className='d-flex ds_cart-manage'>
                          <h5 className='ds_color mt-2'>₹{Math.round(totalPrice)}<span className='ds_cart-less-price ms-2'>₹{discountedPrice}</span></h5>
                          <div className='w-100 mt-auto d-flex justify-content-end'>
                            <div className='ds_cart-mul mt-auto '>
                              <div className='d-flex justify-content-between'>
                                <div>a
                                  <FaMinus onClick={() => handleQuantityChange(element?.id, "subtract", element?.customer_id, element?.product_id, offerID)} className='ds_cart-count text-light ds_cart-ico ds_cursor' />
                                </div>
                                <div className='text-light'>
                                  {element?.quantity}
                                </div>
                                <div>
                                  <FaPlus onClick={() => handleQuantityChange(element?.id, "add", element?.customer_id, element?.product_id, offerID)} className='ds_cart-count text-light ds_cart-ico ds_cursor' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <p className='ds_tcolor mt-5'>Note : Order details will be send on Whatsapp or Email.</p>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mt-sm-3">
                <div className='mt-4'>
                  <div className='ds_cart-address'>
                    {resolvedAddress?.slice(0, 1)?.map((element) => {
                      return (
                        <>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div>
                              {
                                myAddData.length === 0 ? <h6 className='mb-0'>No saved Addresses</h6> : <><h6 className='mb-'>Deliver to : {element?.contact_name}</h6> <p className='mb-0 ds_tcolor'>{element?.address}</p>
                                </>
                              }
                            </div>
                            <div>
                              {myAddData.length === 0 ? <button className='ds_cart-add-btn'  >+ Add Address</button>
                                : <button className='ds_cart-add-btn' onClick={() => setChangeAddPopup(true)} >Change</button>
                              }
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className="ds_with-cupon overflow-hidden mt-4" id="ds_cupon">
                    <div>
                      <h6 className="ps-3 mb-3 fw-600 ds_color">
                        Apply Coupon
                      </h6>
                      <div className="ds_with-border"></div>
                    </div>
                    <div>
                      <div className="px-3 mt-3">
                        <form action="" className="position-relative">
                          <img className="ds_add-cupan" src="" alt="" />
                          <input type="text" value={cupanVal} onChange={(e) => setCupanVal(e.target.value)} className="form-control ds_add-input" id="exampleInputEmail1" placeholder="Enter coupon code" aria-describedby="emailHelp" />
                          <p className={`ds_new-danger fw-bold ${cupanText.toggle ? 'text-success' : 'text-danger'}  mb-0`}>{cupanText?.text}</p>
                          <button className=" ds_add-apply" onClick={(e) => handleApply(e)}>Apply</button>
                        </form>
                      </div>
                    </div>
                    <div className="px-3 mt-3 fw-500">
                      <p className="ds_add-special ds_600" >Coupon List</p>
                      <div className='overflow-y-auto overflow-hidden' style={{ height: '170px' }}>
                        {
                          cupon?.map((element) => {
                            return (
                              <div className="form-check d-flex align-items-center mb-3">
                                <input onClick={() => handleCupanType(element?.type, element?.price)} className="form-check-input ds_cursor ds_cart-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <div className="ms-2">
                                  <label className="form-check-label fw-bold ds_add-label ds_color" htmlFor="flexRadioDefault1">{element?.name}</label>
                                  <p className="text-muted ds_tcolor mb-0 mt-1" style={{ lineHeight: "18px" }}>
                                    {element?.description}
                                  </p>
                                  <label className="form-check-label  ds_color mt-1 ds_600" htmlFor="flexRadioDefault1">Save {element?.type === "percentage" ? '' : '₹'}{element?.price}{element?.type === "percentage" ? '%' : ''}</label>
                                </div>
                              </div>
                            )
                          })
                        }

                        {
                          offer?.map((element) => {
                            return (
                              <div className="form-check d-flex align-items-center mb-3">
                                <input onClick={() => handleCupanType(element?.type, element?.discount)} className="form-check-input ds_cursor ds_cart-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <div className="ms-2">
                                  <label className="form-check-label fw-bold ds_add-label ds_color" htmlFor="flexRadioDefault1">{element?.name}</label>
                                  <p className="text-muted ds_tcolor mb-0 mt-1" style={{ lineHeight: "18px" }}>
                                    {element?.description}
                                  </p>
                                  <label className="form-check-label  ds_color mt-1 ds_600" htmlFor="flexRadioDefault1">Save ₹{element?.discount}</label>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className="ds_add-order mt-4">
                    <div>
                      <h6 className="h6 ms-3 fw-600 mb-3 ds_color">
                        Order Details
                      </h6>
                      <div className="ds_with-border"></div>
                    </div>
                    <div className="px-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <p className="ds_tcolor">Sub Total</p>
                        <p className="fw-600 ds_color ds_600">₹{parseFloat(price).toFixed(0)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="ds_tcolor">Discount</p>
                        <p className="fw-600 ds_add-color ds_600">₹{-cupanOffer ? -cupanOffer : -appyVal} </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="ds_tcolor">Tax</p>
                        <p className="fw-600 ds_color ds_600">₹{parseFloat(tax).toFixed(2)}</p>
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
                        <h5 className="h5 mb-0 ds_color">₹ {parseFloat(sum1 + parseFloat(tax)).toFixed(0)}</h5>
                      </div>
                      <button onClick={handleProcessCheckout} className="ds_add-proccess mt-5" id="ds_proceed_btn">
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {/* *************** Add New Address Popup ************    */}
      <section>
        <div>
          <Modal className="modal fade px-0" show={newAddModal} centered onHide={() => setNewAddModal(false)} id="addressModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ds_add-modal modal-dialog-centered m-0">
              <div className="modal-content border-0" style={{ borderRadius: '0' }}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" onClick={() => setNewAddModal(false)}></button>
                </div>
                <div className="modal-body pt-0 px-sm-4 px-3">
                  <h4 className="modal-title text-center ds_color" >Add New Address</h4>
                  <form onSubmit={AddFormik.handleSubmit}>
                    <h6 className='ds_color mt-3'>Area Details</h6>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>Address (House No, Building, Street, Area)</label>
                          <input type="text" name='address' value={AddFormik.values.address} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Address (House No, Building, Street, Area)" />
                          {AddFormik.errors.address && AddFormik.touched.address ? <p className='ds_new-danger mb-0'>{AddFormik.errors.address}</p> : null}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>Pincode</label>
                          <input type="number" name='pincode' value={AddFormik.values.pincode} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Pincode" />
                          {AddFormik.errors.pincode && AddFormik.touched.pincode ? <p className='ds_new-danger mb-0'>{AddFormik.errors.pincode}</p> : null}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>State</label>
                          <input type="text" name='state' value={AddFormik.values.state} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="State" />
                          {AddFormik.errors.state && AddFormik.touched.state ? <p className='ds_new-danger mb-0'>{AddFormik.errors.state}</p> : null}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>City</label>
                          <input type="text" name='city' value={AddFormik.values.city} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="City" />
                          {AddFormik.errors.city && AddFormik.touched.city ? <p className='ds_new-danger mb-0'>{AddFormik.errors.city}</p> : null}
                        </div>
                      </div>

                    </div>

                    <h6 className='ds_color mt-3'>Contact Details</h6>
                    <div className="row">
                      <div className="col-xl-6 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>Full Name </label>
                          <input type="text" name='name' value={AddFormik.values.name} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Full Name" />
                          {AddFormik.errors.name && AddFormik.touched.name ? <p className='ds_new-danger mb-0'>{AddFormik.errors.name}</p> : null}
                        </div>
                      </div>
                      <div className="col-xl-6 mt-3">
                        <div>
                          <label htmlFor="" className='ds_600 mb-1'>Contact No. </label>
                          <input type="number" name='phone' value={AddFormik.values.phone} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Contact No" />
                          {AddFormik.errors.phone && AddFormik.touched.phone ? <p className='ds_new-danger mb-0'>{AddFormik.errors.phone}</p> : null}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className='ds_color mt-3'>Address Type</h6>
                      <div className="d-flex flex-wrap ju">
                        <div className="me-2 mt-2">
                          <button type="button" className={`ds_new-home ${addType === 'Home' ? 'ds_select_type_active' : ''}  `} onClick={() => handleAddType("Home")}><GoHome className='ds_home-icon' /> Home</button>
                        </div>
                        <div className="mt-2 me-2">
                          <button type="button" className={`ds_new-work ${addType === 'Work' ? 'ds_select_type_active' : ''} `} onClick={() => handleAddType("Work")}><IoBagHandleOutline className="ds_home-icon" /> Work</button>
                        </div>
                        <div className="mt-2">
                          <button type="button" className={`ds_new-other ${addType === 'Other' ? 'ds_select_type_active' : ''} `} onClick={() => handleAddType("Other")}> Other</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="row justify-content-center">
                        <div className="col-xl-6 mt-5 mb-3">
                          <div>
                            <button type='submit' className='ds_new-save'>Save Address</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
      {/* } */}

      {/* *************** Add Address Popup  ************    */}
      <section>
        <div>
          <Modal show={changeAddPopup} onHide={() => setChangeAddPopup(false)} className='ds_add-width p-0' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='border-0 pb-0' closeButton>
            </Modal.Header>
            <Modal.Body className='pt-0'>
              <div>
                <h3 className='ds_color mb-0'>Address</h3>
                <div className="row">
                  {
                    myAddData?.map((element, index) => {
                      const isDefault = hello === element?.id;
                      // console.log(element);

                      return (
                        <div key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 ">
                          <div className='ds_chan-box position-relative' style={{ border: isDefault ? '0.75px solid #000000' : '0.75px solid #00000033' }}>
                            <div className='d-flex justify-content-between align-items-center px-3'>
                              <h5 className='mb-0 ds_color'>{element?.type}</h5>
                            </div>
                            <div className='ds_chan-line mt-2'></div>
                            <div className='px-3 mt-3'>
                              <p className='ds_600 mb-2'>{element?.contact_name}</p>
                              <p className='ds_600 mb-2'>+91 {element?.contact_no}</p>
                              <p className='ds_600'>{element?.address}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4 mb-2">
                    <div>
                      <button className='ds_new-save' onClick={() => { setNewAddModal(true); setChangeAddPopup(false) }}>+ Add new address</button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>



      {/* *************** Remove Product Popup ************    */}
      <section>
        <div>
          <Modal show={removePopup} onHide={() => setRemovePopup(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='pb-0 border-0' closeButton>
            </Modal.Header>
            <Modal.Body>
              <div className='text-center'>
                <img src={require("../Img/dhruvin/silver.jpg")} alt="" className='ds_rem-img' />
                <h4 className='ds_color mt-4 pt-1'>Move item from cart</h4>
                <p className='ds_600'>Are you sure you want to remove this item from the cart?</p>
                <div className='mt-5 mb-5 d-flex flex-wrap justify-content-sm-center justify-content-between align-items-center'>
                  <button className='ds_rem-btn me-sm-3 ds_600' onClick={handleFinalRemove}>Remove</button>
                  <button className='ds_rem-move ds_600' onClick={() => { addwishlistHandler(wishId); setRemovePopup(false) }}>Move to wishlist</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </>
  )
}

export default Cart
