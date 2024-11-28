import { Nav, Offcanvas } from 'react-bootstrap';
import '../Css/Sujal/Header.css';
import { IoCartOutline, IoPersonOutline, IoSearch } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="text-center s_header_top">
                <p className='ds_container mb-0'>Welcome to our Store</p></div>
            <section className='ds_container s_header_sec d-flex justify-content-between flex-wrap flex-lg-nowrap'>
                <div className='s_header_input d-flex justify-content-between align-items-center col-lg-4 col-12 order-lg-1 order-3'>
                    <input type='text' placeholder='Search for Jewellery and more...'></input>
                    <IoSearch />
                </div>
                <div className='s_logo col-lg-4 col-4 ms-lg-auto order-lg-2 order-1 align-self-center '>
                    <h2 className='text-lg-center mb-0'>LOGO</h2>
                </div>
                <div className='col-lg-4 col-4 d-flex justify-content-end align-items-center order-lg-3 order-2'>
                    <div className='s_header_icon'>
                        <IoMdHeartEmpty />
                        <p className='mb-0'>Wishlist</p>
                    </div>
                    <div className='s_header_icon'>
                        <IoCartOutline />
                        <p className='mb-0'>Cart</p>
                    </div>
                    <div className='s_header_icon'>
                        <IoPersonOutline />
                        <p className='mb-0'>Account</p>
                    </div>
                    <div className=' d-lg-none d-flex align-items-center fs-2' onClick={handleShow}>
                        <FaBars />
                    </div>
                </div>
            </section>
            <section className='s_header_menu  d-none d-lg-block'>
                <Nav className='justify-content-between ds_container  flex-nowrap px-0 text-nowrap'>
                    <Nav.Item >
                        <Nav.Link href="#home" className='ps-md-0'>All Jewellery</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/finger-ring.png')}></img>Finger Ring</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pin</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>&nbsp;</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/goldcoin.png')}></img>Gold Coins</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Gender</h4>
                                <Nav.Link href="#home">Men</Nav.Link>
                                <Nav.Link href="#home">Women</Nav.Link>
                                <Nav.Link href="#home">Kids & Teens</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price Band</h4>
                                <Nav.Link href="#home">&lt;25K</Nav.Link>
                                <Nav.Link href="#home">25K - 50K</Nav.Link>
                                <Nav.Link href="#home">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#about">Gold</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/bangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/chain1.png')}></img>Gold chains</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/pandent.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/Ring.png')}></img>Rings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/engage-ring.png')}></img>Engagement Rings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/necklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/nosepin.png')}></img>Nose Pins</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/mangalsutra.png')}></img>Mangalsutra</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/mangtika.png')}></img>Mang Tika</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/braclets.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/chain.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/engage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/kadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/pandent1.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/Ring1.png')}></img>Rings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Price Band</h4>
                                <Nav.Link href="#home">Gold Coin</Nav.Link>
                                <Nav.Link href="#home">1 Gm.</Nav.Link>
                                <Nav.Link href="#home">2 Gm.</Nav.Link>
                                <Nav.Link href="#home">4 Gm.</Nav.Link>
                                <Nav.Link href="#home">5 Gm.</Nav.Link>                                
                                <Nav.Link href="#home">8 Gm.</Nav.Link>
                                <Nav.Link href="#home">10 Gm.</Nav.Link>                                
                                <Nav.Link href="#home">25 Gm.</Nav.Link>
                                <Nav.Link href="#home">30 Gm.</Nav.Link>
                                <Nav.Link href="#home">50 Gm.</Nav.Link>
                                <Nav.Link href="#home">100 Gm.</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#products">Silver</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sbangels.png')}></img>Bangels</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sbraclet.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/searing.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/spendant.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sring.png')}></img>Rings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sengage-ring.png')}></img>Engagement Rings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/snecklace.png')}></img>Necklace</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/snosepin.png')}></img>Nose Pins</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/skadas.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/smangtika.png')}></img>Mang Tika</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Men</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sbracelet1.png')}></img>Bracelets</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/schain1.png')}></img>Chains</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sengage-ring1.png')}></img>Engagement Ring</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/skadas1.png')}></img>Kadas</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/spendants1.png')}></img>Pendants</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/sring1.png')}></img>Rings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-3'>Price Band</h4>
                                <Nav.Link href="#home">&lt;25K</Nav.Link>
                                <Nav.Link href="#home">25K - 50K</Nav.Link>
                                <Nav.Link href="#home">1L & Above</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#about">Diamond</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Gender</h4>
                                <Nav.Link href="#home">Men</Nav.Link>
                                <Nav.Link href="#home">Women</Nav.Link>
                                <Nav.Link href="#home">Kids & Teens</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Gender</h4>
                                <Nav.Link href="#home">Men</Nav.Link>
                                <Nav.Link href="#home">Women</Nav.Link>
                                <Nav.Link href="#home">Kids & Teens</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#products">Platinum</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#about">Gold Coins</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#products">Wedding</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#about">Watches</Nav.Link>
                        <div className='s_submenu ds_container d-flex flex-wrap flex-xxl-nowrap'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head'>Category</h4>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                                <Nav.Link href="#home"><img alt='earing' src={require('../Img/Sujal/earings.png')}></img>Earrings</Nav.Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#logout" className='pe-md-0'>Gifting</Nav.Link>
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
                <Offcanvas.Body className='px-0'>
                    <ul className=''>
                        <li><a href="#home">All  Jewellery</a></li>
                        <li><a href="#about">Gold</a></li>
                        <li><a href="#products">Silver</a></li>
                        <li><a href="#about">Diamond</a></li>
                        <li><a href="#products">Platinum</a></li>
                        <li><a href="#about">Gold Coins</a></li>
                        <li><a href="#products">Wedding</a></li>
                        <li><a href="#about">Watches</a></li>
                        <li><a href="#logout" className='pe-0'>Gifting</a></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default Header;