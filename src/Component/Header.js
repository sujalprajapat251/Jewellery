import { Nav, Offcanvas, Accordion, Modal } from 'react-bootstrap';
import '../Css/Sujal/Header.css';
import { IoCartOutline, IoCloseOutline, IoPersonOutline, IoSearch } from 'react-icons/io5';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/noteContext';
import { Link, useLocation } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { useFormik } from 'formik';
import { ForgetPassSchema, LoginSchema } from '../schemas';
import Swal from 'sweetalert2';






function Header() {
    const { Api, allProduct, allSubCategory, store, bestseller } = useContext(noteContext);
    // menu catgegory handller
    const [goldSubcate, setGoldSubcate] = useState([]);
    const [silverSubcate, setSilverSubcate] = useState([]);
    const [diamondSubcate, setDiamondSubcate] = useState([]);
    const [earingSubcate, setEaringSubcate] = useState([]);
    const [ringSubcate, setRingSubcate] = useState([]);
    const [pendantsSubcate, setPendantSubcate] = useState([]);
    const [platiumSubcate, setPlatiumSubcate] = useState([]);
    const [watchSubcate, setWatchSubcate] = useState([]);

    useEffect(() => {
        const goldCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Gold") {
                goldCategories.push(ele);
            }
            return null;
        });
        setGoldSubcate(goldCategories);
        const silverCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Silver") {
                silverCategories.push(ele);
            }
            return null;
        });
        setSilverSubcate(silverCategories);
        const diamondCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Diamond") {
                diamondCategories.push(ele);
            }
            return null;
        });
        setDiamondSubcate(diamondCategories);
        const earingCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Earrings") {
                earingCategories.push(ele);
            }
            return null;
        });
        setEaringSubcate(earingCategories);
        const ringCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Rings") {
                ringCategories.push(ele);
            }
            return null;
        });
        setRingSubcate(ringCategories);
        const pendantCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Pendants") {
                pendantCategories.push(ele);
            }
            return null;
        });
        setPendantSubcate(pendantCategories);
        const PlatinumCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Platinum") {
                PlatinumCategories.push(ele);
            }
            return null;
        });
        setPlatiumSubcate(PlatinumCategories);
        const watchCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Watch") {
                watchCategories.push(ele);
            }
            return null;
        });
        setWatchSubcate(watchCategories);
    }, [allSubCategory]);

    const [menGold, setMenGold] = useState([]);
    const [menSilver, setMenSilver] = useState([]);
    useEffect(() => {
        // filter product by category
        //   for gold
        const goldProducts = allProduct.filter(
            (ele) => ele.category_name === "Gold" && ele.gender === "male"
        );


        const uniqueGoldProducts = goldProducts.filter(
            (ele, index, self) =>
                index === self.findIndex((item) => item.category_name === ele.category_name)
        );

        setMenGold(uniqueGoldProducts);


        //   for silver
        const silverProducts = allProduct.filter(
            (ele) => ele.category_name === "Silver" && ele.gender === "male"
        );
        const uniqueSilverProducts = silverProducts.filter(
            (ele, index, self) =>
                index === self.findIndex((item) => item.category_name === ele.category_name)
        );

        setMenSilver(uniqueSilverProducts);
    }, [allProduct]);
    // menu catgegory handller over ---------------

    // search handdig 

    const [Search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [PopularData, setPopularData] = useState();
    const searchHandle = (x) => {
        setSearch(x);
        console.log(Search);
        const filteredSearchData = allProduct.filter(item => item.product_name.toLowerCase().includes(x));
        console.log(filteredSearchData);
        setSearchData(filteredSearchData);
        const filteredPopularData = bestseller.filter(item => item.product_name.toLowerCase().includes(x));
        setPopularData(filteredPopularData);
    }



    // offcanvas 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Login Model
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const loginVal = {
        email: '',
        password: '',
    }

    const LoginFormik = useFormik({
        initialValues: loginVal,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
          try {
            const response = await axios.post(`${Api}/auth/login`, {
              email: values.email,
              password: values.password,
            });
      
            console.log("Login Response:", response.data);
      
            if (response?.data?.result) {
              localStorage.setItem("Login", JSON.stringify(response.data.result));
              setShowLogin(false);
              Swal.fire({
                position: "top-end",
                toast: true,
                title: "Login Successful",
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                background: "#a1a09f",
                color: "white",
                iconColor: "white",
              });
      
              // Optionally reload or redirect
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              throw new Error("Invalid login response");
            }
          } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
              position: "top-end",
              toast: true,
              icon: "error",
              title: "Login Failed",
              text: error?.response?.data?.message || "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: true,
              background: "black",
              color: "white",
              iconColor: "red",
            });
          }
        },
      });
      



    // forgot password Model
    const [showForPass, setShowForPass] = useState(false);

    const handleForPassClose = () => setShowForPass(false);
    const handleForPassShow = () => setShowForPass(true);

    const ForgetPassVal = {
        email: '',
    }

    const ForgetPassFormik = useFormik({
        initialValues: ForgetPassVal,
        validationSchema: ForgetPassSchema,
        onSubmit: async (values, action) => {
            try {
                const response = await axios.post(`${Api}/password/email`, {
                    email: values.email,
                });

                console.log("ForgetRes", response.data);

                alert("A reset password email has been sent to your email address.");
                handleForPassClose();
                handleOTPShow();

                action.resetForm();
            } catch (error) {
                console.error("Error during forgot password request:", error);
                alert(
                    error.response?.data?.message ||
                    "Failed to send reset password email. Please try again."
                );
            }
        },
    });



    // Verify Otp Model
    const [showOTP, setShowOTP] = useState(false);

    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);

    const [storeOtp, setStoreOtp] = useState("")

    const OtpVal = {
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: ''
    }

    const OtpFormik = useFormik({
        initialValues: OtpVal,
        onSubmit: async (values, action) => {
            try {
                const otpValue = parseInt(values.otp1 + values.otp2 + values.otp3 + values.otp4);

                const response = await axios.post(`${Api}/password/otp`, {
                    otp: otpValue,
                });

                console.log("OtpRes", response.data);
                handleOTPClose();
                handleResetPassShow();
                setStoreOtp(otpValue);
                action.resetForm();

            } catch (error) {
                console.error("Error during OTP verification:", error);

                alert(
                    error.response?.data?.message ||
                    "Failed to verify OTP. Please check the OTP and try again."
                );
            }
        },
    });


    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);



    // Reset Password Model
    const [showResetPass, setShowResetPass] = useState(false);

    const handleResetPassClose = () => setShowResetPass(false);
    const handleResetPassShow = () => setShowResetPass(true);

    const ResetPassVal = {
        newPass: '',
        conPass: '',
    }

    const ReserPassFormik = useFormik({
        initialValues: ResetPassVal,
        onSubmit: async (values, action) => {
          try {
            const response = await axios.post(`${Api}/password/reset/${storeOtp}`, {
              new_password: values.newPass,
              confirm_password: values.conPass,
            });
            console.log("ResetPassRes", response.data);
            alert("Your password has been reset successfully. Please log in with your new password.");
            handleResetPassClose(); 
            handleLoginShow();
            action.resetForm(); 
          } catch (error) {
            console.error("Error resetting password:", error);
            alert(
              error.response?.data?.message ||
              "Failed to reset the password. Please try again."
            );
          }
        },
    });
      



    // SignUp Model
    const [showRegister, setShowRegister] = useState(false);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const [signUpVal, setSignUpVal] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    })

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${Api}/user/create`, {
            name: signUpVal.name,
            phone: signUpVal.phone,
            email: signUpVal.email,
            password: signUpVal.password,
            role_id: 2, 
            dob: "2001-01-01", 
          });
      
          console.log("SignUp Response:", response);
      
          alert("Registration successful! Please log in.");
          
          setShowRegister(false);
        } catch (error) {
          console.error("Error during registration:", error);
      
          alert(
            error.response?.data?.message ||
            "Failed to register. Please check your details and try again."
          );
        }
      };



    const [isFilled, setIsFilled] = useState(false);
    const location = useLocation(); // React Router hook to get the current location

    useEffect(() => {
        if (location.pathname === '/wishlist') {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [location.pathname]); // Dependency array listens to changes in pathname


    return (
        <>
            <div className="text-center s_header_top">
                <p className='ds_container mb-0'>Welcome to our Store</p></div>
            <section className='ds_container s_header_sec d-flex justify-content-between flex-wrap flex-lg-nowrap'>
                <div className='s_header_input d-flex justify-content-between align-items-center col-lg-4 col-12 order-lg-1 order-3'>
                    <input type='text' placeholder='Search for Jewellery and more...' onChange={(e) => { searchHandle(e.target.value); }}></input>
                    <IoSearch />
                </div>
                <Link className='s_logo text-decoration-none col-lg-4 col-4 ms-lg-auto order-lg-2 order-1 align-self-center '>
                    <h2 className='text-lg-center mb-0'>LOGO</h2>
                </Link>
                <div className='col-lg-4 col-4 d-flex justify-content-end align-items-center order-lg-3 order-2'>
                    <Link to={'/wishlist'} className={`s_header_icon s_heart_icons ${isFilled ? "filled" : "empty"}`}>
                        {isFilled ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        <p className='mb-0'>Wishlist</p>
                    </Link>
                    <Link to={'/cart'} className='s_header_icon'>
                        <IoCartOutline />
                        <p className='mb-0'>Cart</p>
                    </Link>
                    {
                        store ? (<Link to={'/myprofile'} className='s_header_icon'>
                            <IoPersonOutline />
                            <p className='mb-0'>My Pofile</p>
                        </Link>) :
                            (<Link to={'#'} className='s_header_icon' onClick={handleLoginShow}>
                                <IoPersonOutline />
                                <p className='mb-0'>Account</p>
                            </Link>)
                    }

                    <Link to={'#'} className=' d-lg-none d-flex align-items-center fs-2 s_bar_icon' onClick={handleShow}>
                        <FaBars />
                    </Link>
                </div>
            </section>
            <section className='s_header_menu  d-none d-lg-block'>
                <Nav className='justify-content-between ds_container  flex-nowrap px-0 text-nowrap'>
                    <Nav.Item className='position-relative'>
                        <Link to={'/productlist/all/null'} className='ps-md-0'>All Jewellery</Link>
                        <div className='s_submenu'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {allSubCategory.slice(0, 9).map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Gender</h4>
                                <Link to="/productlist/all/gender/Men">Men</Link>
                                <Link to="/productlist/all/gender/Women">Women</Link>
                                <Link to="/productlist/all/gender/Kids">Kids & Teens</Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price Band</h4>
                                <Link to="/productlist/all/price/>25">&lt;25K</Link>
                                <Link to="/productlist/all/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/all/price/100<">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={`/productlist/category/Gold`}>Gold</Link>
                        <div className='s_submenu   '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {goldSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Men</h4>
                                {menGold.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/gold/men/${ele.sub_category_name}`} key={ele.id}><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Gold Coin</h4>
                                <Link to={`/productlist/category/Gold Coin`}>Special Coin</Link>
                                <Link to="/productlist/gold coin/weight/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/8">8 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/25">25 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/30">30 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/50">50 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/100">100 Gm.</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Link to={`/productlist/category/Silver`}>Silver</Link>
                        <div className='s_submenu '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {silverSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Men</h4>
                                {menSilver.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/silver/men/${ele.sub_category_name}`} key={ele.id}><img alt={ele.sub_category_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/silver/price/<25">&lt;25K</Link>
                                <Link to="/productlist/silver/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/silver/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/silver/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Link to={`/productlist/category/Diamond`}>Diamond</Link>
                        <div className='s_submenu s_pos_50 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {diamondSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Earrings</h4>
                                {earingSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Rings</h4>
                                {ringSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Pendants</h4>
                                {pendantsSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/diamond/price/<25">&lt;25K</Link>
                                <Link to="/productlist/diamond/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/diamond/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/diamond/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Link to={`/productlist/category/Platinum`}>Platinum</Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {platiumSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/platinum/price/<25">&lt;25K</Link>
                                <Link to="/productlist/platinum/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/platinum/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/platinum/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Link to={`/productlist/category/Gold Coin`}>Gold Coins</Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>24 Kt (995)</h4>
                                <Link to="/productlist/gold coin/24/0.5">0.5 Gm.</Link>
                                <Link to="/productlist/gold coin/24/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/24/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/24/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/24/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/24/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/24/20">20 Gm.</Link>
                                <Link to="/productlist/gold coin/24/50">50 Gm.</Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>22 Kt (916)</h4>
                                <Link to="/productlist/gold coin/22/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/22/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/22/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/22/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/22/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/22/20">20 Gm.</Link>
                                <Link to="/productlist/gold coin/22/50">50 Gm.</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Link to="/productlist/occasion/wedding wear">Wedding</Link>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Link to={`/productlist/category/Watch`}>Watches</Link>
                        <div className='s_submenu s_pos_100 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Brands</h4>
                                {watchSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Link to={'/productlist/all/null'} className='pe-md-0'>Gifting</Link>
                        <div className='s_submenu s_small_submenu s_pos_100'>
                            <div className='s_submenu_list '>
                                <Link to="/productlist/gift/Gifting for loved ones/Women">Gifting for loved ones</Link>
                                <Link to={'/productlist/gift/Gifting for loved ones/all'}>Gift Cards</Link>
                                <Link to="/productlist/gift/Gifting for loved ones/Men">Corporate Gifting</Link>
                            </div>
                        </div>
                    </Nav.Item>
                </Nav>
            </section>

            {/* offcanvas from 991px */}
            <Offcanvas show={show} onHide={handleClose} className='sp_header_offcanvas d-lg-none' responsive='lg'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className='s_logo'>
                            <h2 className='text-lg-center mb-0'>LOGO</h2>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className=''>
                    <Accordion flush>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header ><h4 className='s_submenu_head px-0'>All Category</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="00">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {allSubCategory.slice(0, 9).map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="01">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gender</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/all/gender/Men">Men</Link></p>
                                                <p><Link to="/productlist/all/gender/Women">Women</Link></p>
                                                <p><Link to="/productlist/all/gender/Kids">Kids & Teens</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="02">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price Band</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/all/price/>25">&lt;25K</Link></p>
                                                <p> <Link to="/productlist/all/price/25-50">25K - 50K</Link></p>
                                                <p> <Link to="/productlist/all/price/100<">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gold</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="10">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {goldSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="11">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {menGold.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/gold/men/${ele.sub_category_name}`} ><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="12">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gold Coin</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to={`/productlist/category/Gold Coin`}>Special Coin</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/8">8 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/20">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/25">25 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/30">30 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/50">50 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/100">100 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Silver</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="20">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {silverSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="21">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {menSilver.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/silver/men/${ele.sub_category_name}`} ><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="22">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/silver/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/silver/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/silver/price/50-100">50K - 1L</Link></p>
                                                <p><Link to="/productlist/silver/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Diamond</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="30">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {diamondSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="31">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Earrings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {earingSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="32">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Rings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {ringSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="33">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Pendants</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {pendantsSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="34">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/diamond/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/diamond/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/diamond/price/50-100">50K - 1L</Link></p>
                                                <p><Link to="/productlist/diamond/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Platinum</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="40">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {platiumSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="41">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/platinum/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/platinum/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/platinum/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gold Coins</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="50">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>24 Kt (995)</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/gold coin/24/0.5">0.5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/10">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/20">20 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/50">50 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="51">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>22 Kt (916)</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/gold coin/22/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/10">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/20">20 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/50">50 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Link to="/productlist/occasion/wedding wear" className='s_spec_submenu_head'><h4>Wedding</h4></Link>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Watches</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="70">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Brands</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {watchSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gifting</h4></Accordion.Header>
                            <Accordion.Body>
                                <div className='s_submenu_list'>
                                    <p><Link to="/productlist/all/gender/Women">Gifting for loved ones</Link></p>
                                    <p><Link to={'/productlist/all/null'}>Gift Cards</Link></p>
                                    <p><Link to="/productlist/all/gender/Men">Corporate Gifting</Link></p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>



            {/* LoginModel */}

            <Modal show={showLogin} onHide={handleLoginClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={LoginFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Login</h2>
                            <p>Login to your existing account to access your account</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='email' name='email' value={LoginFormik.values.email} onChange={LoginFormik.handleChange} onBlur={LoginFormik.handleBlur} placeholder='Enter email'></input>
                            {LoginFormik.errors.email && LoginFormik.touched.email ? <p className='ds_new-danger mb-0'>{LoginFormik.errors.email}</p> : null}

                        </div>
                        <div className='s_modal_field'>
                            <p>Password</p>
                            <input type='text' name='password' value={LoginFormik.values.password} onChange={LoginFormik.handleChange} onBlur={LoginFormik.handleBlur} placeholder='Enter password'></input>
                            {LoginFormik.errors.password && LoginFormik.touched.password ? <p className='ds_new-danger mb-0'>{LoginFormik.errors.password}</p> : null}
                            <span className='d-flex justify-content-end' onClick={() => { handleLoginClose(); handleForPassShow(); }}><Link to={'#'} >Forgot Password?</Link></span>
                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Login</button>
                        </div>
                    </form>

                    <div className='s_modal_or d-flex my-3'>
                        <div className='s_modal_line'></div>
                        <small>OR</small>
                        <div className='s_modal_line'></div>
                    </div>
                    <div className='s_modal_btn2'>
                        <img src={require('../Img/Sujal/google.png')} alt='google'></img>
                        <p className='mb-0'>Sign in with Google</p>
                    </div>
                    <div className='s_modal_btn2'>
                        <img src={require('../Img/Sujal/facebook.png')} alt='facebook'></img>
                        <p className='mb-0'>Sign in with Facebook</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <span className='d-flex' onClick={() => { handleLoginClose(); handleRegisterShow(); }}><p>Didn’t have any account?</p><Link to={'#'} > Signup</Link></span>
                </Modal.Footer>
            </Modal>

            {/* forget  password*/}
            <Modal show={showForPass} onHide={handleForPassClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={ForgetPassFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Forgot Password</h2>
                            <p>Enter your email below to recover your password</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='text' name='email' value={ForgetPassFormik.values.email} onChange={ForgetPassFormik.handleChange} onBlur={ForgetPassFormik.handleBlur} placeholder='Enter email'></input>
                            {ForgetPassFormik.errors.email && ForgetPassFormik.touched.email ? <p className='ds_new-danger mb-0'>{ForgetPassFormik.errors.email}</p> : null}

                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Send Code</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>



            {/* otp modal */}
            <Modal show={showOTP} onHide={handleOTPClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={OtpFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Verify OTP</h2>
                            <p>Enter verification code which we’ve sent to your registered email</p>
                        </div>
                        <div className='s_modal_otp d-flex justify-content-between mx-4'>
                            <input ref={otp1Ref} maxLength="1" type='text' name='otp1' value={OtpFormik.values.otp1} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp2Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp1) { e.preventDefault(); } }}></input>
                            <input ref={otp2Ref} maxLength="1" type='text' name='otp2' value={OtpFormik.values.otp2} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp3Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp2) { otp1Ref.current.focus(); } }}></input>
                            <input ref={otp3Ref} maxLength="1" type='text' name='otp3' value={OtpFormik.values.otp3} onChange={(e) => { OtpFormik.handleChange(e); if (e.target.value.length === 1) otp4Ref.current.focus(); }} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp3) { otp2Ref.current.focus(); } }}></input>
                            <input ref={otp4Ref} maxLength="1" type='text' name='otp4' value={OtpFormik.values.otp4} onChange={OtpFormik.handleChange} onBlur={OtpFormik.handleBlur} onKeyDown={(e) => { if (e.key === "Backspace" && !OtpFormik.values.otp4) { otp3Ref.current.focus(); } }}></input>
                        </div>
                        <div className='s_modal_btn'>
                            <button type='submit'>Verify</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            {/* reset password */}
            <Modal show={showResetPass} onHide={handleResetPassClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={ReserPassFormik.handleSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Reset Password</h2>
                            <p>Reset your password & create new password</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>New Password</p>
                            <input type='text' name='newPass' value={ReserPassFormik.values.newPass} onChange={ReserPassFormik.handleChange} onBlur={ReserPassFormik.handleBlur} placeholder='New Password'></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Confirm New Password</p>
                            <input type='text' name='conPass' value={ReserPassFormik.values.conPass} onChange={ReserPassFormik.handleChange} onBlur={ReserPassFormik.handleBlur} placeholder='Confirm New Password'></input>
                        </div>
                        <div className='s_modal_btn' >
                            <button type='submit'>Reset Password</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>


            {/* register modal */}
            <Modal show={showRegister} onHide={handleRegisterClose} animation={false} centered className='s_modal'>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='s_model_con'>
                    <form onSubmit={handleSignUp}>
                        <div className='s_modal_head text-center' >
                            <h2>Create Account</h2>
                            <p>Create an account & get access to exclusive collection of jewelry</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Name</p>
                            <input type='text' placeholder='Enter name' value={signUpVal.name} onChange={(e) => setSignUpVal({ ...signUpVal, name: e.target.value })} ></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Mobile No.</p>
                            <input type='text' placeholder='Enter mobile no.' value={signUpVal.phone} onChange={(e) => setSignUpVal({ ...signUpVal, phone: e.target.value })}></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='text' placeholder='Enter email' value={signUpVal.email} onChange={(e) => setSignUpVal({ ...signUpVal, email: e.target.value })}></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Password</p>
                            <input type='text' placeholder='Enter password' value={signUpVal.password} onChange={(e) => setSignUpVal({ ...signUpVal, password: e.target.value })}></input>
                        </div>
                        <div className='s_modal_btn' onClick={(e) => handleSignUp(e)}>
                            <button type='submit' >Register</button>
                        </div>
                    </form>

                    <div className='s_modal_or d-flex my-3'>
                        <div className='s_modal_line'></div>
                        <small>OR</small>
                        <div className='s_modal_line'></div>
                    </div>
                    <div className='s_modal_btn2'>
                        <img src={require('../Img/Sujal/google.png')} alt='google'></img>
                        <p className='mb-0'>Sign in with Google</p>
                    </div>
                    <div className='s_modal_btn2'>
                        <img src={require('../Img/Sujal/facebook.png')} alt='facebook'></img>
                        <p className='mb-0'>Sign in with Facebook</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='justify-content-center' onClick={() => { handleRegisterClose(); handleLoginShow(); }}>
                    <span className='d-flex'><p>Already have an account?</p><Link to={'#'}> Signin</Link></span>
                </Modal.Footer>
            </Modal>


            {/* search section */}
            <section className={`s_search_sec ${Search === '' ? '' : 'show'}`}>
                {searchData.length === 0 ?
                    <>
                        <div className='s_serach_head  border-0'><IoCloseOutline className='ms-auto ' onClick={() => { setSearch(''); }} /></div>
                        <div className='s_search_not'>
                            <h2>No result found.</h2></div>
                    </>
                    : <>
                        <div className='s_serach_head'><h5 className='mb-0'>Suggestions</h5><IoCloseOutline onClick={() => { setSearch(''); }} /></div>
                        {searchData.slice(0, 8).map((el, id) => {
                            return (
                                <div key={id} className='s_search_item'>
                                    <p>
                                        <Link to={`productdetail/${el.id}`}>
                                            <Highlighter
                                                highlightClassName="text-dark bg-transparent p-0"
                                                searchWords={[Search]} // Replace 'Search' with the array of words you want to highlight
                                                autoEscape={true}   // Ensure special characters are escaped
                                                textToHighlight={el.product_name} // The text where you want to apply the highlight
                                            />
                                        </Link>
                                    </p>
                                </div>
                            )
                        })}
                        <div className='s_serach_head'><h5 className='mb-0'>Popular Products</h5></div>
                        {PopularData.slice(0, 4).map((el, id) => {
                            const discounted = ((parseFloat(el.total_price) * parseFloat(el.discount)) / 100).toFixed(2);
                            let discountPrice = [];
                            console.log(el.product_name, discounted);
                            if (!isNaN(parseFloat(discounted))) {
                                discountPrice = (parseFloat(el.total_price) - parseFloat(discounted)).toFixed(2);
                            } else {
                                discountPrice = el.total_price;
                            }
                            return (
                                <div key={id} lassName='s_search_item'>
                                    <Link to={`productdetail/${el.id}`} className='d-flex align-items-center'>
                                        <img src={el.images[0]} alt={el.product_name}></img>
                                        <div>
                                            <p className='mb-0'>{el.product_name}</p>
                                            <span>
                                                <small>₹{discountPrice}</small>
                                                <strike>₹{el.total_price}</strike>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </>
                }
                <Link to={`/productlist/search/${Search}`} className='s_serach_head border-top border-0 mt-auto'><h5 className='mb-0'>Search for “{Search}”</h5><FaArrowRight /></Link>
            </section>
        </>
    );
}
export default Header;