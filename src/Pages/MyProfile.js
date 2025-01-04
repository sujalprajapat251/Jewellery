import React, { useContext , useEffect,  useState } from 'react'
import '../Css/dhruvin/MyProfile.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoBagHandleOutline } from 'react-icons/io5';
import { GoHeartFill, GoHome } from 'react-icons/go';
import { FaRegTrashAlt, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../Context/noteContext';
import { Col, Modal, Offcanvas, Row } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

const MyProfile = () => {

      // ******* My Profile *******
    const { profileData , store , Api,

     // ------ Edit User State -----
     editToggle , EditFormik , handleCancel , handleEditToggle,

     // ------ My Address ------
     addType, myAddData, newAddModal, setNewAddModal 
     , AddFormik , handleAddType , singleNewAdd, setSingleNewAdd , handleMark, hello ,
    
     // ------- Add New Single Address Popup --------
     activeCard, setActiveCard , SingleAddFormik , handleSingleNewAdd ,

     //--------- Delete Item Popup ---------
     deleteAdd, setDeleteAdd , handleDeleteAdd , handleDeleteYes ,

     // ********** My Order **********
     orderMain,filteredOrders, setFilteredOrders,handleTrackOrder,

     // ********** My Wishlist *********
     wishlistData, findWishlistID, allProduct ,
    //  ******** Change Password **********
    changePassToggle, setChangePassToggle ,ChangePassFormik ,

    // ************ Return Order ***********
    handleReturnOrder,

    // logout 
    userHandling
    } = useContext(noteContext) 

    const navigate = useNavigate()
    const [offcanvasToggle, setOffcanvasToggle] = useState(false)

    
    function capitalizeFirstLetter(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const [activeBtn, setActiveBtn] = useState("All")
    const [mainActive, setMainActive] = useState("My Profile")

    const toggleDropdown = (index) => {
      setActiveCard(activeCard === index ? null : index);
    };

    const handleFilter = (data) => {
       setActiveBtn(data);
     
       if(Array.isArray(filteredOrders)){
          if (data === "All") {
            setFilteredOrders(orderMain); 
          } else {
            const filterData = orderMain?.filter((element)=>{
              return element?.order_status === data
            })  
            
            setFilteredOrders(filterData);
          }
       }
       
    };

  // console.log("Zzz" , filteredOrders);
  

  console.log(profileData);
  


  // **********  Submit Review Popup  ********
   const [subRevToggle, setSubRevToggle] = useState(false)
   const [rating, setRating] = useState(0);
   const [reviewId, setReviewId] = useState(null)
   const [customerID, setCustomerID] = useState(null)
   const [reviewProdId, setReviewProdId] = useState([])
   const [uploadedImages, setUploadedImages] = useState([]);
   const [feedback, setFeedback] = useState("")


   const handleSubmitReview = (id , customer_id , prod_id) => {
     setSubRevToggle(true)
     setReviewId(id)
     setCustomerID(customer_id)
     setReviewProdId([...new Set(prod_id)])
   }

   const handleRating = (value) => {
    setRating(value); 
   };

   const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file, 
      preview: URL.createObjectURL(file), 
    }));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };
  
  const handleRemoveImage = (index) => {
    setUploadedImages((prevMedia) => {
      const updatedMedia = prevMedia.filter((_, i) => i !== index);
      prevMedia.forEach((media, i) => {
        if (i === index) URL.revokeObjectURL(media.preview); 
      });
      return updatedMedia;
    });
  };

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');

const finalDate = `${year}-${month}-${day}`

const handleReviewSubmit = async () => {
  if (!rating || !feedback || uploadedImages.length === 0) {
    alert("Please upload an image or video, provide a rating, and add feedback.");
    return;
  }

  const formData = new FormData();
  formData.append("customer_id", customerID);
  formData.append("description", feedback);
  formData.append("rating", rating);
  formData.append("date", finalDate);
  formData.append("order_id", reviewId);

  uploadedImages.forEach((media, index) => {
    if (media.file) {
      formData.append(`image[${index}]`, media.file);
    }
  });

  reviewProdId?.forEach((element, index) => {
    formData.append(`product_id[${index}]`, element);
  });

  let retryCount = 0;
  const maxRetries = 3;
  const retryDelay = (attempt) => Math.pow(2, attempt) * 1000;

  const attemptSubmit = async () => {
    try {
      const response = await axios.post(`${Api}/reviews/create`, formData, {
        headers: {
          Authorization: `Bearer ${store?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Review submitted successfully!");
      console.log(response);

      setRating(0);
      setFeedback("");
      setUploadedImages([]);
      setCustomerID(null);
      setReviewProdId([]);
      setReviewId(null);
      setSubRevToggle(false); 
    } catch (error) {
      if (error.response?.status === 429 && retryCount < maxRetries) {
        retryCount++;
        const delay = retryDelay(retryCount);
        console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        await attemptSubmit();
      } else {
        console.error("Error submitting review:", error);
        alert("Failed to submit the review. Please try again later.");
      }
    }
  };

  await attemptSubmit();
};


useEffect(() => {
  return () => {
    uploadedImages.forEach((media) => {
      URL.revokeObjectURL(media.preview); 
    });
  };
}, [uploadedImages]);


// ************** My  WishList ***********
const [wishlistproducts, setWishlistData] = useState([]);
useEffect(() => {
    const productData = allProduct.filter((wishlistItem) =>
        wishlistData.some((product) => product.product_id === wishlistItem.id)
    );
    // console.log('data',productData);
    setWishlistData(productData);
}, [wishlistData, allProduct]);


  //  ************ LogOut Modal *********
  const [logOut, setLogOut] = useState(false)

   const handleLogOut = () => {
    userHandling();
      navigate("/")
      // window.location.reload()

   }

  return (
    <>
      {/* ************* My Profile ************** */} 
      <section className='mb-5 pb-sm-5'>
        <div>
            <div className='ds_container'>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 mt-4">
                        <div>
                           <div className='ds_profile-box'>
                              <h5 className='ds_color text-center'>My Account</h5>
                              <div>
                                <button onClick={()=>setMainActive("My Profile")} className={`ds_profile-btn ${mainActive === "My Profile" ? 'ds_active-color ' : ''}  ds_600 mt-3`}> <img className={`${mainActive === "My Profile" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/profile.png")} alt="" width="7%" /> <span className='ms-2'>My Profile</span></button>
                                <button onClick={()=>setMainActive("My Address")} className={`ds_profile-btn ${mainActive === "My Address" ? 'ds_active-color' : ''} ds_600`}> <img className={`${mainActive === "My Address" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/location.png")} alt="" width="7%" /> <span className='ms-2'>My Address</span></button>
                                <button onClick={()=>setMainActive("Saved Cards")} className={`ds_profile-btn ${mainActive === "Saved Cards" ? 'ds_active-color' : ''} ds_600`}> <img className={`${mainActive === "Saved Cards" ? 'ds_profile_img_color ' : ''} `}  src={require("../Img/dhruvin/card.png")} alt="" width="7%" /> <span className='ms-2'>Saved Cards</span></button>
                                <button onClick={()=>setMainActive("My Order")} className={`ds_profile-btn ${mainActive === "My Order" ? 'ds_active-color' : ''} ds_600`}> <img className={`${mainActive === "My Order" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/order.png")} alt="" width="7%" /> <span className='ms-2'>My Order</span></button>
                                <button onClick={()=>setMainActive("My Wishlist")} className={`ds_profile-btn ${mainActive === "My Wishlist" ? 'ds_active-color' : ''} ds_600`}>  <img className={`${mainActive === "My Wishlist" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/heart.png")} alt="" width="7%" /> <span className='ms-2'>My Wishlist</span></button>
                                <button onClick={()=>{setMainActive("Change Password"); setChangePassToggle(true);}} className={`ds_profile-btn ${mainActive === "Change Password" ? 'ds_active-color' : ''} ds_600`}> <img className={`${mainActive === "Change Password" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                <button onClick={() =>{setMainActive("Logout"); setLogOut(true)}} className={`ds_profile-btn ${mainActive === "Logout" ? 'ds_active-color' : ''} ds_600`}  > <img className={`${mainActive === "Logout" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
                              </div>
                           </div>
                           <div className='ds_offcanvas-main'>
                               <div className='ds_off-box'>
                                  <div className='d-flex justify-content-between'>
                                    <h2 className='ds_color mb-0'>Account</h2>
                                    <button className="btn" type="button" onClick={()=> setOffcanvasToggle(true)} >
                                      <i className="fa-solid fa-bars fs-3"></i>
                                    </button>
                                  </div>
                               </div>
                                  <Offcanvas className="ds_offcanvas-inner" show={offcanvasToggle} onHide={()=> setOffcanvasToggle(false)} placement={'end'}>
                                      <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className='ds_color'>Account</Offcanvas.Title>
                                           {/* <button type="button" className="btn-close text-reset" onClick={()=> setOffcanvasToggle(true)}></button> */}
                                      </Offcanvas.Header>
                                      <Offcanvas.Body>
                                         <div>
                                             <button onClick={()=>{setMainActive("My Profile"); setOffcanvasToggle(false)}} className={`ds_profile-btn ${mainActive === "My Profile" ? 'ds_active-color ' : ''}  ds_600 mt-3`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Profile" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/profile.png")} alt="" width="7%" /> <span className='ms-2'>My Profile</span></button>
                                             <button onClick={()=>{setMainActive("My Address"); setOffcanvasToggle(false) }} className={`ds_profile-btn ${mainActive === "My Address" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Address" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/location.png")} alt="" width="7%" /> <span className='ms-2'>My Address</span></button>
                                             <button onClick={()=>{setMainActive("Saved Cards"); setOffcanvasToggle(false) }} className={`ds_profile-btn ${mainActive === "Saved Cards" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "Saved Cards" ? 'ds_profile_img_color ' : ''} `}  src={require("../Img/dhruvin/card.png")} alt="" width="7%" /> <span className='ms-2'>Saved Cards</span></button>
                                             <button onClick={()=>{setMainActive("My Order"); setOffcanvasToggle(false) }} className={`ds_profile-btn ${mainActive === "My Order" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Order" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/order.png")} alt="" width="7%" /> <span className='ms-2'> My Order</span></button>
                                             <button onClick={()=>{setMainActive("My Wishlist"); setOffcanvasToggle(false) }} className={`ds_profile-btn ${mainActive === "My Wishlist" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close">  <img className={`${mainActive === "My Wishlist" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/heart.png")} alt="" width="7%" /> <span className='ms-2'>My Wishlist</span></button>
                                             <button onClick={()=>{setMainActive("Change Password"); setChangePassToggle(true); setOffcanvasToggle(false)}} className={`ds_profile-btn ${mainActive === "Change Password" ? 'ds_active-color' : ''} ds_600`} > <img className={`${mainActive === "Change Password" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                             <button onClick={() =>{setMainActive("Logout"); setLogOut(true); setOffcanvasToggle(false)}} className={`ds_profile-btn ${mainActive === "Logout" ? 'ds_active-color' : ''} ds_600`}  > <img className={`${mainActive === "Logout" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
                                          </div>
                                      </Offcanvas.Body>
                                   </Offcanvas>
                           </div>
                        </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-8  mt-md-4 mt-5">
                        <div>

                         {/* ************* My Profile ************** */}
                         {mainActive === "My Profile" ? (
                          <section className="">  
                            <div className={`${editToggle ? 'd-none' : 'd-block'}`}>
                               <div className='d-flex justify-content-between align-items-center'>
                                   <h3>My Profile</h3>
                                   <button className='ds_edit-btn' onClick={handleEditToggle}>Edit Profile</button>
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
                                            <p className='ds_600'>{profileData?.name}</p>
                                            <p className='ds_600'>{profileData?.dob }</p>
                                            <p className='ds_600'>{profileData?.phone}</p>
                                            <p className='ds_600 ds_myprofile-scroll overflow-x-auto'>{profileData?.email}</p>
                                            <p className='ds_600'>{profileData?.gender}</p>
                                            <p className='ds_600'>{profileData?.pincode}</p>
                                        </div>
                                    </div>
                                  </div>
                               </div>
                            </div>

                            {/* ------------ Edit Profile ------------- */}
                            {editToggle ? (<div>
                                <div>
                                   <h3>Edit Profile</h3>
                                </div>
                                <div className='ds_edit-box mt-4'>
                                    <form onSubmit={EditFormik.handleSubmit}>
                                         <div className="row">
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Name</label>
                                                     <input type="text" name='name' value={EditFormik.values.name} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input' placeholder='Jhon Wick' />
                                                     { EditFormik.errors.name &&  EditFormik.touched.name ? <p className='ds_new-danger mb-0'>{EditFormik.errors.name}</p> : null}
                                                 </div>
                                             </div>
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div className='position-relative'>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Date of Birth</label>
                                                     <input type="date" id="dob" name='dob' value={EditFormik.values.dob} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input' placeholder='Jhon Wick' />
                                                     <div className=''>
                                                         {/* <img className='ds_edit-calender' src={require("../Img/dhruvin/calender.png")} alt="" width="4%" /> */}
                                                         <i className="fa-solid fa-calendar-days ds_edit-calender ds_color"  onClick={() => { const dateInput = document.getElementById('dob');if (dateInput) {dateInput.showPicker ? dateInput.showPicker() : dateInput.focus(); }}} ></i>
                                                     </div>
                                                     { EditFormik.errors.dob &&  EditFormik.touched.dob ? <p className='ds_new-danger mb-0'>{EditFormik.errors.dob}</p> : null}

                                                 </div>
                                             </div>
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Phone No.</label>
                                                     <input type="number" name='phone' value={EditFormik.values.phone} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input' placeholder='85555 55555' />
                                                     { EditFormik.errors.phone &&  EditFormik.touched.phone ? <p className='ds_new-danger mb-0'>{EditFormik.errors.phone}</p> : null}
                                                    
                                                 </div>
                                             </div>
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Email</label>
                                                     <input type="email" name='email' value={EditFormik.values.email} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input' placeholder='example@gmail.com' />
                                                     { EditFormik.errors.email &&  EditFormik.touched.email ? <p className='ds_new-danger mb-0'>{EditFormik.errors.email}</p> : null}
                                                 </div>
                                             </div>
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Gender</label>
                                                     <select name='gender' value={EditFormik.values.gender} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input'>
                                                         <option selected>Gender</option>
                                                         <option value="male">Male</option>
                                                         <option value="female">Female</option>
                                                     </select>
                                                     { EditFormik.errors.gender &&  EditFormik.touched.gender ? <p className='ds_new-danger mb-0'>{EditFormik.errors.gender}</p> : null}
                                                 </div>
                                             </div>
                                             <div className="col-xl-6 col-lg-6 col-md-6 mt-4">
                                                 <div>
                                                     <label htmlFor="" className='ds_600 d-block mb-1'>Pin code</label>
                                                     <input type="number"  name='pin' value={EditFormik.values.pin} onChange={EditFormik.handleChange} onBlur={EditFormik.handleBlur} className='ds_edit-input' placeholder='596921'/>
                                                     { EditFormik.errors.pin &&  EditFormik.touched.pin ? <p className='ds_new-danger mb-0'>{EditFormik.errors.pin}</p> : null}
                                                 </div>
                                             </div>
                                         </div>
                                         <div>
                                             <div className='text-center mt-5 mb-3 d-flex flex-wrap justify-content-center'>
                                                 <div className='me-sm-0 me-3'><button className='ds_edit-cencel ds_cursor ds_600 me-sm-4'onClick={handleCancel}>Cancel</button></div>
                                                 <div className='me-sm-0 me-3'><button type='submit' className='ds_edit-save ds_600'>Save</button></div>
                                             </div>
                                         </div>
                                    </form>
                                </div>
                             </div>) : ("")}
                             </section>
                            )
                           :
                          ("")
                          }
                          

                         {/* ************* My Address ************** */}
                         {mainActive === "My Address" ? (
                          <section className=''>
                            <div>
                               <div className='d-flex justify-content-between align-items-center'>
                                   <h3>My Address</h3>
                                   <button className='ds_add-btn' onClick={()=> setNewAddModal(true)}><i className="fa-solid fa-plus me-2"></i> Add New Address</button>
                               </div>
                               <div className='ds_add-box mt-4'>
                                  <div className='mb-4'>
                                     <div className="row">
                                     { myAddData?.map((item , index)=>{
                                         const isDefault = hello === item?.id;
                                        return(
                                          <div key={item.id} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                           <div id='ds_default' className="ds_chan-box position-relative"  style={{border: isDefault ? '0.75px solid #000000' : '0.75px solid #00000033'}}>
                                             <div className="d-flex justify-content-between align-items-center px-3">
                                               <h5 className="mb-0 ds_color">{item.type}</h5>
                                               <div>
                                                  <BsThreeDotsVertical onClick={() => toggleDropdown(index)} style={{ cursor: 'pointer' }} />
                                                  {activeCard === index && (
                                                    <div className="ds_add-mini">
                                                      <p className="ds_add-mini-box ds_600 ds_cursor mb-0" onClick={()=>handleSingleNewAdd(item.id)}>Edit</p>
                                                      <p className="ds_add-mini-box ds_600 ds_cursor mb-0" onClick={()=>handleDeleteAdd(item.id)}>Delete</p>
                                                      <p className="ds_add-mini-box ds_600 ds_cursor mb-0" onClick={()=> handleMark(item.id)}>Make as default</p>
                                                    </div>
                                                  )}
                                               </div>
                                             </div>
                                             <div className="ds_chan-line mt-2"></div>
                                             <div className="px-3 mt-3">
                                               <p className="ds_600 mb-2">{item.contact_name}</p>
                                               <p className="ds_600 mb-2">{item.contact_no}</p>
                                               <p className="ds_600">{item.address}</p>
                                             </div>
                                           </div>
                                         </div>
                                        )
                                      })}
                                     </div>
                                  </div>
                               </div>

                               {/* ---------------- Add New Address Popup ------------------ */}
                                  <section>
                                          <div>
                                           <Modal className="modal fade p-0" show={newAddModal} centered onHide={()=> setNewAddModal(false)} id="addressModal" >
                                           <Modal.Header className='border-0 pb-0' closeButton>
                                               </Modal.Header>
                                               <Modal.Body className='px-sm-4 pt-0 px-0'>
                                                 <div className="modal-body pt-0 px-sm-4">
                                                    <h4 className="modal-title text-center ds_color" >Add New Address</h4>
                                                    <form onSubmit={AddFormik.handleSubmit}>
                                                      <h6 className='ds_color mt-3 mb-0'>Area Details</h6>
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
                                                        <h6 className='ds_color mt-3 mb-0'>Address Type</h6>
                                                        <div className="d-flex flex-wrap ju">
                                                            <div className="me-2 mt-2">
                                                               <button type="button" className={`ds_new-home ${addType === 'Home' ? 'ds_select_type_active' : ''}  `} onClick={()=>handleAddType("Home")}><GoHome className='ds_home-icon' /> Home</button>
                                                            </div>
                                                            <div className="mt-2 me-2">
                                                              <button type="button" className={`ds_new-work ${addType === 'Work' ? 'ds_select_type_active' : ''} `} onClick={()=>handleAddType("Work")}><IoBagHandleOutline className="ds_home-icon" /> Work</button>
                                                            </div>
                                                            <div className="mt-2">
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
                                               </Modal.Body>
                                           </Modal>
                                          </div>
                                  </section>


                                 {/* ---------------- Add New Single Address Popup ------------------ */}
                                 <section>
                                          <div>
                                           <Modal className="modal fade p-0" centered show={singleNewAdd} onHide={()=> setSingleNewAdd(false)} id="addressModal" >
                                               <Modal.Header className='border-0 pb-0' closeButton>
                                               </Modal.Header>
                                               <Modal.Body className='px-4 pt-0'>
                                                    <h4 className="modal-title text-center ds_color" >Edit Address</h4>
                                                    <form onSubmit={SingleAddFormik.handleSubmit}>
                                                      <h6 className='ds_color mt-3'>Area Details</h6>
                                                      <div className="row">
                                                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Address (House No, Building, Street, Area)</label>
                                                                  <input type="text" name='address' value={SingleAddFormik.values.address} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur} className='ds_new-input' placeholder="Address (House No, Building, Street, Area)" />
                                                                  { SingleAddFormik.errors.address &&  SingleAddFormik.touched.address ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.address}</p> : null}
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>Pincode</label>
                                                                <input type="number" name='pincode' value={SingleAddFormik.values.pincode} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur} className='ds_new-input' placeholder="Pincode" />
                                                                { SingleAddFormik.errors.pincode &&  SingleAddFormik.touched.pincode ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.pincode}</p> : null}
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>State</label>
                                                                <input type="text" name='state' value={SingleAddFormik.values.state} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur}  className='ds_new-input' placeholder="State" />
                                                                { SingleAddFormik.errors.state &&  SingleAddFormik.touched.state ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.state}</p> : null}
                                                              </div>
                                                          </div>
                                  
                                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                              <div>
                                                                <label htmlFor="" className='ds_600 mb-1'>City</label>
                                                                <input type="text" name='city' value={SingleAddFormik.values.city} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur} className='ds_new-input' placeholder="City" />
                                                                { SingleAddFormik.errors.city &&  SingleAddFormik.touched.city ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.city}</p> : null}
                                                              </div>
                                                          </div>
                                  
                                                      </div>
                                  
                                                      <h6 className='ds_color mt-3'>Contact Details</h6>
                                                      <div className="row">
                                                         <div className="col-xl-6 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Full Name </label>
                                                                  <input type="text" name='name' value={SingleAddFormik.values.name} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur} className='ds_new-input' placeholder="Full Name" />
                                                                  { SingleAddFormik.errors.name &&  SingleAddFormik.touched.name ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.name}</p> : null}
                                                              </div>
                                                          </div>
                                                          <div className="col-xl-6 mt-3">
                                                              <div>
                                                                  <label htmlFor="" className='ds_600 mb-1'>Contact No. </label>
                                                                  <input type="number" name='phone' value={SingleAddFormik.values.phone} onChange={SingleAddFormik.handleChange} onBlur={SingleAddFormik.handleBlur} className='ds_new-input' placeholder="Contact No" />
                                                                  { SingleAddFormik.errors.phone &&  SingleAddFormik.touched.phone ? <p className='ds_new-danger mb-0'>{SingleAddFormik.errors.phone}</p> : null}
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                        <h6 className='ds_color mt-3'>Address Type</h6>
                                                        <div className="d-flex flex-wrap ">
                                                            <div className="me-2 mt-2">
                                                               <button type="button" className={`ds_new-home ${addType === 'Home' ? 'ds_select_type_active' : ''}  `} onClick={()=>handleAddType("Home")}><GoHome className='ds_home-icon' /> Home</button>
                                                            </div>
                                                            <div className="mt-2 me-2">
                                                              <button type="button" className={`ds_new-work ${addType === 'Work' ? 'ds_select_type_active' : ''} `} onClick={()=>handleAddType("Work")}><IoBagHandleOutline className="ds_home-icon" /> Work</button>
                                                            </div>
                                                            <div className="mt-2">
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
                                               </Modal.Body>
                                            </Modal>
                                          </div>
                                </section> 


                               {/* ---------------- Delete Item Popup ------------------ */}
                                 <section>
                                    <div>
                                    <Modal className="ds_delete-modal" show={deleteAdd} onHide={()=>setDeleteAdd(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                                          <Modal.Header closeButton className="px-3 pt-3 pb-0 border-0">
                                          </Modal.Header>
                                          <Modal.Body className="text-center">
                                          <h4 className="modal-title ds_color" id="exampleModalLabel">Delete</h4>
                                             <h6>Are you sure you want to delete card?</h6>
                                             <div className='mt-4 pt-3 mb-4 ds_delete-flex'>
                                                <button onClick={()=>setDeleteAdd(false)} className='ds_delete-no'>No</button>
                                                <button onClick={handleDeleteYes} className='ds_delete-yes'>Yes</button>
                                             </div>
                                          </Modal.Body>
                                        </Modal>
                                    </div>
                                 </section>
                            </div>
                         </section>
                         ) : ("")}
                         

                         {/* ************* Saved Cards ************** */}
                         {mainActive === "Saved Cards" ? (
                          <section className=''>
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
                          </section>) : ("") }
                          

                         {/* ************* My Order ************** */}
                         {mainActive === "My Order" ? (
                          <section>
                          <div className='mb-5'>
                              <div className='d-flex flex-wrap justify-content-sm-between ds_order-manage align-items-center'>
                                  <h3 style={{whiteSpace:'nowrap'}} className='mb-md-2'>My Orders</h3>
                                  <div>
                                      <button onClick={()=>handleFilter("All")} className={`ds_order-all ${activeBtn === "All" ? 'ds_order-active-btn' :''} me-2`}>All</button>
                                      <button onClick={()=>handleFilter("pending")} className={`ds_order-prog ${activeBtn === "pending" ? 'ds_order-active-btn' :''} me-2`}>In Progress</button>
                                      <button onClick={()=>handleFilter("delivered")} className={`ds_order-prog ${activeBtn === "delivered" ? 'ds_order-active-btn' :''} me-2`}>Delivered</button>
                                      <button onClick={()=>handleFilter("cancelled")} className={`ds_order-prog ${activeBtn === "cancelled" ? 'ds_order-active-btn' :''} me-2`}>Cancelled</button>
                                  </div>
                              </div>
                              <div className='ds_order-bg mt-4'>
                                   
                                  {/* ----------------------- Empty Card ------------------- */}
                                   {
                                     filteredOrders?.length === 0 && 
                                                <div className='ds_no-order-bg'>
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
                                   }
                                  {/* ----------------------- My Order ------------------- */}
                                  <div>
                                    <div className=' px-sm-4 pb-4 px-3'>
                                      <div className="row">
                                           { filteredOrders && filteredOrders?.map((element , index)=>{ 
                                            console.log("wefqwefwefwefwef " , element);
                                            
                                            
                                             return(
                                              <div className="col-xl-12 mt-4" key={element?.id}>
                                               <div className="ds_order-inner">
                                                <div className="d-flex flex-wrap ds_order-flex align-items-center">
                                                  <div className="d-flex flex-wrap px-3 pt-2">
                                                    <p className={`${element?.order_status === "pending" ? 'ds_order-progress fw-bold' : ''} ${element?.order_status === "delivered" ? 'ds_order-deliver fw-bold' : ''} ${element?.order_status === "cancelled" ? 'ds_order-cencel fw-bold' : ''} mb-0`}>{capitalizeFirstLetter(element?.order_status)}</p>
                                                    <p className="ds_order-text ds_600 mb-0">{element?.order_date}</p>
                                                    <p className="ds_order-order mb-0">
                                                      <span className="text-muted">Order Id : </span>
                                                      <span className="ds_color">{element?.order_number}</span>
                                                    </p>
                                                  </div>
                                                  <h5 className='text-end me-4 mt-2'>
                                                      <span className="ms-lg-0 ms-md-3 ms-0 ds_order-padding ds_color">{  parseInt(element?.total_amount) - (element?.total_amount * 20 / 100) }</span>
                                                      <span className="ms-2 ds_order-line-txt">{element?.total_amount}</span>
                                                  </h5>
                                                  {
                                                    element?.order_status === "pending" ? (
                                                         <Link onClick={()=> handleTrackOrder(element?.order_number)} to='/TrackOrder'  className="ds_order-pending text-dark ds_600 pe-3 ms-lg-0 ms-3" >
                                                            Track Order
                                                        </Link>
                                                    ) : ("")
                                                  }

                                                  {
                                                    element?.order_status === "delivered" ? (
                                                        <Link  to='/returnOrder'  onClick={() => handleReturnOrder(element?.order_number)} className="ds_order-hover text-dark ds_600 pe-3 ms-lg-0 ms-3" >
                                                            Return Order
                                                        </Link>
                                                    ) : ("")
                                                  }
                                                    
                                                    
                                                </div>
                                                <div className="ds_order-line mt-2"></div>
                                                {element?.order_items?.map((item)=>{
                                                   return (
                                                         <div className="px-3 my-3 ds_order-main" key={item?.id} >
                                                          <div className="d-flex justify-content-between flex-wrap">
                                                           <div>
                                                             <div className="d-flex ds_cart-flex">
                                                               <div className="mx-auto">
                                                                 <img className="ds_oder-img" src={item?.image[0]} alt={item?.product_name}  />
                                                               </div>
                                                               <div className="ds_cart-deta">
                                                                 <h6> {item?.product_name}</h6>
                                                                 {item?.sku && <p className="ds_tcolor mb-0">
                                                                   SKU : <span className="ds_color">{item?.sku}</span>
                                                                 </p>}
                                                                 <p className="ds_tcolor mb-0">
                                                                   Metal :<span className="ds_color"> {item?.metal}</span>
                                                                 </p>
                                                                 <p className="ds_tcolor mb-0">
                                                                   Metal Color :<span className="ds_color"> {item?.metal_color}</span>
                                                                 </p>
                                                                 {item?.size && (
                                                                   <p className="ds_tcolor mb-0">
                                                                     Size : <span className="ds_color"> {item?.size}</span>
                                                                   </p>
                                                                 )}
                                                              </div>
                                                            </div>
                                                           </div>
                                                            <div className="d-flex flex-column mt-lg-0 mt-4">
                                                              
                                                              
                                                           </div>
                                                        </div>
                                                       </div>
                                                        )
                                                   })}
                                                {element?.order_status === "delivered" && (
                                                      <h6 className="mt-auto me-3 text-end mb-3">
                                                        
                                                        <Link className="text-dark" onClick={()=> handleSubmitReview(element?.id , element?.customer_id , element?.order_items?.map((element)=> element?.product_id))  } > 
                                                            Submit Review
                                                         </Link>
                                                      </h6>
                                                    )}
                                               </div>
                                             </div>
                                             )
                                           })}
                                            
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                        </section>
                         ) : ("") }

                          
                         {/* ************* My WishList ************** */}
                         {
                           mainActive === "My Wishlist" ? (
                            wishlistData.length === 0 ?
                            <section>
                                <div className='ds_empty-inner'>
                                    <div className='d-flex justify-content-center align-items-center h-100'>
                                        <div className='text-center'>
                                            <img src={require("../Img/Sujal/empty_wishlist.png")} alt="" width="20%" />
                                            <h3 className='ds_color'>Empty Wishlist</h3>
                                            <p className='mb-0'>Your wishlist is empty please add</p><p> your favourite items to wishlist</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            <section className=''>
                                <Row xxl={3} lg={3} md={2} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-4'>
                                    {
                                        wishlistproducts?.map((ele, id) => {
                                            const discounted = ((parseFloat(ele?.total_price) * parseFloat(ele?.discount)) / 100).toFixed(2);
                                            let discountPrice = [];
                                            if (!isNaN(parseFloat(discounted))) {
                                                discountPrice = (parseFloat(ele?.total_price) + parseFloat(discounted)).toFixed(2);
                                            } else {
                                                discountPrice = ele?.total_price;
                                            }
                                            return (
                                                <Col key={id} className='py-4'>
                                                    <div className='s_seller_card'>
                                                        <div className='s_card_img'>
                                                            <img src={ele?.images[0] || ele?.product_image[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                        </div>
                                                        <div className='s_heart_icon s_heart_icons filled' onClick={() => { findWishlistID(ele.id) }}>
                                                            <GoHeartFill />
                                                        </div>
                                                        <div  className='s_card_text'>
                                                            <Link to={`/productdetail/${ele.product_id || ele.id}`}>
                                                                <h5>{ele.product_name}</h5>
                                                                <p className='mb-0' key={'p' + id}>
                                                                    <span className='mx-2' key={'price' + id}>₹{discountPrice}</span>
                                                                    <strike className="mx-2" key={id}>₹{ele.total_price}</strike>
                                                                </p>
                                                                <div className='s_rating'>
                                                                    {
                                                                        [...Array(5)].map((_, index) => {
                                                                            if (index < ele.total_rating) {
                                                                                return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                                            } else {
                                                                                return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                                                ;
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className='s_card_btn'><p className=''>Buy Now</p></div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </section>
                           ) : ("")
                         }


                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* ****************** Submit Review Popup ************* */}
      <section>
        <div>
        <Modal size='lg' show={subRevToggle} onHide={()=>setSubRevToggle(false)} style={{borderRadius:'0'}}  aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header closeButton className='border-0 pb-0'>
           </Modal.Header>
           <Modal.Body className='pt-1 px-0'>
           <div className=''>
               <div>
                   <div className='px-4'>
                      <h6 className='ds_600 mb-0'>Overall Rating</h6>
                       {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`me-1 ${star <= rating ? 'ds_review-color' : ''}`}
                              onClick={() => handleRating(star)} style={{cursor: 'pointer',
                                color: star <= rating ? 'ds_review-color' : '',
                              }}
                            />
                         ))}
                   </div>
                   <div className='ds_review-line mt-2'></div>
                   <div className='px-4 mt-3'>
                       <h6 className='ds_600 mb-0'>Add Photo or Video</h6>
                       <div className='d-flex mt-2'>
                       {uploadedImages?.map((media, index) => (
                             <div className="ds_review-inner position-relative" key={index}>
                               {media.type === "image" ? (
                                 <img src={media?.preview} alt={`Uploaded ${index}`} width="100%" className="ds_review-upload-img" />
                               ) : (
                                 <video src={media?.preview} controls width="100%" className="ds_review-upload-video" />
                               )}
                               <IoMdClose className="ds_review-cancel-icon" onClick={() => handleRemoveImage(index)} />
                             </div>
                        ))} 

                               <div className='ds_review-add' onClick={() => document.getElementById('imageUploadInput').click()} style={{ cursor: 'pointer' }}>
                                    <FiPlus className='ds_review-plus' />
                                </div>
                                    <input type="file" id="imageUploadInput" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleImageUpload}/>
                       </div>
                   </div>
                   <div className='ds_review-line mt-3'></div>
                   <div className='px-4 mt-3'>
                      <h6 className='ds_600 mb-0'>Feedback</h6>
                      <div className="form-floating mt-2">
                         <textarea className="form-control ds_review-area" value={feedback} onChange={(e)=> setFeedback(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                         <label htmlFor="floatingTextarea">Write your feedback</label>
                       </div>
                       <div className='mt-4 pt-2 mb-2'>
                          <button className='ds_review-submit' onClick={handleReviewSubmit}>Submit</button>
                       </div>
                   </div>
               </div>
              </div>
           </Modal.Body>
         </Modal>
        </div>
      </section>

      {/* ********************  Change Password Popup  ********* */}
      <section>
        <div>
        <Modal  className='p-0' show={changePassToggle} onHide={()=> setChangePassToggle(false)} aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header className='border-0' closeButton>
           </Modal.Header>
           <Modal.Body className='pt-0 px-5 border-0'>
           <h4 className="modal-title text-center ds_color fw-bold" >Change Password</h4>
                   <form className='mt-3' onSubmit={ChangePassFormik.handleSubmit}>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Old Password</label>
                                 <input type="text" name='Old_Pass' value={ChangePassFormik.values.Old_Pass} onChange={ChangePassFormik.handleChange} onBlur={ChangePassFormik.handleBlur} className='ds_new-input' placeholder="Enter old password" />
                                 { ChangePassFormik.errors.Old_Pass &&  ChangePassFormik.touched.Old_Pass ? <p className='ds_new-danger mb-0'>{ChangePassFormik.errors.Old_Pass}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>New Password</label>
                               <input type="text" name='New_Pass' value={ChangePassFormik.values.New_Pass} onChange={ChangePassFormik.handleChange} onBlur={ChangePassFormik.handleBlur} className='ds_new-input' placeholder="New password" />
                               { ChangePassFormik.errors.New_Pass &&  ChangePassFormik.touched.New_Pass ? <p className='ds_new-danger mb-0'>{ChangePassFormik.errors.New_Pass}</p> : null}
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Confirm New Password</label>
                               <input type="text" name='Con_Pass' value={ChangePassFormik.values.Con_Pass} onChange={ChangePassFormik.handleChange} onBlur={ChangePassFormik.handleBlur} className='ds_new-input' placeholder="Enter new password" />
                               { ChangePassFormik.errors.Con_Pass &&  ChangePassFormik.touched.Con_Pass ? <p className='ds_new-danger mb-0'>{ChangePassFormik.errors.Con_Pass}</p> : null}
                             </div>
                         </div>
                     </div>
                     <div>
                       <div className="row justify-content-center">
                         <div className="col-xl-12 mt-5 mb-3">
                           <div>
                              <button type='submit' className='ds_new-save w-100' >Change Password</button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </form>
           </Modal.Body>
         </Modal>
        </div>
      </section>

       {/* ---------------- Logout Popup ------------------ */}
       <section>
         <div>
         <Modal show={logOut} onHide={()=> setLogOut(false)} aria-labelledby="contained-modal-title-vcenter" centered>
             <Modal.Header className='border-0 pb-0' closeButton>
             </Modal.Header>
             <Modal.Body className='text-center pt-0'>
                <h4 className="modal-title ds_color" id="exampleModalLabel">Logout</h4>
                  <h6>Are you sure you want to Logout?</h6>
                  <div className='mt-4 pt-3 mb-4 ds_log-popup'>
                     <button className='ds_delete-no' onClick={()=> setLogOut(false)}>No</button>
                     <button className='ds_delete-yes' onClick={handleLogOut}>Yes</button>
                  </div>
             </Modal.Body>
           </Modal>
         </div>
       </section>

      

    </>
  )
}

export default MyProfile
