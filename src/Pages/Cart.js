import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/Cart.css'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoBagHandleOutline } from 'react-icons/io5'
import { GoHome } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Modal } from 'react-bootstrap'
import noteContext from '../Context/noteContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {

  const {Api , store ,  myAddData , AddFormik  , newAddModal, setNewAddModal ,activeCard , setActiveCard ,   hello , addwishlistHandler  } = useContext(noteContext)

  // const cartData = JSON.parse(localStorage.getItem("cardDetail")) || []
  const navigate = useNavigate()

  const [addAddressPopup, setAddAddressPopup] = useState(false)
  const [addType, setAddType] = useState("Home")
  const [changeAddPopup, setChangeAddPopup] = useState(false)
  const [removePopup, setRemovePopup] = useState(false)
  const [removeId, setRemoveId] = useState(null)
  const [wishId, setWishId] = useState(null)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [priceToggle, setPriceToggle] = useState(0)

  const [cartData, setCartData] = useState([])
  const [cupon, setCupon] = useState([])
  const [price, setPrice] = useState("")

  useEffect(()=>{
    // alert('')
    axios.get(`${Api}/cart/getall`,{
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value)=>{
       console.log("CartData " , value?.data?.cart);
       setCartData(value?.data?.cart)
       let hello = value?.data?.cart.map((element) => parseFloat(element?.total_price));
       let totalPrice = hello.reduce((sum, price) => sum + price, 0);
       setPrice(Math.floor(totalPrice));

    }).catch((error)=>{
      //  alert("Cart Error" , error)
    })

    console.log("I AM Useeffect");
  },[deleteToggle , priceToggle])
  // console.log('card',cartData);
  const handleAddType = (type) => {
     setAddType(type)
  }

  const handleRemove = (id) => {
      console.log(id);
      setRemovePopup(true)
      setRemoveId(id)
      let wishId = cartData?.map((element)=> element?.product?.id)
      setWishId(wishId[0]); 
  }

  const mydefault = JSON.parse(localStorage.getItem("default"))
  const myAddress =  myAddData.filter((element)=> element?.id === mydefault)
  // console.log("myaddress" , myAddress);

  const handleQuantityChange = async (id, action, cusId, prod_id) => {
    // Calculate the updated cart directly
    const updatedCart = cartData.map((item) => {
      if (item.id === id) {
        const newQuantity = action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        const newPrice = item.price_per_unit * newQuantity; // Calculate new price
        
        return { ...item, quantity: newQuantity, total_price: !isNaN(newPrice) ? newPrice : item.total_price };
      }
      return item;
    });
  
    // Update UI immediately with validated data
    setCartData(updatedCart);
  
    // Find the updated item to send to the API
    const updatedItem = updatedCart.find((item) => item.id === id);
  
    if (!updatedItem) return;
  
    try {
      // Send updated quantity to the API
      const response = await axios.post(
        `${Api}/cart/update/${id}`,
        {
          customer_id: cusId,
          product_id: prod_id,
          quantity: updatedItem.quantity,
          product_price: updatedItem.total_price,
        },
        {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        }
      );
      console.log("Quantity updated:", response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  
    // Optional: Re-trigger UI updates
    setPriceToggle((prev) => prev + 1);
  };
  
  const handleFinalRemove = () => {    
    axios.delete(`${Api}/cart/delete/${removeId}`,{
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value)=>{
      console.log("Delete" , value);
      setDeleteToggle(true)
    }).catch((error)=>{
       alert("Delete in Cart" , error)
    })
    // let remove = cartData?.filter((element)=> element.product.id  !== removeId)
    // localStorage.setItem("cardDetail", JSON.stringify(remove));
    setRemovePopup(false)
  }

  useEffect(()=>{
    axios.get(`${Api}/coupons/getall`,{
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value)=>{
      console.log(value?.data?.coupons);
      setCupon(value?.data?.coupons)
    }).catch((error)=>{
      alert("Cupon " , error)
    })
  },[])

  
  const [cupanOffer, setCupanOffer] = useState("")
  const [cupanVal, setCupanVal] = useState("")
  const [cupanText, setCupanText] = useState({
    text:'',
    toggle: false
  })
  const [appyVal, setAppyVal] = useState("")

  const handleCupanType = (type , amount) => {
      if(type === "fixed"){
         setCupanOffer(amount)
      } 
      else{
        let offer =  price * amount / 100;
        console.log("Offer " , offer);
        setCupanOffer(Math.floor(offer))
      } 
  }

  const handleApply = (e) => {
    e.preventDefault();
    const isValidCoupon = cupon?.some((element) => element?.code === cupanVal);
    if (isValidCoupon) {
        console.log("Successfully applied coupon!");
        setCupanText({text:'Successfully applied coupon!' , toggle:true})
        cupon?.map((element)=>{
          if(element.type === 'fixed'){
            return setAppyVal(Math.floor(element?.price))
          }
          else{
            const sum =  price * element?.price / 100;
            return setAppyVal(Math.floor(sum))
          }
        })
    } else {
        console.log("Invalid coupon code.");
        setCupanText({text:'Invalid coupon code.' , toggle:false})
        setAppyVal(0)
    }
};




  return (
    <>

    {/* *************** Empty Cart ************    */}
     {
       cartData?.length === 0 &&
       <section >
         <div className='ds_empty-inner'>
           <div className='d-flex justify-content-center align-items-center h-100'>
             <div className='text-center'>
                <img src={require("../Img/dhruvin/empty-cart.png")} alt=""  width="20%"/>
                 <h3 className='ds_color'>Your cart is empty</h3>
                 <p>You have no items in your cart</p>
                 <button className='ds_empty-btn' onClick={()=> navigate("/")}>Continue Shopping</button>
             </div>
           </div>
         </div>
     </section>
     }
  

    {/* *************** Cart ************    */}
      { cartData?.length !== 0 &&
        <section className='mb-5 pb-sm-5 '>
        <div className='ds_container'>
            <div>
                <h2>Cart</h2>
            </div>
            <div className="row ">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-3">

                      {cartData?.map((element , index)=>{
                          const totalPrice = isNaN(element?.total_price) ? 0 : Math.floor(element?.total_price);
                          const discountedPrice = isNaN(element?.total_price) ? 0 : Math.floor(parseInt(element?.total_price * element?.discount / 100) + parseInt(element?.total_price));
                           return(
                              <div key={element?.id} className='ds_cart-box mt-4'>
                                   <div className='text-end'>
                                      <IoIosCloseCircle onClick={()=> handleRemove(element?.id)} className='ds_cart-cancel ds_cursor' />
                                   </div>
                                  <div className='d-flex justify-content-between flex-wrap'>
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
                                        <h5 className='ds_color mt-2'>{Math.floor(totalPrice)}<span className='ds_cart-less-price ms-2'>{discountedPrice}</span></h5>
                                          <div  className='w-100 mt-auto d-flex justify-content-end'>
                                          <div className='ds_cart-mul mt-auto '>
                                           <div className='d-flex justify-content-between'>
                                               <div>
                                                 <FaMinus  onClick={() => handleQuantityChange(element?.id, "subtract" , element?.customer_id , element?.product_id)} className='text-light ds_cart-ico ds_cursor' />
                                               </div>
                                               <div className='text-light'>
                                                 {element.quantity}
                                               </div>
                                               <div>
                                                  <FaPlus onClick={() => handleQuantityChange(element?.id, "add" , element?.customer_id , element?.product_id)} className='text-light ds_cart-ico ds_cursor' />
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

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mt-3">
                    <div className='mt-4'>
                        <div className='ds_cart-address'>
                            {myAddress?.map((element)=>{
                               return(
                                 <>
                                 <div className='d-flex justify-content-between align-items-center'>
                                     <div>
                                        {
                                          myAddData.length === 0 ? <h6 className='mb-0'>No saved Addresses</h6>  : <><h6 className='mb-'>Deliver to : {element?.contact_name}</h6> <p className='mb-0 ds_tcolor'>{element?.address}</p>
                                       </>
                                        }
                                     </div>
                                     <div>
                                     {myAddData.length === 0 ? <button className='ds_cart-add-btn'  >+ Add Address</button>
                                                             :  <button className='ds_cart-add-btn' onClick={()=> setChangeAddPopup(true)} >Change</button>
                                      }
                                     </div>
                                </div>
                                 </>
                               )
                            })}
                        </div>

                        <div className="ds_with-cupon mt-4" id="ds_cupon">
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
                                   <input type="text" value={cupanVal} onChange={(e)=> setCupanVal(e.target.value)} className="form-control ds_add-input" id="exampleInputEmail1" placeholder="Enter coupon code" aria-describedby="emailHelp" />
                                    <p className={`ds_new-danger fw-bold ${cupanText.toggle ? 'text-success' : 'text-danger'}  mb-0`}>{cupanText?.text}</p>
                                   <button className=" ds_add-apply" onClick={(e)=> handleApply(e) }>Apply</button>
                                 </form>
                               </div>
                             </div>
                             <div className="px-3 mt-3 fw-500">
                               <p className="ds_add-special" style={{fontWeight:'600'}}>Special offers</p>
                                {
                                  cupon?.map((element)=>{
                                     return(
                                        <div className="form-check d-flex align-items-center mb-3">
                                           <input onClick={()=> handleCupanType(element?.type , element?.price)} className="form-check-input ds_cursor ds_cart-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                           <div className="ms-2">
                                             <label className="form-check-label fw-bold ds_add-label ds_color" htmlFor="flexRadioDefault1">{element?.name}</label>
                                             <p className="text-muted ds_tcolor mb-0 mt-1" style={{ lineHeight: "18px" }}>
                                               {element?.description}
                                             </p>
                                             <label className="form-check-label  ds_color mt-1" style={{fontWeight:'600'}} htmlFor="flexRadioDefault1">Save {element?.price}</label>
                                           </div>
                                        </div>
                                     )
                                  })
                                }
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
                                        <p className="fw-600 ds_color ds_600">₹{price}</p>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <p className="ds_tcolor">Discount</p>
                                        <p className="fw-600 ds_add-color ds_600">₹{-cupanOffer ? -cupanOffer : -appyVal} </p>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <p className="ds_tcolor">Tax</p>
                                        <p className="fw-600 ds_color ds_600">₹{Math.floor(price * 3 / 100)}</p>
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
                                        <h5 className="h5 mb-0 ds_color">{}</h5>
                                      </div>
                                      <button className=" ds_add-proccess mt-5" id="ds_proceed_btn">
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
        <Modal className="modal fade" show={newAddModal} centered onHide={()=> setNewAddModal(false)} id="addressModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ds_add-modal modal-dialog-centered m-0">
              <div className="modal-content border-0" style={{borderRadius:'0'}}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" onClick={()=> setNewAddModal(false)}></button>
                </div>
                <div className="modal-body pt-0 px-4">
                   <h4 className="modal-title text-center ds_color" >Add New Address</h4>
                   <form onSubmit={AddFormik.handleSubmit}>
                     <h6 className='ds_color mt-3'>Area Details</h6>
                      <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Address (House No, Building, Street, Area)</label>
                                 <input type="text" name='address' value={AddFormik.values.address} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Address (House No, Building, Street, Area)" />
                                 { AddFormik.errors.address &&  AddFormik.touched.address ? <p className='ds_new-danger mb-0'>{AddFormik.errors.address}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Pincode</label>
                               <input type="number" name='pincode' value={AddFormik.values.pincode} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Pincode" />
                               { AddFormik.errors.pincode &&  AddFormik.touched.pincode ? <p className='ds_new-danger mb-0'>{AddFormik.errors.pincode}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>State</label>
                               <input type="text" name='state' value={AddFormik.values.state} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur}  className='ds_new-input' placeholder="State" />
                               { AddFormik.errors.state &&  AddFormik.touched.state ? <p className='ds_new-danger mb-0'>{AddFormik.errors.state}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>City</label>
                               <input type="text" name='city' value={AddFormik.values.city} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="City" />
                               { AddFormik.errors.city &&  AddFormik.touched.city ? <p className='ds_new-danger mb-0'>{AddFormik.errors.city}</p> : null}
                             </div>
                         </div>

                     </div>

                     <h6 className='ds_color mt-3'>Contact Details</h6>
                     <div className="row">
                        <div className="col-xl-6 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Full Name </label>
                                 <input type="text" name='name' value={AddFormik.values.name} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Full Name" />
                                 { AddFormik.errors.name &&  AddFormik.touched.name ? <p className='ds_new-danger mb-0'>{AddFormik.errors.name}</p> : null}
                             </div>
                         </div>
                         <div className="col-xl-6 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Contact No. </label>
                                 <input type="number" name='phone' value={AddFormik.values.phone} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Contact No" />
                                 { AddFormik.errors.phone &&  AddFormik.touched.phone ? <p className='ds_new-danger mb-0'>{AddFormik.errors.phone}</p> : null}
                             </div>
                         </div>
                     </div>
                     <div>
                       <h6 className='ds_color mt-3'>Address Type</h6>
                       <div className="d-flex flex-wrap">
                           <div className="me-2 mt-">
                              <button type="button" className={`ds_new-home ${addType === 'Home' ? 'ds_select_type_active' : ''}  `} onClick={()=>handleAddType("Home")}><GoHome className='ds_home-icon' /> Home</button>
                           </div>
                           <div className="mt- me-2">
                             <button type="button" className={`ds_new-work ${addType === 'Work' ? 'ds_select_type_active' : ''} `} onClick={()=>handleAddType("Work")}><IoBagHandleOutline className="ds_home-icon" /> Work</button>
                           </div>
                           <div className="mt-">
                               <button type="button" className={`ds_new-other ${addType === 'Other' ? 'ds_select_type_active' : ''} `} onClick={()=>handleAddType("Other")}> Other</button>
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

    {/* *************** Add Address Popup  ************    */}
    <section>
      <div>
      <Modal  show={changeAddPopup} onHide={()=> setChangeAddPopup(false)} className='ds_add-width p-0'   aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header className='border-0 pb-0' closeButton>
          </Modal.Header>
          <Modal.Body className='pt-0'>
             <div>
               <h3 className='ds_color mb-0'>Address</h3>
               <div className="row">
                  {
                    myAddData?.map((element , index)=>{
                      const isDefault = hello === element?.id;
                      // console.log(element);
                      
                       return (
                               <div  key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 ">
                                  <div className='ds_chan-box position-relative' style={{border: isDefault ? '0.75px solid #000000' : '0.75px solid #00000033'}}>
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
                      <button className='ds_new-save' onClick={()=>{setNewAddModal(true); setChangeAddPopup(false)}}>+ Add new address</button>
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
         <Modal show={removePopup} onHide={()=> setRemovePopup(false)}  aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header className='pb-0 border-0' closeButton>
           </Modal.Header>
           <Modal.Body>
             <div className='text-center'>
                   <img src={require("../Img/dhruvin/silver.jpg")} alt="" className='ds_rem-img'/>
                   <h4 className='ds_color mt-4 pt-1'>Move item from cart</h4>
                   <p className='ds_600'>Are you sure you want to remove this item from the cart?</p>
                   <div className='mt-5 mb-5 d-flex flex-wrap justify-content-sm-center justify-content-between align-items-center'>
                      <button className='ds_rem-btn me-sm-3 ds_600' onClick={handleFinalRemove}>Remove</button>
                      <button className='ds_rem-move ds_600' onClick={()=>{ addwishlistHandler(wishId); setRemovePopup(false)}}>Move to wishlist</button>
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
