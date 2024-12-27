import React, { useEffect, useState } from 'react'
import noteContext from './noteContext'
import axios from 'axios';
import { ChangePass, EditProfileSchema, NewAddSchema } from '../schemas';
import { useFormik } from 'formik';
import { cache } from 'react';


const UseContext = (props) => {
  // acces token form localstores
  let store = JSON.parse(localStorage.getItem("Login"))



  const [allCategory, setAllCatgegory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const Api = 'https://shreekrishnaastrology.com/api'


  const token = store?.access_token;
  const fetchCategory = async (retryCount = 0) => {
    // fetch catgory
    try {
      const response = await axios.get(`${Api}/categories/getallactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllCatgegory(response?.data?.categories);
    } catch (error) {
      if (error?.response?.status === 429 && retryCount < 5) {
        // Retry logic with exponential backoff
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
        console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
        setTimeout(() => fetchCategory(retryCount + 1), retryAfter);
      } else {
        console.error("Failed to fetch  data:", error.message);
      }
    }
  }
  const fetchSubCategory = async (retryCount = 0) => {
    // fetch catgory
    try {
      const response = await axios.get(`${Api}/subcategories/getallactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllSubCategory(response?.data?.subCategories);
    } catch (error) {
      if (error?.response?.status === 429 && retryCount < 5) {
        // Retry logic with exponential backoff
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
        console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
        setTimeout(() => fetchSubCategory(retryCount + 1), retryAfter);
      } else {
        console.error("Failed to fetch data:", error.message);
      }
    }
  }

  const fetchProduct = async (retryCount = 0) => {
    // fetch catgory
    try {
      const response = await axios.get(`${Api}/products/getallactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllProduct(response?.data?.data);
    } catch (error) {
      if (error?.response?.status === 429 && retryCount < 5) {
        // Retry logic with exponential backoff
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
        console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
        setTimeout(() => fetchProduct(retryCount + 1), retryAfter);
      } else {
        console.error("Failed to fetch data:", error.message);
      }
    }
  }


  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    fetchProduct();
    // eslint-disable-next-line
  }, [Api]);

  // getting best selling products
  useEffect(() => {
    const sortedFlitter = [...allProduct]
      .sort((a, b) => b.total_rating - a.total_rating);
    setBestseller(sortedFlitter.slice(0, 12));
  }, [allProduct]);


  // add to wishlist handlerrs {} 

  const [wishlistID, setWishlistID] = useState([]);
  const addwishlistHandler = async (id) => {
    console.log("wishId", wishlistID);
    const check = wishlistID.includes(id);
    if (!check) {
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
    }
    fetchWishlist();
  }
  // Remove from wishlist handler {}
  const removeWishlistHandler = async (id) => {
    var res = await axios.delete(`${Api}/wishlists/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.data) {
      console.log('Removed from wishlist', res);
      fetchWishlist();
    }
  }
  const findWishlistID = (id) => {
    var data = wishlistData.find((item) => { return item.product_id === id; });
    removeWishlistHandler(data.id)
  }

  const fetchWishlist = async (retryCount = 0) => {
    // fetch catgory
    try {
      const response = await axios.get(`${Api}/wishlists/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data.length >= 0) {
        // alert(response.data);
        setWishlistData(response.data.data);
        const idData = response.data.data
          .filter((item) => item.product_id)
          .map((item) => item.product_id);
        setWishlistID(idData);
      }
    } catch (error) {
      if (error?.response?.status === 429 && retryCount < 5) {
        // Retry logic with exponential backoff
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
        console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
        setTimeout(() => fetchWishlist(retryCount + 1), retryAfter);
      } else {
        console.error("Failed to fetch data:", error.message);
      }
    }
  }

  // fetchcartsData
  const [cartData, setCardData] = useState([]);

  const addToCardhandle = async (product, size) => {
    console.warn("Cart", cartData);
    let CheckQty = cartData.filter((cart) => {
      return cart.product_id === product?.id
    });
    console.warn("Check Qty", CheckQty);
    if (CheckQty.length > 0) {
      // update cart logic here
      await axios.post(`${Api}/cart/update/${CheckQty?.[0]?.id}`,
        {
          customer_id: store?.id,
          product_id: product?.id,
          size: size || 0,
          quantity: CheckQty?.[0]?.quantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log("Product added to cart successfully!", response);
          fetchCardData();
        })
    } else {
      // addtocart logic
      await axios.post(`${Api}/cart/create`,
        {
          customer_id: store?.id,
          product_id: product?.id,
          quantity: CheckQty.length || 1,
          unit_price: product?.total_price,
          size: size || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log("Product added to cart successfully!", response);
          fetchCardData();
        })
    }
  }

  // funtion called item aaded or removed
  const fetchCardData = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${Api}/cart/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.cart) {
        console.warn('cartData', response);
        setCardData(response.data.cart);
      }
    } catch (error) {
      if (error?.response?.status === 429 && retryCount < 5) {
        const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
        console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
        setTimeout(() => fetchCardData(retryCount + 1), retryAfter);
      } else {
        console.error("Failed to fetch data:", error.message);
      }
    }
  }
  useEffect(() => {
    fetchWishlist();
    fetchCardData();
    // eslint-disable-next-line
  }, [])



  // ************ My Profile **********
  // let store = JSON.parse(localStorage.getItem("Login"))

  const [profileData, setProfileData] = useState([])
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => {

    const myProfileData = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${Api}/user/get/${store?.id}`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`,
          },
        });
        setProfileData(response?.data?.user);
        console.log(response?.data?.user);

      } catch (error) {
        if (error?.response?.status === 429 && retryCount < 5) {
          // Retry logic with exponential backoff
          const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
          console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
          setTimeout(() => myProfileData(retryCount + 1), retryAfter);
        } else {
          console.error("Failed to fetch profile data:", error.message);
        }
      }
    }

    myProfileData()

  }, [editToggle])

  
  console.log("pro ", profileData);


  // ******* Edit User State *******
  const [editVal, setEditVal] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    gender: profileData?.gender || "",
    dob: profileData?.dob || "",
    pin: profileData?.pin || "",
  });

  const handleEditToggle = () => {
    setEditVal({
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      gender: profileData?.gender || "",
      dob: profileData?.dob || "",
      pin: profileData?.pin || "",
    });
    setEditToggle(true);
  };


  const EditFormik = useFormik({
    initialValues: editVal,
    enableReinitialize: true,
    validationSchema: EditProfileSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${Api}/user/updateprofile/${store?.id}`,
          {
            name: values?.name,
            email: values?.email,
            role_id: 2,
            phone: values?.phone,
            gender: values?.gender,
            dob: values?.dob,
            pincode: values?.pin,
          },
          {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("gnrjghwgkwnfgek " , response);
          
          alert("Profile updated successfully!");
          setEditToggle(false);
        })
        .catch((error) => {
          alert("Error updating profile: " + error.message);
        });

      action.resetForm();
    },
  });

  const handleCancel = () => {
    setEditToggle(false)
  }


  // ********** My Address ********
  const [addType, setAddType] = useState("Home")
  const [myAddData, setMyAddData] = useState([])
  const [addMainNewAdd, setAddMainNewAdd] = useState(false)
  const [newAddModal, setNewAddModal] = useState(false)
  const [hello, setHello] = useState(() => {
    const savedDefault = localStorage.getItem("default");
    return savedDefault ? JSON.parse(savedDefault) : "";
  });


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
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${Api}/deliveryAddress/create`,
          {
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
        );
        console.log("NewAdd", response);
        setNewAddModal(false);
        setAddMainNewAdd(true);
        action.resetForm();
      } catch (error) {
        console.error("Error submitting address:", error);
        alert("Failed to submit address. Please try again.");
      }
    },
  });


  const handleAddType = (type) => {
    setAddType(type)
  }

  const [singleNewAdd, setSingleNewAdd] = useState(false)
  const [deleteUseEffect, setdeleteUseEffect] = useState(0)

  useEffect(() => {

    const addressMyData = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${Api}/deliveryAddress/getall`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`
          }
        })
        setMyAddData(response?.data?.deliveryAddress)
      }
      catch (error) {
        if (error?.response?.status === 429 && retryCount < 5) {
          // Retry logic with exponential backoff
          const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
          console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
          setTimeout(() => addressMyData(retryCount + 1), retryAfter);
        } else {
          console.error("Failed to fetch profile data:", error.message);
        }
      }
    }

    addressMyData()

  }, [addMainNewAdd, singleNewAdd, deleteUseEffect])

  const handleMark = (id) => {
    setHello(id);
    localStorage.setItem("default", JSON.stringify(id));
  };


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
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${Api}/deliveryAddress/update/${singleId}`,
          {
            customer_id: `${store?.id}`,
            address: values.address,
            status: 'active',
            state: values.state,
            city: values.city,
            pincode: `${values.pincode}`,
            contact_name: values.name,
            contact_no: `${values.phone}`,
            type: addType,
          },
          {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          }
        );
        console.log("UpdateAdd", response);
        setSingleNewAdd(false);
        setActiveCard(true);
        action.resetForm();
      } catch (error) {
        console.error("Error Edtitng address:", error);

        alert(
          error.response?.data?.message ||
          "Failed to update address. Please try again."
        );
      }
    },
  });


  const handleSingleNewAdd = (id) => {
    const selectedAddress = myAddData.find((item) => item.id === id);
    if (selectedAddress) {
      SingleAddFormik.setValues({
        address: selectedAddress?.address || '',
        pincode: selectedAddress?.pincode || '',
        state: selectedAddress?.state || '',
        city: selectedAddress?.city || '',
        name: selectedAddress?.contact_name || '',
        phone: selectedAddress?.contact_no || '',
      });
    }
    setSingleNewAdd(true);
    setSingleId(id);
  };
  

  //--------------- Delete Item Popup --------------
  const [deleteId, setDeleteId] = useState(null)
  const [deleteAdd, setDeleteAdd] = useState(false)


  const handleDeleteAdd = (id) => {
    setDeleteAdd(true)
    setDeleteId(id)
  }

  const handleDeleteYes = async () => {
    try {
      const response = await axios.delete(`${Api}/deliveryAddress/delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${store?.access_token}`,
        },
      });
      console.log("DeleteAdd", response);
      setDeleteAdd(false);
      setdeleteUseEffect(deleteUseEffect + 1);
      setActiveCard(true);
    } catch (error) {
      console.error("Error deleting address:", error);
      alert(
        error.response?.data?.message ||
        "Failed to delete the address. Please try again."
      );
    }
  };


  // ********** My Order **********
  const [orderMain, setOrderMain] = useState({})
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {

    const myOrderData = async (retryCount = 0) => {      
       try{
            const response = await axios.post(`${Api}/order/getbyuserid`,
               {
                 customer_id: parseInt(`${store?.id}`)
               },
               {
                 headers: {
                   Authorization: `Bearer ${store?.access_token}`
                 }
            })            
            setOrderMain(response?.data?.orders)
            setFilteredOrders(response?.data?.orders);
          }
          catch(error){
             if (error?.response?.status === 429 && retryCount < 5) {
               // Retry logic with exponential backoff
               const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
               console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
               setTimeout(() => myOrderData(retryCount + 1), retryAfter);
             } else {
               console.error("Failed to fetch profile data:", error.message);
             }
          }
    }

    myOrderData()

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
    onSubmit: async (values, action) => {
      try {

        const response = await axios.post(`${Api}/password/change`,
          {
            current_password: values.Old_Pass,
            new_password: values.New_Pass,
            confirm_password: values.Con_Pass,
          },
          {
            headers: {
              Authorization: `Bearer ${store?.access_token}`,
            },
          }
        );

        console.log("Change Password Response:", response);
        setChangePassToggle(false);
        alert("Password changed successfully.");

        action.resetForm();
      } catch (error) {
        console.error("Error changing password:", error);

        alert(
          error.response?.data?.message ||
          "Failed to change the password. Please try again."
        );
      }
    },
  });


  // *************** Track Order Page ************
  const [trackFilter, seTrackFilter] = useState("")
  // use

  const handleTrackOrder = (data) => {
    seTrackFilter(data)
    localStorage.setItem("TrackOrderKey", JSON.stringify(data))
  }


  // ************ Faq **********

  const [mainFaq, setMainFaq] = useState([])
  const [subFaq, setSubFaq] = useState([])

  useEffect(() => {

    const faqData = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${Api}/faqs/getall`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`
          }
        })
        setMainFaq(response?.data?.faqs)
      }
      catch (error) {
        if (error?.response?.status === 429 && retryCount < 5) {
          // Retry logic with exponential backoff
          const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
          console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
          setTimeout(() => faqData(retryCount + 1), retryAfter);
        } else {
          console.error("Failed to fetch profile data:", error.message);
        }
      }
    }

    faqData()

  }, [])

  useEffect(() => {

    const subFaqData = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${Api}/subfaqs/getall`, {
          headers: {
            Authorization: `Bearer ${store?.access_token}`
          }
        })
        setSubFaq(response?.data?.subfaqs)
      }
      catch (error) {
        if (error?.response?.status === 429 && retryCount < 5) {
          // Retry logic with exponential backoff
          const retryAfter = error?.response?.headers['retry-after'] || Math.pow(2, retryCount) * 1000;
          console.warn(`Too many requests. Retrying after ${retryAfter / 1000}s...`);
          setTimeout(() => subFaqData(retryCount + 1), retryAfter);
        } else {
          console.error("Failed to fetch profile data:", error.message);
        }
      }
    }

    subFaqData()

  }, [])


  // ************** Return Order *********

  const [returnOrderData, setReturnOrderData] = useState("")

  const handleReturnOrder = (customer) => {
    setReturnOrderData(customer)
    localStorage.setItem("ReturnOrderKey", JSON.stringify(customer))
  };



  return (
    <noteContext.Provider value={{
      allCategory, allProduct, allSubCategory, token, wishlistData, addwishlistHandler, removeWishlistHandler, wishlistID, findWishlistID, bestseller,

      Api, cartData, addToCardhandle
      // ******* My Profile *******
      , store, profileData, setProfileData,

      // ------ Edit User State -----
      editToggle, setEditToggle, editVal, EditFormik, handleCancel, handleEditToggle,

      // ------ My Address ------
      addType, setAddType, myAddData, setMyAddData, addMainNewAdd, setAddMainNewAdd, newAddVal, newAddModal, setNewAddModal,
      AddFormik, handleAddType, singleNewAdd, setSingleNewAdd, deleteUseEffect, setdeleteUseEffect, handleMark, hello,

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
      handleTrackOrder, trackFilter,

      // ************** Return Order *********
      handleReturnOrder, returnOrderData


    }}>

      {props.children}
    </noteContext.Provider>
  )
}

export default UseContext
