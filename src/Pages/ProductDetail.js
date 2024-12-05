import '../Css/Sujal/ProductDetail.css'
import { Accordion, Col, Nav, Row } from "react-bootstrap";
import video from '../Img/Sujal/ringvideo.mp4'
import { useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { GoHeart } from 'react-icons/go';
import { FaAngleDown, FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function ProductDetail() {


    // video handdler
    const [controlsVisible, setControlsVisible] = useState(false);
    const videoRef = useRef(null);
    const handlePlayClick = () => {
        setControlsVisible(true); // Show controls
        if (videoRef.current) {
            videoRef.current.play(); // Start playing the video
        }
    };
    const handleStopclick = () => {
        setControlsVisible(false); // Hide controls
        if (videoRef.current) {
            videoRef.current.pause(); // Pause the video
        }
    }


    //  size handler 

    const [size, setSize] = useState(5);

    const sizeData = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    return (
        <>
            <section className="s_prodetail_page ds_container">
                <Row lg={2} className='gx-0 gx-md-4 py-4'>
                    <Col>
                        <div className="s_product_img d-flex flex-wrap">
                            <img src={require('../Img/Sujal/p_ring1.png')} alt="ring1"></img>
                            <img src={require('../Img/Sujal/p_ring2.png')} alt="ring1"></img>
                            <img src={require('../Img/Sujal/p_ring3.png')} alt="ring1"></img>
                            <div className='s_product_video'
                                onMouseLeave={handleStopclick}>
                                <video ref={videoRef}
                                    controls={controlsVisible} muted>
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {!controlsVisible && (
                                    <img
                                        src={require("../Img/Sujal/play.png")}
                                        alt="play"
                                        onClick={handlePlayClick}
                                    />
                                )}
                            </div>
                        </div>

                        <div className='s_product_slider'>
                            <OwlCarousel className='owl-theme' loop margin={20} nav responsive={{
                                0: {
                                    items: 4,
                                },
                                576: {
                                    items: 6,
                                },
                            }}>
                                <div className='item'>
                                    <img src={require('../Img/Sujal/p_ring1.png')} alt="ring1"></img>

                                </div>
                                <div className='item'>
                                    <img src={require('../Img/Sujal/p_ring2.png')} alt="ring1"></img>

                                </div>
                                <div className='item'>
                                    <img src={require('../Img/Sujal/p_ring3.png')} alt="ring1"></img>
                                </div>

                            </OwlCarousel>
                        </div>
                    </Col>
                    <Col>
                        <div className='s_productdetail_sec'>
                            <div className='d-flex justify-content-end s_share_icon'>
                                <GoHeart />
                                <FaShareAlt />
                            </div>
                            <h3 className='s_title'>Dual Tone Halo Diamond Finger Ring</h3>
                            <div className='s_rating'>
                                {
                                    [...Array(5)].map((_, index) => {
                                        if (index < 3) {
                                            return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                        } else {
                                            return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                            ;
                                        }
                                    })
                                }
                            </div>
                            <h2 className='s_price'>₹141268.00</h2>
                            <p className='s_description'>Make a statement with this 18 Karat white and rose gold Finger Ring, featuring a dazzling central Diamond surrounded by two halos of real Diamonds.
                                Perfect for engagements or special occasions, this real Diamond Finger Ring brings together modern sophistication and classic charm, making it a truly memorable piece</p>

                            <div className='s_metal_option d-flex justify-content-between'>
                                <div>
                                    <h5>Metal Color</h5>
                                    <Nav variant="pills" defaultActiveKey="link-0">
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-0">
                                                <div className='s_color' style={{ background: '#F1C3A6' }}></div>
                                                Rose</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1">
                                                <div className='s_color' style={{ background: '#EDCD90' }}></div>
                                                Gold
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div>
                                    <h5>Metal</h5>
                                    <Nav variant="pills" defaultActiveKey="link-0">
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-0">14 K Gold</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1">18 K Gold</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            <div className='d-flex s_size'>
                                <div>
                                    <h4>Size</h4>
                                    <div className='s_box d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'>{size}</p>
                                        <FaAngleDown className='ms-auto' />
                                        <div className='s_size_menu'>
                                            {sizeData.map((item) => {
                                                return <div className={`s_size_box ${item === size ? 'active' : ''}`} onClick={() => { setSize(item) }}>{item}</div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Diamond Quality</h4>
                                    <div className='s_box d-flex  align-items-center'>
                                        <span>FG - VVS - VS</span>
                                    </div>
                                </div>
                            </div>
                            <div className='s_pincode'>
                                <h4>Pincode</h4>
                                <div className='s_box'>
                                    <input type='text' placeholder='Enter pincode'></input>
                                    <span>Check</span>
                                </div>
                            </div>
                            <div className='s_offers'>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Trending Offers</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='d-flex align-items-center'>
                                                <img src={require('../Img/Sujal/discount.png')} alt='discount'/>
                                                <div>
                                                    <p className='mb-0'>Get flat 12% discount</p>
                                                    <span>On your first order with us as new customer</span>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className='s_button_sec '>
                                <div className='s_cart_btn'>
                                    <Link to={'#'}>Add to cart</Link>
                                </div>
                                <div className='s_buy_btn'>
                                    <Link to={'#'}>Buy Now</Link>
                                </div>
                            </div>
                            <div className='s_product_service'>
                                <div className='s_box'>
                                    <img src={require('../Img/Sujal/service1.png')} alt='service1'></img>
                                    <span>Dispatch in 2 days</span>
                                </div>
                                <div className='s_box'>
                                    <img src={require('../Img/Sujal/service2.png')} alt='service2'></img>
                                    <span>Easy Return</span>
                                </div>
                                <div className='s_box'>
                                    <img src={require('../Img/Sujal/service3.png')} alt='service3'></img>
                                    <span>Support 24*7</span>
                                </div>
                                <div className='s_box'>
                                    <img src={require('../Img/Sujal/service4.png')} alt='service4'></img>
                                    <span>Best Quality</span>
                                </div>
                            </div>
                            <div className='s_other_info'>
                                <p>* Additional 5 - 6 business days is required for delivery.</p>
                                <p>* For Plus Size Extra 5 - 10 business days is required for delivery.</p>
                            </div>
                        </div>
                    </Col>
                </Row>


                <div className='s_other_sec'>
                    <Nav justify variant="tabs" defaultActiveKey="link-0"  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
                        <Nav.Item>
                            <Nav.Link eventKey="link-0">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </section>
        </>
    )
}
export default ProductDetail;