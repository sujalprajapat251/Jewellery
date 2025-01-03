import { Col, Row } from 'react-bootstrap';
import '../Css/Sujal/Footer.css';
import { GrFacebookOption, GrTwitter } from 'react-icons/gr';
import { FaXTwitter } from 'react-icons/fa6';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import noteContext from '../Context/noteContext';
import Login from './Login';
function Footer() {
    const { store, handleMyFaq } = useContext(noteContext);

    // LoginModal handing
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);



    return (
        <>
            <section className="s_footer_sec">
                <section className="s_footer_main ds_container h-100 align-self-center">
                    <Row className='align-items-center h-100 gx-0'>
                        <Col lg={5} xl={6} gx={0} >
                            <h4 className='s_logo'>Logo</h4>
                            <p className='s_logo_des'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                            <div className='d-none d-lg-flex'>
                                <Link to={'https://www.facebook.com/'}><div className='s_footer_icon'><GrFacebookOption /></div></Link>
                                {/* <Link to={'www.facebook.com'}> <div className='s_footer_icon'><GrTwitter /></div></Link> */}
                                <Link to={'https://x.com/'}>  <div className='s_footer_icon'><FaXTwitter /></div></Link>
                                <Link to={'https://www.instagram.com/'}> <div className='s_footer_icon'><PiInstagramLogoFill /></div></Link>
                            </div>
                        </Col>
                        <Col lg={7} xl={6}>
                            <div className='s_footer_right pt-5 pt-lg-0'>
                                <ul>
                                    <h4>Top Category</h4>
                                    <li><Link to='/productlist/category/Gold'>Gold</Link></li>
                                    <li><Link to='/productlist/category/Silver'>Silver</Link></li>
                                    <li><Link to='/productlist/category/Diamond'>Diamond</Link></li>
                                    <li><Link to='/productlist/category/Platinum'>Platinum</Link></li>
                                    <li><Link to='/productlist/category/Gold Coin'>Gold Coins</Link></li>
                                </ul>
                                <ul>
                                    <h4>Customer Services</h4>
                                    <li><Link to='/offers'>Offers</Link></li>
                                    {store ? <li><Link to='/trackorder'>Track your order</Link></li> : <li><Link to='#' onClick={handleLoginShow}>Track your order</Link></li>}
                                    <li><Link state={{ faq: 'shipping' }} to='/faq'>Shipping </Link></li>
                                    <li><Link to='/faq'>Returns</Link></li>
                                </ul>
                                <ul>
                                    <h4>Support</h4>
                                    <li><Link to='/about'>About Us</Link></li>
                                    <li><Link to='/contact  '>Contact Us</Link></li>
                                    <li><Link to='/faq'>FAQ’s</Link></li>
                                    <li><Link to='/terms'>Terms & Conditions</Link></li>
                                    <li><Link to='/privacy'>Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-center d-lg-none'>
                        <Link to={'https://www.facebook.com/'}><div className='s_footer_icon'><GrFacebookOption /></div></Link>
                        {/* <Link to={'www.facebook.com'}> <div className='s_footer_icon'><GrTwitter /></div></Link> */}
                        <Link to={'https://x.com/'}>  <div className='s_footer_icon'><FaXTwitter /></div></Link>
                        <Link to={'https://www.instagram.com/'}> <div className='s_footer_icon'><PiInstagramLogoFill /></div></Link>
                    </div>
                </section>
                <section className="s_footer_last border-top">
                    <p>copyright 2024 ASK Project</p>
                </section>
            </section>

            {/* login modal component */}
            <Login isOpen={showLogin} onClose={() => handleLoginClose()} onOpen={() => handleLoginShow()}>
            </Login>
        </>
    )
}
export default Footer;