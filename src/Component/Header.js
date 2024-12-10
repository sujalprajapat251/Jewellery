import { Nav, Offcanvas, Accordion, Modal } from 'react-bootstrap';
import '../Css/Sujal/Header.css';
import { IoCartOutline, IoCloseOutline, IoPersonOutline, IoSearch } from 'react-icons/io5';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/noteContext';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ring1 from '../Img/Sujal/s_diamond_earing.png';
import ring2 from '../Img/Sujal/s_diamond_earing.png';
import ring3 from '../Img/Sujal/engage-ring.png';
import axios from 'axios';
import noteContext from '../Context/noteContext';






function Header() {
    const { allProduct, allSubCategory } = useContext(noteContext);
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
        const goldProducts = allProduct.filter((ele) => ele.category_name === "Gold" && ele.gender === 'male');
        setMenGold(goldProducts);

        const silverProducts = allProduct.filter((ele) => ele.category_name === "Silver" && ele.gender === 'male');
        setMenSilver(silverProducts);
    }, [allProduct]);
    // menu catgegory handller over ---------------

    // search handdig 

    const [Search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const searchHandle = () => {
        console.log(Search)
        const filteredSearchData = allProduct.filter(item => item.product_name.toLowerCase().includes(Search));
        console.log(filteredSearchData);
        setSearchData(filteredSearchData);
    }

















    const {Api} =  useContext(noteContext)

    // offcanvas 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Login Model
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const [loginVal, setLoginVal] = useState({
        email:'',
        password:'',
    })

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`${Api}/auth/login`, {
            email:loginVal.email,
            password:loginVal.password,
        })
        .then((value)=>{
            console.log("LoginRes" , value.data); 
            localStorage.setItem("Login", JSON.stringify(value.data.result))
        }).catch((error)=>{
            alert(error)
        }) 
    }

    // const [loginVal, setLoginVal] = useState("")

    // forgot password Model
    const [showForPass, setShowForPass] = useState(false);

    const handleForPassClose = () => setShowForPass(false);
    const handleForPassShow = () => setShowForPass(true);

    const [forgetEmail, setForgetEmail] = useState("")

    const handleForgetPassword = (e) => {
        e.preventDefault();

        axios.post(`${Api}/password/email`, {
            email:forgetEmail,
        })
        .then((value)=>{
            console.log("ForgetRes" , value.data); 
            handleForPassClose()
            handleOTPShow()
        }).catch((error)=>{
            alert(error)
        }) 
    }

    // Verify Otp Model
    const [showOTP, setShowOTP] = useState(false);

    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);

    const [otpVal, setOtpVal] = useState({
         otp1:'',
         otp2:'',
         otp3:'',
         otp4:''
    })
    const [storeOtp, setStoreOtp] = useState("")

    const handleOtpSubmit = (e) => {
         e.preventDefault();

         axios.post(`${Api}/password/otp`, {
            otp:parseInt(otpVal.otp1 + otpVal.otp2 + otpVal.otp3 + otpVal.otp4),
           
        }).then((value)=>{
            console.log("OtpRes" , value.data); 
            handleOTPClose()
            handleResetPassShow()
            setStoreOtp(parseInt(otpVal.otp1 + otpVal.otp2 + otpVal.otp3 + otpVal.otp4))

        }).catch((error)=>{
            alert(error)
        }) 

    }

    // Reset Password Model
    const [showResetPass, setShowResetPass] = useState(false);

    const handleResetPassClose = () => setShowResetPass(false);
    const handleResetPassShow = () => setShowResetPass(true);

    const [resetPassVal, setResetPassVal] = useState({
        newPass:'',
        conPass:'',
    })

    const handleResetPassword = (e) => {
        e.preventDefault();

        axios.post(`${Api}/password/reset/${storeOtp}`, {
            new_password:resetPassVal.newPass,
            confirm_password:resetPassVal.conPass
            
        }).then((value)=>{
            console.log("ResetPassRes" , value.data); 
            handleResetPassClose()
            handleLoginShow();
        }).catch((error)=>{
            alert(error)
        }) 
    }

    // SignUp Model
    const [showRegister, setShowRegister] = useState(false);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const [signUpVal, setSignUpVal] = useState({
        name:'',
        phone:'',
        email:'',
        password:'',
    })

    const handleSignUp = (e) => {
        e.preventDefault();
        axios.post(`${Api}/user/create`, {
            name:signUpVal.name,
            phone:signUpVal.phone,
            email:signUpVal.email,
            password:signUpVal.password,
            role_id:2,
            dob: "2001-01-01",
        })
        .then((value)=>{
            console.log("Res" , value); 
        }).catch((error)=>{
            alert(error)
        }) 
    }



    // heart icon handller
    const [isFilled, setIsFilled] = useState(false);
    return (
        <>
            <div className="text-center s_header_top">
                <p className='ds_container mb-0'>Welcome to our Store</p></div>
            <section className='ds_container s_header_sec d-flex justify-content-between flex-wrap flex-lg-nowrap'>
                <div className='s_header_input d-flex justify-content-between align-items-center col-lg-4 col-12 order-lg-1 order-3'>
                    <input type='text' placeholder='Search for Jewellery and more...' on={(e) => { setSearch(e.target.value); searchHandle(); }}></input>
                    <IoSearch />
                </div>
                <Link className='s_logo text-decoration-none col-lg-4 col-4 ms-lg-auto order-lg-2 order-1 align-self-center '>
                    <h2 className='text-lg-center mb-0'>LOGO</h2>
                </Link>
                <div className='col-lg-4 col-4 d-flex justify-content-end align-items-center order-lg-3 order-2'>
                    <Link to={'/wishlist'} className={`s_header_icon s_heart_icons ${isFilled ? "filled" : "empty"}`} onClick={() => setIsFilled(!isFilled)} >
                        {isFilled ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        <p className='mb-0'>Wishlist</p>
                    </Link>
                    <Link to={'/cart'} className='s_header_icon'>
                        <IoCartOutline />
                        <p className='mb-0'>Cart</p>
                    </Link>
                    <Link to={'#'} className='s_header_icon' onClick={handleLoginShow}>
                        <IoPersonOutline />
                        <p className='mb-0'>Account</p>
                    </Link>
                    <Link to={'#'} className=' d-lg-none d-flex align-items-center fs-2 s_bar_icon' onClick={handleShow}>
                        <FaBars />
                    </Link>
                </div>
            </section>
            <section className='s_header_menu  d-none d-lg-block'>
                <Nav className='justify-content-between ds_container  flex-nowrap px-0 text-nowrap'>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="/productlist" className='ps-md-0'>All Jewellery</Nav.Link>
                        <div className='s_submenu'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                {allSubCategory.slice(0, 9).map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Gender</h4>
                                <Nav.Link href="/productlist">Men</Nav.Link>
                                <Nav.Link href="/productlist">Women</Nav.Link>
                                <Nav.Link href="/productlist">Kids & Teens</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price Band</h4>
                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="/productlist">Gold</Nav.Link>
                        <div className='s_submenu   '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                {goldSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                {menGold.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Gold Coin</h4>
                                <Nav.Link href="/productlist">Special Coin</Nav.Link>
                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">8 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">25 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">30 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">100 Gm.</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="/productlist">Silver</Nav.Link>
                        <div className='s_submenu '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                {silverSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                {menSilver.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.sub_category_name} src={ele.images[0]}></img>{ele.sub_category_name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price</h4>
                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Nav.Link href="/productlist">Diamond</Nav.Link>
                        <div className='s_submenu s_pos_50 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                {diamondSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Earrings</h4>
                                {earingSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Rings</h4>
                                {ringSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Pendants</h4>
                                {pendantsSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price</h4>
                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Nav.Link href="/productlist">Platinum</Nav.Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                {platiumSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price</h4>
                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className=''>
                        <Nav.Link href="/productlist">Gold Coins</Nav.Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>24 Kt (995)</h4>
                                <Nav.Link href="/productlist">0.5 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">20 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>22 Kt (916)</h4>
                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">20 Gm.</Nav.Link>
                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="/productlist">Wedding</Nav.Link>

                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="/productlist">Watches</Nav.Link>
                        <div className='s_submenu s_pos_100 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Brands</h4>
                                {watchSubcate.map((ele, id) => {
                                    return (
                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                    )
                                })}
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative'>
                        <Nav.Link href="#logout" className='pe-md-0'>Gifting</Nav.Link>
                        <div className='s_submenu s_small_submenu s_pos_100'>
                            <div className='s_submenu_list '>
                                <Nav.Link href="/productlist">Gifting for loved ones</Nav.Link>
                                <Nav.Link href="/productlist">Gift Cards</Nav.Link>
                                <Nav.Link href="/productlist">Corporate Gifting</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="01">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gender</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">Men</Nav.Link>
                                                <Nav.Link href="/productlist">Women</Nav.Link>
                                                <Nav.Link href="/productlist">Kids & Teens</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="02">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price Band</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Nav.Link>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="12">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gold Coin</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">Special Coin</Nav.Link>
                                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">8 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">25 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">30 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">100 Gm.</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Nav.Link>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="22">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="34">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="41">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
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
                                                <Nav.Link href="/productlist">0.5 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">20 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="51">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>22 Kt (916)</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist">&lt;25K</Nav.Link>
                                                <Nav.Link href="/productlist">25K - 50K</Nav.Link>
                                                <Nav.Link href="/productlist">50K - 1L</Nav.Link>
                                                <Nav.Link href="/productlist">1L & Above</Nav.Link>
                                                <Nav.Link href="/productlist">1 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">2 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">4 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">5 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">10 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">20 Gm.</Nav.Link>
                                                <Nav.Link href="/productlist">50 Gm.</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Wedding</h4></Accordion.Header>
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
                                                        <Nav.Link href="/productlist" key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Nav.Link>
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
                                    <Nav.Link href="/productlist">Gifting for loved ones</Nav.Link>
                                    <Nav.Link href="/productlist">Gift Cards</Nav.Link>
                                    <Nav.Link href="/productlist">Corporate Gifting</Nav.Link>
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
                   <form onSubmit={handleLogin}>
                       <div className='s_modal_head text-center' >
                            <h2>Login</h2>
                            <p>Login to your existing account to access your account</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>Email</p>
                            <input type='text' value={loginVal.email} onChange={(e)=> setLoginVal({...loginVal , email:e.target.value})} placeholder='Enter email'></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Password</p>
                            <input type='text' value={loginVal.password} onChange={(e)=>setLoginVal({...loginVal , password:e.target.value})} placeholder='Enter password'></input>
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
                    <form onSubmit={handleForgetPassword}>
                         <div className='s_modal_head text-center' >
                             <h2>Forgot Password</h2>
                             <p>Enter your email below to recover your password</p>
                         </div>
                         <div className='s_modal_field'>
                             <p>Email</p>
                             <input type='text' value={forgetEmail} onChange={(e)=>setForgetEmail(e.target.value)} placeholder='Enter email'></input>
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
                    <form onSubmit={handleOtpSubmit}>
                        <div className='s_modal_head text-center' >
                            <h2>Verify OTP</h2>
                            <p>Enter verification code which we’ve sent to your registered email</p>
                        </div>
                        <div className='s_modal_otp d-flex justify-content-between mx-4'>
                            <input type='text' value={otpVal.otp1} onChange={(e)=> setOtpVal({...otpVal , otp1:e.target.value})}></input>
                            <input type='text' value={otpVal.otp2} onChange={(e)=> setOtpVal({...otpVal , otp2:e.target.value})}></input>
                            <input type='text' value={otpVal.otp3} onChange={(e)=> setOtpVal({...otpVal , otp3:e.target.value})}></input>
                            <input type='text' value={otpVal.otp4} onChange={(e)=> setOtpVal({...otpVal , otp4:e.target.value})}></input>
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
                    <form onSubmit={handleResetPassword}>
                        <div className='s_modal_head text-center' >
                            <h2>Reset Password</h2>
                            <p>Reset your password & create new password</p>
                        </div>
                        <div className='s_modal_field'>
                            <p>New Password</p>
                            <input type='text' value={resetPassVal.newPass} onChange={(e)=> setResetPassVal({...resetPassVal , newPass:e.target.value})} placeholder='New Password'></input>
                        </div>
                        <div className='s_modal_field'>
                            <p>Confirm New Password</p>
                            <input type='text' value={resetPassVal.conPass} onChange={(e)=> setResetPassVal({...resetPassVal , conPass:e.target.value})} placeholder='Confirm New Password'></input>
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
                       <div className='s_modal_btn' onClick={(e)=> handleSignUp(e)}>
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
                        {searchData.map((el, id) => {
                            return (
                                <div key={id} className='s_search_item'>
                                    {!el.popular ?
                                        <p>
                                            <Link to={`#`}>
                                                <Highlighter
                                                    highlightClassName="text-dark bg-transparent"
                                                    searchWords={[Search]} // Replace 'Search' with the array of words you want to highlight
                                                    autoEscape={true}   // Ensure special characters are escaped
                                                    textToHighlight={el.product_name} // The text where you want to apply the highlight
                                                />
                                            </Link>
                                        </p>
                                        : ''}
                                </div>
                            )
                        })}
                        {/* <div className='s_serach_head'><h5 className='mb-0'>Popular</h5></div>
                        {searchData.map((el, id) => {
                            return (
                                <div key={id} className='s_search_item'>
                                    {el.popular ?
                                        <Link to={`#`} className='d-flex align-items-center'>
                                            <img src={el.img} alt={el.name}></img>
                                            <div>
                                                <p className='mb-0'>{el.name}</p>
                                                <span>
                                                    <small>₹{el.price}</small>
                                                    <strike>₹{el.oldPrice}</strike>
                                                </span>
                                            </div>
                                        </Link>
                                        : ''}
                                </div>
                            )
                        })} */}
                    </>
                }
                <div className='s_serach_head border-top border-0 mt-auto'><h5 className='mb-0'>Search for “{Search}”</h5><FaArrowRight /></div>
            </section>
        </>
    );
}
export default Header;