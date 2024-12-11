import React, { useContext, useEffect, useState } from 'react'
import '../Css/dhruvin/MyProfile.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoBagHandleOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import noteContext from '../Context/noteContext';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { EditProfileSchema, NewAddSchema } from '../schemas';
import { type } from '@testing-library/user-event/dist/type';

const MyProfile = () => {

    const {Api} = useContext(noteContext)

    const [activeCard, setActiveCard] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All")
    const [mainActive, setMainActive] = useState("My Profile")
    const [editToggle, setEditToggle] = useState(false)
    const [profileData, setProfileData] = useState([])
    const [newAddModal, setNewAddModal] = useState(false)
    const [deleteAdd, setDeleteAdd] = useState(false)


    const orders = [
      {
        status: "In progress",
        date: "10 Oct 2023",
        orderId: "12057598140",
        actionLink: { text: "Track Order", href: "/TrackOrder" },
        product: {
          name: "Dual Tone Halo Diamond Finger Ring",
          image: require("../Img/dhruvin/ring.png"),
          details: {
            sku: "PD00003-14-RS-FGVVSVS",
            metal: "925 Silver",
            metalColor: "Silver",
            size: "5",
          },
        },
        price: { current: "₹1200", original: "₹1500" },
      },
      {
        status: "Delivered",
        date: "05 Oct 2023",
        orderId: "12057598140",
        actionLink: { text: "Return Order", href: "/ReturnOrder", modalTarget: "" },
        product: {
          name: "Pal Gold Earrings",
          image: require("../Img/dhruvin/gold.png"),
          details: {
            sku: "PD00003-14-RS-FGVVSVS",
            metal: "925 Silver",
            metalColor: "Gold",
          },
        },
        price: { current: "₹1200", original: "₹1500" },
        extraLink: { text: "Submit review", href: "" },
      },
      {
        status: "Cancelled",
        date: "10 Oct 2023",
        orderId: "12057598140",
        product: {
          name: "Pal Gold Earrings",
          image: require("../Img/dhruvin/ring.png"),
          details: {
            sku: "PD00003-14-RS-FGVVSVS",
            metal: "925 Silver",
            metalColor: "Gold",
          },
        },
        price: { current: "₹1000", original: "₹1500" },
      },
    ];
    
    const [filterOrder, setFilterOrder] = useState(orders);

    const handleFilter = (data) => {
       setActiveBtn(data)
      if(data === "All"){
        setFilterOrder(orders)
      }
      else{
          let filterData = orders.filter((element)=> {
             return element.status === data
           }) 
         setFilterOrder(filterData)
      }

     
    }


    let store = JSON.parse(localStorage.getItem("Login"))


    useEffect(()=>{
      axios.get(`${Api}/user/get/${store?.id}` ,{
        headers: {
          Authorization: `Bearer ${store?.access_token}`
        }
      })
      .then((value)=>{
          // console.log(value?.data);
          setProfileData(value?.data?.user)
      }).catch((error)=>{
        alert(error)
      })
      
    },[editToggle])


    // ******* Edit User State *******
    let editVal = {
      name:'',
      email:'',
      phone:'',
      gender:'',
      dob:'',
      pin:''
    }

    const EditFormik = useFormik({
      initialValues:editVal,
      validationSchema:EditProfileSchema,
      onSubmit : (values , action) => {
          // console.log(values);

          axios.post(`${Api}/user/updateprofile/${store?.id}`,{
            name:values.name,
            email:values.email,
            role_id:2,
            phone:values.phone,
            gender:values.gender,
            dob:values.dob,
            pin:values.pin,
         },
         {
           headers: {
             Authorization: `Bearer ${store?.access_token}`,
          },
         }
       ).then((value)=>{
           console.log(value);
           setEditToggle(false)

 
         }).catch((error)=>{
           alert(error)
         })

          action.resetForm()  
      }
    })

    
    const handleCancel = () => {
      setEditToggle(false)
    }

    // ********** My Address ********
    const [addType, setAddType] = useState("Home")
    const [myAddData, setMyAddData] = useState([])
    const [addMainNewAdd, setAddMainNewAdd] = useState(0)


    const newAddVal = {
        address:'',
        pincode:'',
        state:'',
        city:'',
        name:'',
        phone:''
    }

    const AddFormik = useFormik({
      initialValues:newAddVal,
      validationSchema:NewAddSchema,
      onSubmit: (values , action) => {
        axios.post(`${Api}/deliveryAddress/create`, {
          
          customer_id: store?.id,
          address: values.address,
          status:'active',
          state: values.state,
          city: values.city,
          pincode: values.pincode,
          contact_name: values.name,
          contact_no: values.phone,
          type: addType,
          
       } ,
       {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
         },
        }
      )
      .then((value) => {
          console.log("NewAdd", value);
          setNewAddModal(false)
          setAddMainNewAdd(addMainNewAdd + 1)
      })
      .catch((error) => {
          console.error("Error submitting address:", error);
          alert("Failed to submit address.");
      });

        action.resetForm()
      }
    })

    const handleAddType = (type) => {
        setAddType(type)
    }

    const toggleDropdown = (index) => {
      setActiveCard(activeCard === index ? null : index);
      console.log(activeCard);
      
    };

  
    const [singleNewAdd, setSingleNewAdd] = useState(false)
    const [deleteUseEffect, setdeleteUseEffect] = useState(0)


    useEffect(()=>{

      axios.get(`${Api}/deliveryAddress/getall`,{
        headers: {
          Authorization: `Bearer ${store?.access_token}`
        }

      }).then((value)=>{
        setMyAddData(value?.data?.deliveryAddress)
      })

    },[addMainNewAdd , singleNewAdd , deleteUseEffect])


// {/* ---------------- Add New Single Address Popup ------------------ */}
   const [singleId, setSingleId] = useState(null)

   const singleAddVal = {
    address:'',
    pincode:'',
    state:'',
    city:'',
    name:'',
    phone:''
   }

  const SingleAddFormik = useFormik({
       initialValues:singleAddVal,
       validationSchema:NewAddSchema,
       onSubmit: (values , action) => {
            axios.post(`${Api}/deliveryAddress/update/${singleId}`, {
            customer_id: store?.id,
            address: values.address,
            status:'active',
            state: values.state,
            city: values.city,
            pincode: values.pincode,
            contact_name: values.name,
            contact_no: values.phone,
            type: addType,
        } ,
        {
           headers: {
             Authorization: `Bearer ${store?.access_token}`,
          },
         }
       )
       .then((value) => {
           console.log("UpdateAdd", value);
           setSingleNewAdd(false)
           setActiveCard(!null)
           
       })
       .catch((error) => {
           alert(error);
       });
   
         action.resetForm()
       }
   })

  const handleSingleNewAdd = (id) => {
    setSingleNewAdd(true)
    setSingleId(id)    
  }

{/* ---------------- Delete Item Popup ------------------ */}
const [deleteId, setDeleteId] = useState(null)

const handleDeleteAdd = (id) => {
  setDeleteAdd(true)
  setDeleteId(id)
}

const handleDeleteYes = () => {
   axios.delete(`${Api}/deliveryAddress/delete/${deleteId}`,{
       headers: {
         Authorization: `Bearer ${store?.access_token}`
       }
   })
   .then((value)=>{
     console.log("DeleteAdd " , value);
     setDeleteAdd(false)
     setdeleteUseEffect(deleteUseEffect + 1)
     setActiveCard(!null)
   }).catch((error)=>{
      alert(error)
   })
}


// ********** My Order **********
const [orderMain, setOrderMain] = useState({})
const [orderData, setOrderData] = useState([])

// console.log("Token ", store?.access_token);


useEffect(()=>{
   axios.post(`${Api}/order/getbyuserid`,
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    {
       customer_id:1
   },{
    headers: {
      Authorization: `Bearer ${store?.access_token}`
    }
   }).then((value)=>{
      console.log("Order " ,value.data.orders);
      setOrderMain(value?.data?.orders)
      setOrderData(value?.data?.orders[0]?.order_items) 

   }).catch((error)=>{
      alert(error)
   })
},[])
  

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
                                <button onClick={()=>setMainActive("Change Password")} className={`ds_profile-btn ${mainActive === "Change Password" ? 'ds_active-color' : ''} ds_600`} data-bs-toggle="modal" data-bs-target="#changePassword"> <img className={`${mainActive === "Change Password" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                <button onClick={()=>setMainActive("Logout")} className={`ds_profile-btn ${mainActive === "Logout" ? 'ds_active-color' : ''} ds_600`} data-bs-toggle="modal" data-bs-target="#logOut"> <img className={`${mainActive === "Logout" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
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
                             <div className="offcanvas ds_offcanvas-inner offcanvas-end"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                              <div className="offcanvas-header">
                                <h4 className="offcanvas-title" id="offcanvasExampleLabel">Account</h4>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                              </div>
                              <div className="offcanvas-body">
                                <div>
                                <button onClick={()=>setMainActive("My Profile")} className={`ds_profile-btn ${mainActive === "My Profile" ? 'ds_active-color ' : ''}  ds_600 mt-3`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Profile" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/profile.png")} alt="" width="7%" /> <span className='ms-2'>My Profile</span></button>
                                <button onClick={()=>setMainActive("My Address")} className={`ds_profile-btn ${mainActive === "My Address" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Address" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/location.png")} alt="" width="7%" /> <span className='ms-2'>My Address</span></button>
                                <button onClick={()=>setMainActive("Saved Cards")} className={`ds_profile-btn ${mainActive === "Saved Cards" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "Saved Cards" ? 'ds_profile_img_color ' : ''} `}  src={require("../Img/dhruvin/card.png")} alt="" width="7%" /> <span className='ms-2'>Saved Cards</span></button>
                                <button onClick={()=>setMainActive("My Order")} className={`ds_profile-btn ${mainActive === "My Order" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close"> <img className={`${mainActive === "My Order" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/order.png")} alt="" width="7%" /> <span className='ms-2'> My Order</span></button>
                                <button onClick={()=>setMainActive("My Wishlist")} className={`ds_profile-btn ${mainActive === "My Wishlist" ? 'ds_active-color' : ''} ds_600`} data-bs-dismiss="offcanvas" aria-label="Close">  <img className={`${mainActive === "My Wishlist" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/heart.png")} alt="" width="7%" /> <span className='ms-2'>My Wishlist</span></button>
                                <button onClick={()=>setMainActive("Change Password")} className={`ds_profile-btn ${mainActive === "Change Password" ? 'ds_active-color' : ''} ds_600`} data-bs-toggle="modal" data-bs-target="#changePassword" > <img className={`${mainActive === "Change Password" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/lock.png")} alt="" width="7%" /> <span className='ms-2'>Change Password</span></button>
                                <button onClick={()=>setMainActive("Logout")} className={`ds_profile-btn ${mainActive === "Logout" ? 'ds_active-color' : ''} ds_600`} data-bs-toggle="modal" data-bs-target="#logOut" > <img className={`${mainActive === "Logout" ? 'ds_profile_img_color ' : ''} `} src={require("../Img/dhruvin/logout.png")} alt="" width="7%" /> <span className='ms-2'>Logout</span></button>
                                </div>
                              </div>
                             </div>
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
                                   <button className='ds_edit-btn' onClick={()=> setEditToggle(!editToggle)}>Edit Profile</button>
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
                                            <p className='ds_600'>{profileData.name}</p>
                                            <p className='ds_600'>{profileData.dob ?  profileData.dob : '1/1/2002'}</p>
                                            <p className='ds_600'>{profileData.phone}</p>
                                            <p className='ds_600 text-break'>{profileData.email}</p>
                                            <p className='ds_600'>{profileData.gender}</p>
                                            <p className='ds_600'>596921</p>
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
                                             <div className='text-center mt-5 mb-3'>
                                                 <a className='ds_edit-cencel ds_cursor ds_600 me-sm-4'onClick={handleCancel}>Cancel</a>
                                                 <button type='submit' className='ds_edit-save ds_600'>Save</button>
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
                                     {myAddData.map((item, index) => (
                                         <div key={item.id} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                           <div className="ds_chan-box position-relative">
                                             <div className="d-flex justify-content-between align-items-center px-3">
                                               <h5 className="mb-0 ds_color">{item.type}</h5>
                                               <BsThreeDotsVertical onClick={() => toggleDropdown(index)} style={{ cursor: 'pointer' }} />
                                               {activeCard === index && (
                                                 <div className="ds_add-mini">
                                                   <p className="ds_600 ds_cursor" onClick={()=>handleSingleNewAdd(item.id)}>Edit</p>
                                                   <p className="ds_600 ds_cursor" onClick={()=>handleDeleteAdd(item.id)}>Delete</p>
                                                   <p className="ds_600">Make as default</p>
                                                 </div>
                                               )}
                                             </div>
                                             <div className="ds_chan-line mt-2"></div>
                                             <div className="px-3 mt-3">
                                               <p className="ds_600 mb-2">{item.contact_name}</p>
                                               <p className="ds_600 mb-2">{item.contact_no}</p>
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


                                 {/* ---------------- Add New Single Address Popup ------------------ */}
                                 <section>
                                          <div>
                                           <Modal className="modal fade" centered show={singleNewAdd} onHide={()=> setSingleNewAdd(false)} id="addressModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                             <div className="modal-dialog ds_add-modal modal-dialog-centered m-0">
                                               <div className="modal-content border-0" style={{borderRadius:'0'}}>
                                                 <div className="modal-header border-0 pb-0">
                                                   <button type="button" className="btn-close" onClick={()=> setSingleNewAdd(false)}></button>
                                                 </div>
                                                 <div className="modal-body pt-0 px-4">
                                                    <h4 className="modal-title text-center ds_color" >Add New Address</h4>
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
                                      <button onClick={()=>handleFilter("In progress")} className={`ds_order-prog ${activeBtn === "In progress" ? 'ds_order-active-btn' :''} me-2`}>In Progress</button>
                                      <button onClick={()=>handleFilter("Delivered")} className={`ds_order-prog ${activeBtn === "Delivered" ? 'ds_order-active-btn' :''} me-2`}>Delivered</button>
                                      <button onClick={()=>handleFilter("Cancelled")} className={`ds_order-prog ${activeBtn === "Cancelled" ? 'ds_order-active-btn' :''} me-2`}>Cancelled</button>
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
                                           {orderMain.map((element)=>{  
                                             console.log(element);
                                                                                        
                                             return(
                                              <div className="col-xl-12 mt-4" key={element?.id}>
                                               <div className="ds_order-inner">
                                                <div className="d-flex flex-wrap ds_order-flex align-items-center">
                                                  <div className="d-flex flex-wrap px-3 pt-2">
                                                    <p className={`${element.order_status === "pending" ? 'ds_order-progress' : ''} ${element.order_status === "Delivered" ? 'ds_order-deliver' : ''} ${element.order_status === "Cancelled" ? 'ds_order-cencel' : ''} mb-0`}>{element.order_status}</p>
                                                    <p className="ds_order-text ds_600 mb-0">{element?.order_date}</p>
                                                    <p className="ds_order-order mb-0">
                                                      <span className="text-muted">Order Id : </span>
                                                      <span className="ds_color">{element.order_number}</span>
                                                    </p>
                                                  </div>
                                                    <Link className="text-dark ds_600 pe-3 ms-lg-0 ms-3" >
                                                      {element?.order_status === "pending" ? 'Track Order' : '' } {element?.order_status === "delivered" ? 'Return Order' : '' }
                                                    </Link>
                                                </div>
                                                <div className="ds_order-line mt-2"></div>

                                                {element?.order_items?.map((element)=>{
                                                   return (
                                                    <>
                                                    <h1>{element?.product_name}</h1>
                                                    </>
                                                        //  <div className="px-3 my-4">
                                                        //    <div className="d-flex justify-content-between flex-wrap">
                                                        //      <div>
                                                        //        <div className="d-flex ds_cart-flex">
                                                        //          <div className="mx-auto">
                                                        //            <img className="ds_oder-img" src={order.product.image} alt={order.product.name} />
                                                        //          </div>
                                                        //          <div className="ds_cart-deta">
                                                        //            <h6>{order.product.name}</h6>
                                                        //            <p className="ds_tcolor mb-0">
                                                        //              SKU : <span className="ds_color">{order.product.details.sku}</span>
                                                        //            </p>
                                                        //            <p className="ds_tcolor mb-0">
                                                        //              Metal :<span className="ds_color">{order.product.details.metal}</span>
                                                        //            </p>
                                                        //            <p className="ds_tcolor mb-0">
                                                        //              Metal Color :<span className="ds_color">{order.product.details.metalColor}</span>
                                                        //            </p>
                                                        //            {order.product.details.size && (
                                                        //              <p className="ds_tcolor mb-0">
                                                        //                Size : <span className="ds_color">{order.product.details.size}</span>
                                                        //              </p>
                                                        //            )}
                                                        //         </div>
                                                        //       </div>
                                                        //      </div>
                                                        //       <div className="d-flex flex-column mt-lg-0 mt-4">
                                                        //         <h5>
                                                        //           <span className="ds_color">{order.price.current}</span>
                                                        //           <span className="ms-2 ds_order-line-txt">{order.price.original}</span>
                                                        //         </h5>
                                                        //         {order.extraLink && (
                                                        //           <h6 className="mt-auto">
                                                        //             <Link to={order.extraLink.href} className="text-dark">
                                                        //               {order.extraLink.text}
                                                        //             </Link>
                                                        //           </h6>
                                                        //         )}
                                                        //       </div>
                                                        //    </div>
                                                        // </div>
                                                        )
                                                   })}
                                                

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
                          



                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>


      

      {/* ********************  Change Password Popup  ********* */}
      <section>
        <div>
          <div className="modal fade" id="changePassword"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  ds_return-popup  modal-dialog-centered">
              <div className="modal-content" style={{borderRadius:'0'}}>
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 px-5">
                   <h4 className="modal-title text-center ds_color fw-bold" >Change Password</h4>
                   <div className='mt-3'>
                     <div className="row">
                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                                 <label htmlFor="" className='ds_600 mb-1'>Old Password</label>
                                 <input type="text" className='ds_new-input' placeholder="Enter old password" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>New Password</label>
                               <input type="text" className='ds_new-input' placeholder="New password" />
                             </div>
                         </div>

                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                             <div>
                               <label htmlFor="" className='ds_600 mb-1'>Confirm New Password</label>
                               <input type="text" className='ds_new-input' placeholder="Enter new password" />
                             </div>
                         </div>
                     </div>
                     <div>
                       <div className="row justify-content-center">
                         <div className="col-xl-12 mt-5 mb-3">
                           <div>
                              <button className='ds_new-save w-100' >Change Password</button>
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
           <div className="modal fade" id="logOut"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered ds_delete-modal">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-center pt-0">
                  <h4 className="modal-title ds_color" id="exampleModalLabel">Logout</h4>
                  <h6>Are you sure you want to Logout?</h6>
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

      

    </>
  )
}

export default MyProfile
