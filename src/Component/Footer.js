import { Col, Row } from 'react-bootstrap';
import '../Css/Sujal/Footer.css';
import { GrFacebookOption, GrTwitter } from 'react-icons/gr';
import { FaXTwitter } from 'react-icons/fa6';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <section className="s_footer_sec">
                <section className="s_footer_main ds_container h-100 align-self-center">
                    <Row className='align-items-center h-100 gx-0'>
                        <Col  lg={5} xl={6} gx={0} >
                            <h4 className='s_logo'>Logo</h4>
                            <p className='s_logo_des'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                            <div className='   d-none d-lg-flex'>
                                <div className='s_footer_icon'><Link to='#'></Link><GrFacebookOption /></div>
                                <div className='s_footer_icon'><GrTwitter /></div>
                                <div className='s_footer_icon'><FaXTwitter /></div>
                                <div className='s_footer_icon'><PiInstagramLogoFill /></div>
                            </div>
                        </Col>
                        <Col lg={7} xl={6}>
                            <div className='s_footer_right pt-5 pt-lg-0'>
                                <ul>
                                    <h4>Top Category</h4>
                                    <li><Link to='#'>Gold</Link></li>
                                    <li><Link to='#'>Silver</Link></li>
                                    <li><Link to='#'>Dimond</Link></li>
                                    <li><Link to='#'>Platinum</Link></li>
                                    <li><Link to='#'>Gold Coins</Link></li>
                                </ul>
                                <ul>
                                    <h4>Customer Services</h4>
                                    <li><Link to='#'>Offers</Link></li>
                                    <li><Link to='#'>Track your order</Link></li>
                                    <li><Link to='#'>Shipping & Returns</Link></li>
                                </ul>
                                <ul>
                                    <h4>Support</h4>
                                    <li><Link to='#'>About Us</Link></li>
                                    <li><Link to='#'>Contact Us</Link></li>
                                    <li><Link to='#'>FAQ’s</Link></li>
                                    <li><Link to='#'>Terms & Conditions</Link></li>
                                    <li><Link to='#'>Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <div className='   d-flex justify-content-center d-lg-none'>
                                <div className='s_footer_icon'><Link to='#'></Link><GrFacebookOption /></div>
                                <div className='s_footer_icon'><GrTwitter /></div>
                                <div className='s_footer_icon'><FaXTwitter /></div>
                                <div className='s_footer_icon'><PiInstagramLogoFill /></div>
                            </div>
                </section>
                <section className="s_footer_last border-top">
                    <p>copyright 2024 ASK Project</p>
                </section>
            </section>
        </>
    )
}
export default Footer;