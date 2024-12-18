import React, { useEffect, useState } from 'react'
import noteContext from './noteContext'
import axios from 'axios';
import { ChangePass, EditProfileSchema, NewAddSchema } from '../schemas';
import { useFormik } from 'formik';


const UseContext = (props) => {
  // acces token form localstores
  let store = JSON.parse(localStorage.getItem("Login"))



  const [allCategory, setAllCatgegory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);;
  const Api = 'https://shreekrishnaastrology.com/api'


  const token = store?.access_token;

  useEffect(() => {


    // fetch catgory
    axios.get(`${Api}/categories/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllCatgegory(response?.data?.categories);
        // console.log(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });



    // fetch sub catgeory data
    axios.get(`${Api}/subcategories/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllSubCategory(response.data.subCategories);
        // console.log(response.data.subCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });


    // fetch product data
    axios.get(`${Api}/products/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllProduct(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  // add to wishlist handlerrs {} 
  const [wishlistID, setWishlistID] = useState([]);
  const addwishlistHandler = async (id) => {
    console.log('Product id', id);
    var res = await axios.post(`${Api}/wishlists/create`, {
      customer_id: store?.id,
      product_id: id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('response', res);
    fetchWishlist();
  }
  // Remove from wishlist handler {}
  const removeWishlistHandler = async (id) => {
    var res = await axios.delete(`${Api}/wishlists/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(res.data){
      console.log('Removed from wishlist',res);
      fetchWishlist();
    }
  }
  const findWishlistID = (id)=>{
    var data  = wishlistData.find((item)=>{ return item.product_id === id;});
    removeWishlistHandler(data.id)
  }
  // Fetch wishlist
  const fetchWishlist = async () => {
    console.log('iscalled');
    try {
      const response = await axios.get(`${Api}/wishlists/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.data.length >= 0) {
        const filteredData = response.data.data.filter(
          (item) => item.customer_id == store?.id
        );
        // alert(response.data);
        // console.warn('hey',response.data);
        setWishlistData(filteredData);
        const idData = response.data.data
          .filter((item) => item.product_id) // Filter items with valid product_id
          .map((item) => item.product_id);
        console.log('ids', idData);
        setWishlistID(idData);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error.message);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, [])

  // ************ My Profile **********
  // let store = JSON.parse(localStorage.getItem("Login"))

  const [profileData, setProfileData] = useState([])
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => {
    axios.get(`${Api}/user/get/${store?.id}`, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    })
      .then((value) => {
        // console.log(value?.data);
        setProfileData(value?.data?.user)
      }).catch((error) => {
        alert(error)
      })

  }, [editToggle])


  // ******* Edit User State *******
  let editVal = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    pin: ''
  }

  const EditFormik = useFormik({
    initialValues: editVal,
    validationSchema: EditProfileSchema,
    onSubmit: (values, action) => {
      // console.log(values);

      axios.post(`${Api}/user/updateprofile/${store?.id}`, {
        name: values.name,
        email: values.email,
        role_id: 2,
        phone: values.phone,
        gender: values.gender,
        dob: values.dob,
        pin: values.pin,
      },
        {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        }
      ).then((value) => {
        //  console.log(value);
        setEditToggle(false)


      }).catch((error) => {
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
  const [addMainNewAdd, setAddMainNewAdd] = useState(false)
  const [newAddModal, setNewAddModal] = useState(false)


  const newAddVal = {
    address: '',
    pincode: '',
    state: '',
    city: '',
    name: '',
    phone: ''
  }

  const AddFormik = useFormik({
    initialValues: newAddVal,
    validationSchema: NewAddSchema,
    onSubmit: (values, action) => {
      axios.post(`${Api}/deliveryAddress/create`, {

        customer_id: store?.id,
        address: values.address,
        status: 'active',
        state: values.state,
        city: values.city,
        pincode: values.pincode,
        contact_name: values.name,
        contact_no: values.phone,
        type: addType,

      },
        {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        }
      )
        .then((value) => {
          console.log("NewAdd", value);
          setNewAddModal(false)
          setAddMainNewAdd(true)
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

  const [singleNewAdd, setSingleNewAdd] = useState(false)
  const [deleteUseEffect, setdeleteUseEffect] = useState(0)

  useEffect(() => {
    axios.get(`${Api}/deliveryAddress/getall`, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }

    }).then((value) => {
      setMyAddData(value?.data?.deliveryAddress)
    })

  }, [addMainNewAdd, singleNewAdd, deleteUseEffect])


  // {/* ---------------- Add New Single Address Popup ------------------ */}
  const [singleId, setSingleId] = useState(null)
  const [activeCard, setActiveCard] = useState(null);


  const singleAddVal = {
    address: '',
    pincode: '',
    state: '',
    city: '',
    name: '',
    phone: ''
  }

  const SingleAddFormik = useFormik({
    initialValues: singleAddVal,
    validationSchema: NewAddSchema,
    onSubmit: (values, action) => {
      axios.post(`${Api}/deliveryAddress/update/${singleId}`, {
        customer_id: store?.id,
        address: values.address,
        status: 'active',
        state: values.state,
        city: values.city,
        pincode: values.pincode,
        contact_name: values.name,
        contact_no: values.phone,
        type: addType,
      },
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

  //--------------- Delete Item Popup --------------
  const [deleteId, setDeleteId] = useState(null)
  const [deleteAdd, setDeleteAdd] = useState(false)


  const handleDeleteAdd = (id) => {
    setDeleteAdd(true)
    setDeleteId(id)
  }

  const handleDeleteYes = () => {
    axios.delete(`${Api}/deliveryAddress/delete/${deleteId}`, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    })
      .then((value) => {
        console.log("DeleteAdd ", value);
        setDeleteAdd(false)
        setdeleteUseEffect(deleteUseEffect + 1)
        setActiveCard(!null)
      }).catch((error) => {
        alert(error)
      })
  }


  // ********** My Order **********
  const [orderMain, setOrderMain] = useState({})
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    axios.post(`${Api}/order/getbyuserid`,
      {
        customer_id: 1
      },
      {
        headers: {
          Authorization: `Bearer ${store?.access_token}`
        }
      }).then((value) => {
        // console.log("Order " ,value.data.orders);
        setOrderMain(value?.data?.orders)
        setFilteredOrders(value?.data?.orders);

      }).catch((error) => {
        alert(error)
      })
  }, [])


  // ********** Change Password **********
  const [changePassToggle, setChangePassToggle] = useState(false)

  const changePassVal = {
    Old_Pass: '',
    New_Pass: '',
    Con_Pass: ''
  }

  const ChangePassFormik = useFormik({
    initialValues: changePassVal,
    validationSchema: ChangePass,
    onSubmit: (values, action) => {
      console.log(values);
      axios.post(`${Api}/password/change`, {
        current_password: values.Old_Pass,
        new_password: values.New_Pass,
        confirm_password: values.Con_Pass

      },
        {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        }
      ).then((value) => {
        console.log("Change Pass ", value);
        setChangePassToggle(false)
      }).catch((error) => {
        alert(error)
      })

      action.resetForm()
    }
  })


// *************** Track Order Page ************
const [trackFilter, seTrackFilter] = useState("")
// use

const handleTrackOrder = (data) => {
  seTrackFilter(data)
  localStorage.setItem("TrackOrderKey" , JSON.stringify(data))
}




// ************ Faq **********

  const [mainFaq, setMainFaq] = useState([])
  const [subFaq, setSubFaq] = useState([])

  useEffect(() => {

    axios.get(`${Api}/faqs/getall`, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value) => {
      // console.log("Faq " , value.data.faqs);
      setMainFaq(value?.data?.faqs)
    })

  }, [])

  useEffect(() => {

    axios.get(`${Api}/subfaqs/getall`, {
      headers: {
        Authorization: `Bearer ${store?.access_token}`
      }
    }).then((value) => {
      // console.log("SubFaq " , value.data.subfaqs);
      setSubFaq(value?.data?.subfaqs)
    })

  }, [])



  // ************** Return Order *********

const [returnOrderData, setReturnOrderData] = useState("")

const handleReturnOrder = (customer) => {
    setReturnOrderData(customer)
    localStorage.setItem( "ReturnOrderKey" , JSON.stringify(customer))
};

// useEffect(()=>{
   
// },[])

  return (
    <noteContext.Provider value={{
      allCategory, allProduct, allSubCategory, token, wishlistData, addwishlistHandler, removeWishlistHandler,wishlistID,findWishlistID,

      Api
      // ******* My Profile *******
      , store, profileData, setProfileData,

      // ------ Edit User State -----
      editToggle, setEditToggle, editVal, EditFormik, handleCancel,

      // ------ My Address ------
      addType, setAddType, myAddData, setMyAddData, addMainNewAdd, setAddMainNewAdd, newAddVal, newAddModal, setNewAddModal,
      AddFormik, handleAddType, singleNewAdd, setSingleNewAdd, deleteUseEffect, setdeleteUseEffect,

      // ------- Add New Single Address Popup --------
      singleId, setSingleId, singleAddVal, activeCard, setActiveCard, SingleAddFormik, handleSingleNewAdd,

      //--------- Delete Item Popup ---------
      deleteId, setDeleteId, deleteAdd, setDeleteAdd, handleDeleteAdd, handleDeleteYes,

      // ********** My Order **********
      orderMain, setOrderMain, filteredOrders, setFilteredOrders,

      //  ******** Change Password **********
      changePassToggle, setChangePassToggle, ChangePassFormik,

      // ************ Faq **********
      mainFaq, subFaq, setSubFaq,

    // *************** Track Order Page ************
      handleTrackOrder , trackFilter,

      // ************** Return Order *********
      handleReturnOrder  , returnOrderData
 
      
      }}>

      {props.children}
    </noteContext.Provider>
  )
}

export default UseContext
