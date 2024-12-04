import React, { useState } from 'react'
import '../Css/dhruvin/MyProfile.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoBagHandleOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyProfile = () => {

    const [activeCard, setActiveCard] = useState(null);

    const toggleDropdown = (index) => {
      setActiveCard(activeCard === index ? null : index);
    };
  
    const addresses = [
      {
        id: 1,
        title: 'Home',
        name: 'Johan Patel',
        phone: '+91 8541200236',
        address: '510, Shelley Street, Sydney, NSW 2000, dgdf, ruhwbd, Perth 650145, Australia',
      },
      {
        id: 2,
        title: 'Home',
        name: 'Johan Patel',
        phone: '+91 8541200236',
        address: '510, Shelley Street, Sydney, NSW 2000, dgdf, ruhwbd, Perth 650145, Australia',
      },
    ];


  return (
    <>
      {/* ************* My Profile ************** */}
      <section>
        <div>
            <div className='ds_container'>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 mt-4">
                        <div>
                           <div className='ds_profile-box'>
                              <h5 className='ds_color text-center'>My Account</h5>
                              <div>
                                <button className='ds_profile-btn ds_active-color ds_600 mt-3'> <img src={require("../Img/dhruvin/profile.png")} alt="" width="7%" /> <span className='ms-2'>My Profile</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/location.png")} alt="" width="7%" /> <span className='ms-2'>My Address</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/card.png")} alt="" width="7%" /> <span className='ms-2'>Saved Cards</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/order.png")} alt="" width="7%" /> <span className='ms-2'>My Wishlist</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/heart.png")} alt="" width="7%" /> <span className='ms-2'>My Order</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
                              </div>
                           </div>
                           <div className='ds_offcanvas-main'>
                               <div className='ds_off-box'>
                                  <div className='d-flex justify-content-between'>
                                    <h2 className='ds_color mb-0'>Account</h2>
                                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                      <i className="fa-solid fa-bars fs-3"></i>
                                    </button>
                                  </div>
                               </div>
                             <div className="offcanvas offcanvas-end"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                              <div className="offcanvas-header">
                                <h4 className="offcanvas-title" id="offcanvasExampleLabel">Account</h4>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                              </div>
                              <div className="offcanvas-body">
                                <div>
                                   <button className='ds_profile-btn ds_active-color ds_600 mt-3'> <img src={require("../Img/dhruvin/profile.png")} alt="" width="7%" /> <span className='ms-2'>My Profile</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/location.png")} alt="" width="7%" /> <span className='ms-2'>My Address</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/card.png")} alt="" width="7%" /> <span className='ms-2'>Saved Cards</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/order.png")} alt="" width="7%" /> <span className='ms-2'>My Wishlist</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/heart.png")} alt="" width="7%" /> <span className='ms-2'>My Order</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                   <button className='ds_profile-btn ds_600'> <img src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
                                </div>
                              </div>
                             </div>
                           </div>

                           
                        </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-8  mt-md-4 mt-5">
                        <div>
                         {/* ************* My Profile ************** */}
                          <section className='d-none'>  
                            <div className='d-none'>
                               <div className='d-flex justify-content-between align-items-center'>
                                   <h3>My Profile</h3>
                                   <button className='ds_edit-btn'>Edit Profile</button>
                               </div>
                               <div className='ds_profile-inner mt-4'>
                                  <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-5">
                                        <div className='d-flex justify-content-between'>
                                            <p>Name</p>
                                            <p>:</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Date of Birth</p>
                                            <p>:</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Phone No.</p>
                                            <p>:</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Email</p>
                                            <p>:</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Gender</p>
                                            <p>:</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Pin Code</p>
                                            <p>:</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-7">
                                        <div className='ms-3'>
                                            <p className='ds_600'>Jhon Wick</p>
                                            <p className='ds_600'>22-03-1990</p>
                                            <p className='ds_600'>85555 55555</p>
                                            <p className='ds_600'>example@gmail.com</p>
                                            <p className='ds_600'>Male</p>
                                            <p className='ds_600'>596921</p>
                                        </div>
                                    </div>
                                  </div>
                               </div>
                            </div>

                            {/* ------------ Edit Profile ------------- */}
                            <div>
                                <div>
                                   <h3>Edit Profile</h3>
                                </div>
                                <div className='ds_edit-box mt-4'>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Name</label>
                                                <input type="text" className='ds_edit-input' placeholder='Jhon Wick' />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div className='position-relative'>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Date of Birth</label>
                                                <input type="text" className='ds_edit-input' placeholder='Jhon Wick' />
                                                <div className=''>
                                                    {/* <img className='ds_edit-calender' src={require("../Img/dhruvin/calender.png")} alt="" width="4%" /> */}
                                                    <i className="fa-solid fa-calendar-days ds_edit-calender ds_color"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Phone No.</label>
                                                <input type="text" className='ds_edit-input' placeholder='85555 55555' />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Email</label>
                                                <input type="email" className='ds_edit-input' placeholder='example@gmail.com' />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Gender</label>
                                                <select className='ds_edit-input'>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                            <div>
                                                <label htmlFor="" className='ds_600 d-block mb-1'>Pin code</label>
                                                <input type="email" className='ds_edit-input' placeholder='596921'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-center mt-5 mb-3'>
                                            <button className='ds_edit-cencel ds_600 me-sm-4'>Cancel</button>
                                            <button className='ds_edit-save ds_600'>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </section>

                         {/* ************* My Address ************** */}
                         <section className='d-none'>
                            <div>
                               <div className='d-flex justify-content-between align-items-center'>
                                   <h3>My Address</h3>
                                   <button className='ds_add-btn' data-bs-toggle="modal" data-bs-target="#addressModal"><i className="fa-solid fa-plus me-2"></i> Add New Address</button>
                               </div>
                               <div className='ds_add-box mt-4'>
                                  <div className='mb-4'>
                                     <div className="row">
                                     {addresses.map((item, index) => (
                                         <div key={item.id} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                           <div className="ds_chan-box position-relative">
                                             <div className="d-flex justify-content-between align-items-center px-3">
                                               <h5 className="mb-0 ds_color">{item.title}</h5>
                                               <BsThreeDotsVertical onClick={() => toggleDropdown(index)} style={{ cursor: 'pointer' }} />
                                               {activeCard === index && (
                                                 <div className="ds_add-mini">
                                                   <p className="ds_600">Edit</p>
                                                   <p className="ds_600" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</p>
                                                   <p className="ds_600">Make as default</p>
                                                 </div>
                                               )}
                                             </div>
                                             <div className="ds_chan-line mt-2"></div>
                                             <div className="px-3 mt-3">
                                               <p className="ds_600 mb-2">{item.name}</p>
                                               <p className="ds_600 mb-2">{item.phone}</p>
                                               <p className="ds_600">{item.address}</p>
                                             </div>
                                           </div>
                                         </div>
                                          ))}
                                     </div>
                                  </div>
                               </div>

                               {/* ---------------- Add New Address Popup ------------------ */}
                                   <section>
                                          <div>
                                           <div className="modal fade" id="addressModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                             <div className="modal-dialog ds_add-modal modal-dialog-centered">
                                               <div className="modal-content" style={{borderRadius:'0'}}>
                                                 <div className="modal-header border-0 pb-0">
                                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                 </div>
                                                 <div className="modal-body pt-0 px-4">
                                                    <h4 className="modal-title text-center ds_color" >Add New Address</h4>
                                                    <div>
                                                      <h6 className='ds_color mt-3'>Area Details</h6>
                                                      <div className="row">
                                                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Address (House No, Building, Street, Area)</label>
                                                                  <input type="text" className='ds_new-input' placeholder="Address (House No, Building, Street, Area)" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>Locality</label>
                                                                <input type="text" className='ds_new-input' placeholder="Sector/Locality" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>Pincode</label>
                                                                <input type="text" className='ds_new-input' placeholder="Pincode" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>State</label>
                                                                <input type="text" className='ds_new-input' placeholder="State" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>City</label>
                                                                <input type="text" className='ds_new-input' placeholder="City" />
                                                              </div>
                                                          </div>
                                  
                                                      </div>
                                  
                                                      <h6 className='ds_color mt-3'>Contact Details</h6>
                                                      <div className="row">
                                                         <div className="col-xl-6 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Full Name </label>
                                                                  <input type="text" className='ds_new-input' placeholder="Full Name" />
                                                              </div>
                                                          </div>
                                                          <div className="col-xl-6 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Contact No. </label>
                                                                  <input type="text" className='ds_new-input' placeholder="Contact No" />
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                        <h6 className='ds_color mt-3'>Address Type</h6>
                                                        <button className='ds_new-home mt-2 me-2'><GoHome className='ds_home-icon' /> Home</button>
                                                        <button className='ds_new-work mt-2 me-2'><IoBagHandleOutline className="ds_home-icon" /> Work</button>
                                                        <button className='ds_new-other mt-2'> Other</button>
                                                      </div>
                                                      <div>
                                                        <div className="row justify-content-center">
                                                          <div className="col-xl-6 mt-5 mb-3">
                                                            <div>
                                                               <button className='ds_new-save'>Save Address</button>
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


                               {/* ---------------- Delete Item Popup ------------------ */}
                                 <section>
                                    <div>
                                    <div className="modal fade" id="deleteModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                       <div className="modal-dialog modal-dialog-centered ds_delete-modal">
                                         <div className="modal-content">
                                           <div className="modal-header border-0">
                                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                           </div>
                                           <div className="modal-body text-center pt-0">
                                             <h4 className="modal-title ds_color" id="exampleModalLabel">Delete Address</h4>
                                             <h6>Are you sure you want to Delete Address?</h6>
                                             <div className='mt-5 mb-4'>
                                                <button className='ds_delete-no'>No</button>
                                                <button className='ds_delete-yes'>Yes</button>
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                    </div>
                                 </section>
                            </div>
                         </section>

                         {/* ************* Saved Cards ************** */}
                          <section className='d-none'>
                            <div>
                                <div>
                                  <div className='d-flex justify-content-between align-items-center'>
                                      <h3>Saved Cards</h3>
                                      <button className='ds_add-btn' data-bs-toggle="modal" data-bs-target="#addNewCard"><i className="fa-solid fa-plus me-2"></i> Add New Card</button>
                                  </div>

                                {/* -------------- No Cards ------------ */}
                                  <section className='ds_save-box mt-4 d-none'>
                                    <div className='text-center h-100 d-flex justify-content-center align-items-center'>
                                        <div>
                                          <div className=''>
                                            <img src={require("../Img/dhruvin/no-card.png")} alt="" width="40%" />
                                            <h5 className='mt-4'>You have no saved debit or credit card</h5>
                                            </div>
                                        </div>
                                    </div>
                                  </section>
                                </div> 

                                {/* -------------- Save Card ------------ */}
                                <section>
                                    <div className='ds_save-inner mt-4'>
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-6 mt-3">
                                                <div className='ds_card-make position-relative h-100 d-flex flex-column'>
                                                      <FaRegTrashAlt className='ds_save-trash' data-bs-toggle="modal" data-bs-target="#deletePopup" />
                                                       <div>
                                                          <h5 className='text-light'>Credit Card Balance</h5>
                                                          <h3 className='text-light fw-bold mt-4'>$ 8,850.62</h3>
                                                          <p className='text-light ds_600'>$25.000 <span className='ds_save-limit'>Card limit</span> </p>
                                                       </div>
                                                       <div className=' mt-auto'>
                                                            <div className='d-flex justify-content-between'>
                                                              <h5 className='text-light mb-0'>Username</h5>
                                                              <h5 className='text-light mb-0'>06/28</h5>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-6 mt-3">
                                                <div className='ds_card-make2 position-relative h-100 d-flex flex-column'>
                                                   <FaRegTrashAlt className='ds_save-trash text-dark' /> 
                                                   <div className='mt-5 pt-3'>
                                                    <h3>**** **** **** 6848</h3>
                                                   </div>
                                                   <div className='mt-auto pt-3'>
                                                      <h5 className='mb-0'>Username</h5>
                                                      <h5 className='mb-0'>06/28</h5>
                                                   </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-6 mt-3">
                                                <div className='ds_card-make3 position-relative h-100 d-flex flex-column '>
                                                   <FaRegTrashAlt className='ds_save-trash text-light' /> 
                                                   <div className='mt-5 pt-xl-3 pt-4 d-flex justify-content-between align-items-center text-light'>
                                                      <h3>**** **** 4575</h3>
                                                      <h6>EXP 05/26</h6>
                                                   </div>
                                                   <div className='mt-auto d-flex justify-content-between align-items-center text-light pt-xl-0 pt-4'>
                                                      <h5 className='mb-0'>Username</h5>
                                                      <h4 className='mb-0 fw-bold'>VISA</h4>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* -------------- Add New Card Popup ------------ */}
                                 <section>
                                    <div>
                                        <div>
                                           <div className="modal fade" id="addNewCard"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                             <div className="modal-dialog ds_add-new-popup modal-dialog-centered">
                                               <div className="modal-content" style={{borderRadius:'0'}}>
                                                 <div className="modal-header border-0 pb-0">
                                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                 </div>
                                                 <div className="modal-body pt-0 px-4">
                                                    <h4 className="modal-title text-center ds_color fw-bold" >Add New Card</h4>
                                                    <div>
                                                      <div className="row">
                                                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Card holder name</label>
                                                                  <input type="text" className='ds_new-input' placeholder="Enter card holder name" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>Card No.</label>
                                                                <input type="text" className='ds_new-input' placeholder="Enter card no." />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>CVV</label>
                                                                <input type="text" className='ds_new-input' placeholder="Enter CVV" />
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>Expiry Date</label>
                                                                <input type="text" className='ds_new-input' placeholder="mm-yy" />
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                        <div className="row justify-content-center">
                                                          <div className="col-xl-6 mt-5 mb-3">
                                                            <div>
                                                               <button className='ds_new-save'>Save</button>
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
                                    </div>
                                 </section>

                                    {/* ---------------- Delete Popup ------------------ */}
                                 <section>
                                    <div>
                                      <div className="modal fade" id="deletePopup"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                       <div className="modal-dialog modal-dialog-centered ds_delete-modal">
                                         <div className="modal-content">
                                           <div className="modal-header border-0">
                                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                           </div>
                                           <div className="modal-body text-center pt-0">
                                             <h4 className="modal-title ds_color" id="exampleModalLabel">Delete</h4>
                                             <h6>Are you sure you want to delete card?</h6>
                                             <div className='mt-4 pt-3 mb-4'>
                                                <button className='ds_delete-no'>No</button>
                                                <button className='ds_delete-yes'>Yes</button>
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                      </div>
                                    </div>
                                 </section>

                             </div>
                          </section>

                         {/* ************* My Order ************** */}
                          <section>
                            <div className='mb-5'>
                                <div className='d-flex flex-wrap justify-content-sm-between ds_order-manage align-items-center'>
                                    <h3 style={{whiteSpace:'nowrap'}} className='mb-md-2'>My Orders</h3>
                                    <div>
                                        <button className='ds_order-all ds_order-active-btn me-2'>All</button>
                                        <button className='ds_order-prog me-2'>In Progress</button>
                                        <button className='ds_order-prog me-2'>Delivered</button>
                                        <button className='ds_order-prog '>Cancelled</button>
                                    </div>
                                </div>
                                <div className='ds_order-bg mt-4'>
                                     
                                    {/* ----------------------- Empty Card ------------------- */}
                                    <div className='d-none'>
                                     <div className='d-flex justify-content-center align-items-center h-100'>
                                        <div className='text-center'>
                                            <div>
                                              <img src={require("../Img/dhruvin/no-item.png")} alt="" width="30%" />
                                            </div>
                                            <div>
                                                <h5>No orders yet</h5>
                                                <p className='text-muted'>You have no order yet with us keep shopping </p>
                                                <button className='ds_order-browse'>Browse Products</button>
                                            </div>
                                        </div>
                                     </div>
                                    </div>

                                    {/* ----------------------- My Order ------------------- */}
                                    <div>
                                      <div className=' px-4 pb-4'>
                                        <div className="row">
                                          <div className="col-xl-12 mt-4">
                                            <div className='ds_order-inner'>
                                              <div className='d-flex flex-wrap ds_order-flex  align-items-center '>
                                                <div className='d-flex flex-wrap px-3 pt-2'>
                                                   <p className='ds_order-progress mb-0'>In progress</p>
                                                   <p className='ds_order-text ds_600 mb-0'>10 Oct 2023</p>
                                                   <p className='ds_order-order mb-0'><span className='text-muted'>Order Id : </span><span className='ds_color'>12057598140</span></p>
                                                </div>
                                                 <Link to="" className='text-dark ds_600 pe-3 ms-lg-0 ms-3'>Track Order</Link>
                                              </div>
                                              <div className='ds_order-line mt-2'></div>
                                              <div className='px-3 my-4'>
                                                 <div className='d-flex justify-content-between flex-wrap '>
                                                     <div>
                                                         <div className='d-flex ds_cart-flex'>
                                                           <div className='mx-auto'>
                                                               <img className='ds_oder-img' src={require("../Img/dhruvin/ring.png")} alt="" />
                                                           </div>
                                                           <div className='ds_cart-deta'>
                                                              <h6>Dual Tone Halo Diamond Finger Ring</h6>
                                                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>PD00003-14-RS-FGVVSVS</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> 925 Silver</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'>Silver</span></p>
                                                              <p className='ds_tcolor mb-0'>Size : <span className='ds_color'> 5</span></p>
                                                           </div>
                                                         </div>
                                                     </div>
                                                     <div className='mt-lg-0 mt-4'>
                                                        <h5><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h5>
                                                     </div>
                                                 </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-xl-12 mt-4">
                                            <div className='ds_order-inner'>
                                              <div className='d-flex flex-wrap ds_order-flex  align-items-center '>
                                                <div className='d-flex flex-wrap px-3 pt-2'>
                                                   <p className='ds_order-deliver mb-0'>Delivered</p>
                                                   <p className='ds_order-text ds_600 mb-0'>05 Oct 2023</p>
                                                   <p className='ds_order-order mb-0'><span className='text-muted'>Order Id : </span><span className='ds_color'>12057598140</span></p>
                                                </div>
                                                 <Link to="" className='text-dark ds_600 pe-3 ms-lg-0 ms-3'>Return Order</Link>
                                              </div>
                                              <div className='ds_order-line mt-2'></div>
                                              <div className='px-3 my-4'>
                                                 <div className='d-flex justify-content-between flex-wrap '>
                                                     <div>
                                                         <div className='d-flex ds_cart-flex'>
                                                           <div className='mx-auto'>
                                                               <img className='ds_oder-img' src={require("../Img/dhruvin/gold.png")} alt="" />
                                                           </div>
                                                           <div className='ds_cart-deta'>
                                                              <h6>Pal Gold Earrings</h6>
                                                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>PD00003-14-RS-FGVVSVS</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> 925 Silver</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'>Gold</span></p>
                                                              {/* <p className='ds_tcolor mb-0'>Size : <span className='ds_color'> 5</span></p> */}
                                                           </div>
                                                         </div>
                                                     </div>
                                                     <div className='d-flex flex-column mt-lg-0 mt-4'>
                                                        <h5><span className='ds_color'>₹1200</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h5>
                                                        <h6 className='mt-auto'> <Link to="" className='text-dark'>Submit review</Link> </h6>
                                                     </div>
                                                 </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-xl-12 mt-4">
                                            <div className='ds_order-inner'>
                                              <div className='d-flex flex-wrap ds_order-flex  align-items-center '>
                                                <div className='d-flex flex-wrap px-3 pt-2'>
                                                   <p className='ds_order-cencel mb-0'>Cancelled</p>
                                                   <p className='ds_order-text ds_600 mb-0'>10 Oct 2023</p>
                                                   <p className='ds_order-order mb-0'><span className='text-muted'>Order Id : </span><span className='ds_color'>12057598140</span></p>
                                                </div>
                                              </div>
                                              <div className='ds_order-line mt-2'></div>
                                              <div className='px-3 my-4'>
                                                 <div className='d-flex justify-content-between flex-wrap '>
                                                     <div>
                                                         <div className='d-flex ds_cart-flex'>
                                                           <div className='mx-auto'>
                                                               <img className='ds_oder-img' src={require("../Img/dhruvin/ring.png")} alt="" />
                                                           </div>
                                                           <div className='ds_cart-deta'>
                                                              <h6>Pal Gold Earrings</h6>
                                                              <p className='ds_tcolor mb-0'>SKU : <span className='ds_color'>PD00003-14-RS-FGVVSVS</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal :<span className='ds_color'> 925 Silver</span></p>
                                                              <p className='ds_tcolor mb-0'>Metal Color :<span className='ds_color'>Gold</span></p>
                                                           </div>
                                                         </div>
                                                     </div>
                                                     <div className='mt-lg-0 mt-4'>
                                                        <h5><span className='ds_color'>₹1000</span> <span className='ms-2 ds_order-line-txt'>₹1500</span></h5>
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default MyProfile
