import React, { useContext, useState } from 'react'
import '../Css/dhruvin/Cart.css'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoBagHandleOutline } from 'react-icons/io5'
import { GoHome } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Modal } from 'react-bootstrap'
import noteContext from '../Context/noteContext'

const Cart = () => {

 const cartData = JSON.parse(localStorage.getItem("cardDetail")) || []
  console.log(cartData);

 const {AddFormik} = useContext(noteContext)

  const handleRemove = (id) => {
      console.log(id);
  }

  const [addAddressPopup, setAddAddressPopup] = useState(false)
  const [addType, setAddType] = useState("Home")

  const handleAddType = (type) => {
     setAddType(type)
  }
  

  return (
    <>

    {/* *************** Empty Cart ************    */}
     <section className='d-none'>
      <div className='ds_empty-inner'>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-center'>
             <img src={require("../Img/dhruvin/empty-cart.png")} alt=""  width="20%"/>
              <h3 className='ds_color'>Your cart is empty</h3>
              <p>You have no items in your cart</p>
              <button className='ds_empty-btn'>Continue Shopping</button>
          </div>
        </div>
      </div>
     </section>
  

    {/* *************** Cart ************    */}
      <section className='mb-5 pb-sm-5 '>
        <div className='ds_container'>
            <div>
                <h2>Cart</h2>
            </div>
            <div className="row ">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-3">

                      {cartData?.map((element , index)=>{
                         const {product} = element                         
                           return(
                              <div key={product?.id} className='ds_cart-box mt-4'>
                                   <div className='text-end'>
                                      <IoIosCloseCircle onClick={()=> handleRemove(index)} className='ds_cart-cancel ds_cursor' />
                                   </div>
                                  <div className='d-flex justify-content-between flex-wrap'>
                                     <div>
                                       <div className='d-flex ds_cart-flex'>
                                           <div className='mx-auto'>
                                               <img src={require("../Img/dhruvin/ring.png")} alt="" />
                                           </div>
                                           <div className='ds_cart-deta'>
                                              <h6>{product?.product_name}</h6>
                                              <p className='ds_tcolor mb-0'>Metal : <span className='ds_color'>{product?.metal} {product?.metal_color}</span></p>
                                              <p className='ds_tcolor mb-0'>Metal Color  : <span className='ds_color'> {product?.metal_color}</span></p>
                                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'> {product?.sku}</span></p>
                                              <p className='ds_tcolor mb-0'>Size : <span className='ds_color'> {element?.size}</span></p>
                                              <p className='ds_tcolor mb-0'>Diamond Quality: <span className='ds_color'> {product?.diamond_quality}</span></p>
                                           </div>
                                       </div>
                                     </div>
           
                                     <div className='d-flex ds_cart-manage'>
                                        <h5 className='ds_color mt-2'>{product?.price}<span className='ds_cart-less-price ms-2'>{parseInt(product.price * product?.discount / 100 ) + parseInt(product.price)}</span></h5>
                                        <div className='ds_cart-mul mt-auto'>
                                           <div className='d-flex justify-content-between'>
                                               <div>
                                                 <FaMinus className='text-light ds_cart-ico' />
                                               </div>
                                               <div className='text-light'>
                                                   1
                                               </div>
                                               <div>
                                                  <FaPlus className='text-light ds_cart-ico' />
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
                            <div className='d-flex justify-content-between align-items-center'>
                               <h5 className='mb-0'>No saved Addresses</h5>
                               <div>
                                 <button className='ds_cart-add-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Address</button>
                               </div>
                            </div>
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
                                   <input type="text" className="form-control ds_add-input" id="exampleInputEmail1" placeholder="Enter coupon code" aria-describedby="emailHelp" />
                                   <button className=" ds_add-apply">Apply</button>
                                 </form>
                               </div>
                             </div>
                             <div className="px-3 mt-3 fw-500">
                               <p className="ds_add-special" style={{fontWeight:'600'}}>Special offers</p>
                               <div className="form-check d-flex align-items-center">
                                 <input className="form-check-input ds_cursor ds_cart-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                 <div className="ms-2">
                                   <label className="form-check-label fw-bold ds_add-label ds_color" htmlFor="flexRadioDefault1">NEW100</label>
                                   <p className="text-muted ds_tcolor mb-0 mt-1" style={{ lineHeight: "18px" }}>
                                     Get Flat $100 Off on cart value of 500 & Above
                                   </p>
                                   <label className="form-check-label  ds_color mt-1" style={{fontWeight:'600'}} htmlFor="flexRadioDefault1">Save $100</label>
                                 </div>
                               </div>
                               <div className="form-check d-flex align-items-center mt-3">
                                 <input className="form-check-input ds_cursor ds_cart-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                 <div className="ms-2">
                                   <label className="form-check-label fw-bold ds_add-label ds_color" htmlFor="flexRadioDefault1">
                                     NEW100
                                   </label>
                                   <p className="text-muted  ds_tcolor mb-0" style={{ lineHeight: "18px" }}>
                                     Lorem ipsum dolor sit amet consectetur. Massa facilisis scelerisque iaculis habitant congue estblandit amet.</p>
                                   <label className="form-check-label ds_color" htmlFor="flexRadioDefault1" style={{fontWeight:'600'}} >
                                     Save $100
                                   </label>
                                 </div>
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

    {/* *************** Add New Address Popup ************    */}
      <section>
        <div>
        <Modal className="modal fade" show={addAddressPopup} centered onHide={()=> setAddAddressPopup(false)} id="addressModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ds_add-modal modal-dialog-centered m-0">
              <div className="modal-content border-0" style={{borderRadius:'0'}}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" onClick={()=> setAddAddressPopup(false)}></button>
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
                                 {/* { AddFormik.errors.address &&  AddFormik.touched.address ? <p className='ds_new-danger mb-0'>{AddFormik.errors.address}</p> : null} */}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Pincode</label>
                               <input type="number" name='pincode' value={AddFormik.values.pincode} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Pincode" />
                               {/* { AddFormik.errors.pincode &&  AddFormik.touched.pincode ? <p className='ds_new-danger mb-0'>{AddFormik.errors.pincode}</p> : null} */}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>State</label>
                               <input type="text" name='state' value={AddFormik.values.state} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur}  className='ds_new-input' placeholder="State" />
                               {/* { AddFormik.errors.state &&  AddFormik.touched.state ? <p className='ds_new-danger mb-0'>{AddFormik.errors.state}</p> : null} */}
                             </div>
                         </div>

                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>City</label>
                               <input type="text" name='city' value={AddFormik.values.city} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="City" />
                               {/* { AddFormik.errors.city &&  AddFormik.touched.city ? <p className='ds_new-danger mb-0'>{AddFormik.errors.city}</p> : null} */}
                             </div>
                         </div>

                     </div>

                     <h6 className='ds_color mt-3'>Contact Details</h6>
                     <div className="row">
                        <div className="col-xl-6 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Full Name </label>
                                 <input type="text" name='name' value={AddFormik.values.name} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Full Name" />
                                 {/* { AddFormik.errors.name &&  AddFormik.touched.name ? <p className='ds_new-danger mb-0'>{AddFormik.errors.name}</p> : null} */}
                             </div>
                         </div>
                         <div className="col-xl-6 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Contact No. </label>
                                 <input type="number" name='phone' value={AddFormik.values.phone} onChange={AddFormik.handleChange} onBlur={AddFormik.handleBlur} className='ds_new-input' placeholder="Contact No" />
                                 {/* { AddFormik.errors.phone &&  AddFormik.touched.phone ? <p className='ds_new-danger mb-0'>{AddFormik.errors.phone}</p> : null} */}
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

    {/* *************** Change Address Popup ************    */}
    <section>
      <div>
      <div className="modal fade" id="changeAddress" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog ds_add-modal modal-dialog-centered">
           <div className="modal-content rounded-0">
             <div className="modal-header border-0 px-4">
               <h4 className="modal-title ds_color" id="exampleModalLabel">Address</h4>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body pt-0 px-4">
              <div>
                 <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-sm-0 mt-3">
                    <div className='ds_chan-box'>
                       <div className='d-flex justify-content-between align-items-center px-3'>
                         <h5 className='mb-0 ds_color '>Home</h5>
                         <BsThreeDotsVertical />
                       </div>
                       <div className='ds_chan-line mt-2'></div>
                       <div className='px-3 mt-3'>
                         <p className='ds_600 mb-2'>Johan Patel</p>
                         <p className='ds_600 mb-2'>+91 8541200236</p>
                         <p className='ds_600'>510, Shelley Street, Sydney, NSW 2000, dgdf, ruhwbd, Perth 650145, Australia</p>
                       </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-md-0 mt-3 ">
                    <div className='ds_chan-box'>
                       <div className='d-flex justify-content-between align-items-center px-3'>
                         <h5 className='mb-0 ds_color '>Work</h5>
                         <BsThreeDotsVertical />
                       </div>
                       <div className='ds_chan-line mt-2'></div>
                       <div className='px-3 mt-3'>
                         <p className='ds_600 mb-2'>Johan Patel</p>
                         <p className='ds_600 mb-2'>+91 8541200236</p>
                         <p className='ds_600'>510, Shelley Street, Sydney, NSW 2000, dgdf, ruhwbd, Perth 650145, Australia</p>
                       </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4 mb-2">
                    <div>
                      <button className='ds_new-save' data-bs-toggle="modal" data-bs-target="#removeProduct">+ Add new address</button>
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
 
    {/* *************** Remove Product Popup ************    */}
    <section>
      <div>
        <div className="modal fade" id="removeProduct"  aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ds_add-modal modal-dialog-centered">
            <div className="modal-content rounded-0">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='text-center'>
                   <img src={require("../Img/dhruvin/silver.jpg")} alt="" className='ds_rem-img'/>
                   <h4 className='ds_color mt-4 pt-1'>Move item from cart</h4>
                   <p className='ds_600'>Are you sure you want to remove this item from the cart?</p>
                   <div className='mt-5 mb-5 d-flex flex-wrap justify-content-center '>
                      <button className='ds_rem-btn me-sm-3 ds_600'>Remove</button>
                      <button className='ds_rem-move ds_600'>Move to wishlist</button>
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

export default Cart
