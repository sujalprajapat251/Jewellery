import { Nav, Offcanvas, Accordion, Modal } from 'react-bootstrap';
import '../Css/Sujal/Header.css';
import { IoCartOutline, IoCloseOutline, IoPersonOutline, IoSearch } from 'react-icons/io5';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ring1 from '../Img/Sujal/s_diamond_earing.png';
import ring2 from '../Img/Sujal/s_diamond_earing.png';
import ring3 from '../Img/Sujal/engage-ring.png';
function Header() {


    // offcanvas 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // Login Model
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    // forgot password Model
    const [showForPass, setShowForPass] = useState(false);

    const handleForPassClose = () => setShowForPass(false);
    const handleForPassShow = () => setShowForPass(true);
    // forgot password Model
    const [showOTP, setShowOTP] = useState(false);

    const handleOTPClose = () => setShowOTP(false);
    const handleOTPShow = () => setShowOTP(true);

    // forgot password Model
    const [showResetPass, setShowResetPass] = useState(false);

    const handleResetPassClose = () => setShowResetPass(false);
    const handleResetPassShow = () => setShowResetPass(true);

    // Login Model
    const [showRegister, setShowRegister] = useState(false);

    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);


    // search model 
    const [Search, setSearch] = useState('');

    const allData = [
        { name: 'ring', img: ring1, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'Finger rings', img: ring2, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'Couple rings', img: ring1, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'Vanki - rings', img: ring3, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'Baroque - Rings', img: ring1, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'ring', img: ring1, popular: false, price: '1200', oldPrice: '1500' },
        { name: 'Diamond Ring Set', img: ring2, popular: true, price: '1200', oldPrice: '1500' },
        { name: 'Golden Ring', img: ring3, popular: true, price: '1200', oldPrice: '1500' },
    ]
    const [searchData, setSearchData] = useState([]);
    const searchHandle = () => {
        const filteredSearchData = allData.filter(item => item.name.toLowerCase().includes(Search.toLowerCase()));
        console.log(filteredSearchData);
        setSearchData(filteredSearchData);
    }


    // heart icon handller
    const [isFilled, setIsFilled] = useState(false);
    return (
        <>
            <div className="text-center s_header_top">
                <p className='ds_container mb-0'>Welcome to our Store</p></div>
            <section className='ds_container s_header_sec d-flex justify-content-between flex-wrap flex-lg-nowrap'>
                <div className='s_header_input d-flex justify-content-between align-items-center col-lg-4 col-12 order-lg-1 order-3'>
                    <input type='text' placeholder='Search for Jewellery and more...' onChange={(e) => { setSearch(e.target.value); searchHandle(); }}></input>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/finger-ring.png')}></img>Finger Ring</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pin</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>&nbsp;</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/goldcoin.png')}></img>Gold Coins</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain1.png')}></img>Gold chains</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/Ring.png')}></img>Rings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/engage-ring.png')}></img>Engagement Rings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pins</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangtika.png')}></img>Mang Tika</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/engage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent1.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/Ring1.png')}></img>Rings</Nav.Link>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbraclet.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/searing.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/spendant.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sring.png')}></img>Rings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sengage-ring.png')}></img>Engagement Rings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/snecklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/snosepin.png')}></img>Nose Pins</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/skadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/smangtika.png')}></img>Mang Tika</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbracelet1.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/schain1.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sengage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/skadas1.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/spendants1.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sring1.png')}></img>Rings</Nav.Link>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dbangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dbracelet.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dmanaglsutra.png')}></img>Mangalsutra</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dnecklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/drosepin.png')}></img>Nose Pins</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Earrings</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing.png')}></img>Drop Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing1.png')}></img>Hoop Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/djhumka.png')}></img>Jhumkas</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing2.png')}></img>Stud Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Rings</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dengagering.png')}></img>Engagement Rings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Pendants</h4>
                                <Nav.Link href="/productlist">Casual Wear</Nav.Link>
                                <Nav.Link href="/productlist">Daily Wear</Nav.Link>
                                <Nav.Link href="/productlist">Party Wear</Nav.Link>
                                <Nav.Link href="/productlist">Pendants & earrings Set</Nav.Link>
                                <Nav.Link href="/productlist">Traditional</Nav.Link>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pring.png')}></img>Rings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pbracelet.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pearing.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pbracelet.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent.png')}></img>Daily Wear</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent1.png')}></img>Office Wear</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent2.png')}></img>Casual Wear</Nav.Link>
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
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch.png')}></img>TAG Heuer</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch1.png')}></img>Rado</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch2.png')}></img>Calvin Klein</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch3.png')}></img>Seiko</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch4.png')}></img>Fossil</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch5.png')}></img>Alba</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch6.png')}></img>Longines</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>&nbsp;</h4>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch7.png')}></img>Tissot</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch8.png')}></img>MK</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch9.png')}></img>Guess</Nav.Link>
                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch10.png')}></img>Skagen</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/finger-ring.png')}></img>Finger Ring</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pin</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/goldcoin.png')}></img>Gold Coins</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain1.png')}></img>Gold chains</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/Ring.png')}></img>Rings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/engage-ring.png')}></img>Engagement Rings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pins</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/mangtika.png')}></img>Mang Tika</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="11">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/engage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pandent1.png')}></img>Pendants</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/Ring1.png')}></img>Rings</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbangels.png')}></img>Bangels</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbraclet.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/searing.png')}></img>Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/spendant.png')}></img>Pendants</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sring.png')}></img>Rings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sengage-ring.png')}></img>Engagement Rings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/snecklace.png')}></img>Necklace</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/snosepin.png')}></img>Nose Pins</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/skadas.png')}></img>Kadas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/smangtika.png')}></img>Mang Tika</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="21">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sbracelet1.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/schain1.png')}></img>Chains</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sengage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/skadas1.png')}></img>Kadas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/spendants1.png')}></img>Pendants</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/sring1.png')}></img>Rings</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dbangels.png')}></img>Bangels</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dbracelet.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dmanaglsutra.png')}></img>Mangalsutra</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dnecklace.png')}></img>Necklace</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/drosepin.png')}></img>Nose Pins</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="31">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Earrings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing.png')}></img>Drop Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing1.png')}></img>Hoop Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/djhumka.png')}></img>Jhumkas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing2.png')}></img>Stud Earrings</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="32">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Rings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dengagering.png')}></img>Engagement Rings</Nav.Link>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="33">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Pendants</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing.png')}></img>Drop Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing1.png')}></img>Hoop Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/djhumka.png')}></img>Jhumkas</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/dearing2.png')}></img>Stud Earrings</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pring.png')}></img>Rings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pbracelet.png')}></img>Chains</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pearing.png')}></img>Earrings</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/pbracelet.png')}></img>Bracelets</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent.png')}></img>Daily Wear</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent1.png')}></img>Office Wear</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/ppandent2.png')}></img>Casual Wear</Nav.Link>
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
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch.png')}></img>TAG Heuer</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch1.png')}></img>Rado</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch2.png')}></img>Calvin Klein</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch3.png')}></img>Seiko</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch4.png')}></img>Fossil</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch5.png')}></img>Alba</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch6.png')}></img>Longines</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch7.png')}></img>Tissot</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch8.png')}></img>MK</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch9.png')}></img>Guess</Nav.Link>
                                                <Nav.Link href="/productlist"><img alt='earing' src={require('../Img/Sujal/watch10.png')}></img>Skagen</Nav.Link>
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
                    <div className='s_modal_head text-center' >
                        <h2>Login</h2>
                        <p>Login to your existing account to access your account</p>
                    </div>
                    <div className='s_modal_field'>
                        <p>Email</p>
                        <input type='text' placeholder='Enter email'></input>
                    </div>
                    <div className='s_modal_field'>
                        <p>Password</p>
                        <input type='text' placeholder='Enter password'></input>
                        <span className='d-flex justify-content-end' onClick={() => { handleLoginClose(); handleForPassShow(); }}><Link to={'#'} >Forgot Password?</Link></span>
                    </div>
                    <div className='s_modal_btn' onClick={handleLoginClose}>
                        <Link to={'#'}>Login</Link>
                    </div>

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
                    <div className='s_modal_head text-center' >
                        <h2>Forgot Password</h2>
                        <p>Enter your email below to recover your password</p>
                    </div>
                    <div className='s_modal_field'>
                        <p>Email</p>
                        <input type='text' placeholder='Enter email'></input>
                    </div>

                    <div className='s_modal_btn' onClick={() => { handleForPassClose(); handleOTPShow(); }}>
                        <Link to={'#'}>Send Code</Link>
                    </div>
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
                    <div className='s_modal_head text-center' >
                        <h2>Verify OTP</h2>
                        <p>Enter verification code which we’ve sent to your registered email</p>
                    </div>
                    <div className='s_modal_otp d-flex justify-content-between'>
                        <input type='text'></input>
                        <input type='text'></input>
                        <input type='text'></input>
                        <input type='text'></input>
                        <input type='text'></input>
                        <input type='text'></input>
                    </div>
                    <div className='s_modal_btn' onClick={() => { handleOTPClose(); handleResetPassShow(); }}>
                        <Link to={'#'}>Verify</Link>
                    </div>
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
                    <div className='s_modal_head text-center' >
                        <h2>Reset Password</h2>
                        <p>Reset your password & create new password</p>
                    </div>
                    <div className='s_modal_field'>
                        <p>New Password</p>
                        <input type='text' placeholder='New Password'></input>
                    </div>
                    <div className='s_modal_field'>
                        <p>Confirm New Password</p>
                        <input type='text' placeholder='Confirm New Password'></input>
                    </div>
                    <div className='s_modal_btn' onClick={() => { handleResetPassClose(); handleLoginShow(); }}>
                        <Link to={'#'}>Reset Password</Link>
                    </div>
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
                    <div className='s_modal_head text-center' >
                        <h2>Create Account</h2>
                        <p>Create an account & get access to exclusive collection of jewelry</p>
                    </div>
                    <div className='s_modal_field'>
                        <p>Name</p>
                        <input type='text' placeholder='Enter name'></input>
                    </div>
                    <div className='s_modal_field'>
                        <p>Mobile No.</p>
                        <input type='text' placeholder='Enter mobile no.'></input>
                    </div>
                    <div className='s_modal_field'>
                        <p>Email</p>
                        <input type='text' placeholder='Enter email'></input>
                    </div>
                    <div className='s_modal_field'>
                        <p>Password</p>
                        <input type='text' placeholder='Enter password'></input>
                    </div>
                    <div className='s_modal_btn' onClick={() => { handleLoginShow(); handleRegisterClose(); }}>
                        <Link to={'#'}>Register</Link>
                    </div>

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
                                                {el.name}
                                            </Link>
                                        </p>
                                        : ''}
                                </div>
                            )
                        })}
                        <div className='s_serach_head'><h5 className='mb-0'>Popular</h5></div>
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
                        })}
                    </>
                }
                <div className='s_serach_head border-top border-0 mt-auto'><h5 className='mb-0'>Search for “{Search}”</h5><FaArrowRight /></div>
            </section>
        </>
    );
}
export default Header;