import '../Css/Sujal/ProductDetail.css'
import { Accordion, Col, Modal, Nav, Row } from "react-bootstrap";
import video from '../Img/Sujal/ringvideo.mp4'
import { useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { GoHeart } from 'react-icons/go';
import { FaAngleDown, FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import wishlist1 from '../Img/Sujal/wishlist1.png';
import wishlist2 from '../Img/Sujal/wishlist2.png';
import wishlist3 from '../Img/Sujal/wishlist3.png';
import watch1 from '../Img/Sujal/w1.png';
import watch2 from '../Img/Sujal/w2.png';
import watch3 from '../Img/Sujal/w3.png';
import watch4 from '../Img/Sujal/w4.png';
import watch5 from '../Img/Sujal/w5.png';
function ProductDetail() {
    const inStock = true;
    const category = '';


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


    // other detail nav-tabe handller {}

    const [tab, setTab] = useState('tab-0');

    // review modal handller 
    const [lgShow, setLgShow] = useState(false);

    let detail= []
    // you also like product
    if(category !=='Watch'){
        detail = [
            { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
            { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
            { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
            { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
            { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        ]
    }
    else {
        detail=[
            { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: watch1 },
            { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: watch2 },
            { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: watch3 },
            { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: watch4 },
            { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: watch5 },
        ]
    }

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
                            <div className='d-flex align-items-center'>
                            <h2 className='s_price'>₹141268.00</h2>
                            {inStock !== true ? <div className='s_stock_status'>out of stack</div> : ''}
                            
                            </div>
                            <p className='s_description'>Make a statement with this 18 Karat white and rose gold Finger Ring, featuring a dazzling central Diamond surrounded by two halos of real Diamonds.
                                Perfect for engagements or special occasions, this real Diamond Finger Ring brings together modern sophistication and classic charm, making it a truly memorable piece</p>

                            {category !== 'Watch' ? <>
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

                            </> :

                                ''}

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
                                                <img src={require('../Img/Sujal/discount.png')} alt='discount' />
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




                <div className='s_other_sec '>
                    <div className='overflow-x-auto'>
                        <Nav justify className='' variant="tabs" defaultActiveKey="tab-0" onSelect={(selectedKey) => { setTab(selectedKey) }}>
                            <Nav.Item>
                                <Nav.Link eventKey="tab-0">Product Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab-1">Price Breakup</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab-2">Rating & Reviews</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>


                    <div className={`s_table_sec d-lg-flex  px-0 ${tab === 'tab-0' ? '' : 'd-none d-lg-none'}`}>
                        {category !== 'Watch' ? <>

                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Metal Details</h4>
                                <span className='d-flex justify-content-between'><p>Metal Type</p><b>Silver</b></span>
                                <span className='d-flex justify-content-between'><p>Karat</p><b>18 K</b></span>
                                <span className='d-flex justify-content-between'><p>Weight</p><b>3.812 Gm</b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>White</b></span>
                            </div>
                            <div className='s_table s_w_40'>
                                <h4 className='s_table_head'>Diamond Details</h4>
                                <span className='d-flex justify-content-between'><p>Clarity</p><b>VS</b></span>
                                <span className='d-flex justify-content-between'><p>Setting</p><b>Pressure, Free, Prong</b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>G-H</b></span>
                                <span className='d-flex justify-content-between'><p>Shape</p><b>Round</b></span>
                                <span className='d-flex justify-content-between'><p>No. of Diamonds</p><b>17</b></span>
                            </div>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>General Details</h4>
                                <span className='d-flex justify-content-between'><p>Jewellry Type</p><b>Diamond</b></span>
                                <span className='d-flex justify-content-between'><p>Gender</p><b>Women</b></span>
                                <span className='d-flex justify-content-between'><p>Collection</p><b>Best Seller</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>Engagement</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>5</b></span>
                            </div>
                        </> : <>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Case</h4>
                                <span className='d-flex justify-content-between'><p>Size</p><b>29mm</b></span>
                                <span className='d-flex justify-content-between'><p>Water Resistant</p><b>50 Meters</b></span>
                                <span className='d-flex justify-content-between'><p>Case Material</p><b> Stainless Steel</b></span>
                                <span className='d-flex justify-content-between'><p>Dial Color</p><b>Silver</b></span>
                            </div>
                            <div className='s_table s_w_40'>
                                <h4 className='s_table_head'>Movement</h4>
                                <span className='d-flex justify-content-between'><p>Movement</p><b>Automatic</b></span>
                                <span className='d-flex justify-content-between'><p>Clasp Type</p><b>Butterfly Clasp With Push Buttons</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>Engagement</b></span>
                            </div>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Warranty</h4>
                                <span className='d-flex justify-content-between'><p>Reference Number</p><b>CBL2182.FT6235</b></span>
                                <span className='d-flex justify-content-between'><p>Warranty</p><b> 2 Years Manufacturer Warranty</b></span>
                            </div>
                        </>}

                    </div>
                    <div className={` overflow-x-auto s_table_sec d-lg-flex ${tab === 'tab-1' ? '' : 'd-none d-lg-none'}`}>
                        <table className=''>
                            <thead>
                                <tr>
                                    <th scope='col'>Product Details</th>
                                    <th scope='col'>Rate</th>
                                    <th scope='col'>Weight</th>
                                    <th scope='col'>Discount</th>
                                    <th scope='col'>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Silver 18K</td>
                                    <td>₹1200.06</td>
                                    <td>3.450 g</td>
                                    <td>-</td>
                                    <td>₹20308</td>
                                </tr>
                                <tr>
                                    <td>Stone</td>
                                    <td>-</td>
                                    <td>0.116 ct/ 0.023g</td>
                                    <td>-</td>
                                    <td>₹12503</td>
                                </tr>
                                <tr>
                                    <td>Making Charges</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>₹6891</td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>-</td>
                                    <td>3.473 g</td>
                                    <td>-</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>3.473 g</td>
                                    <td>-</td>
                                    <td>3.473 g</td>
                                    <td>-</td>
                                    <td>₹1191.71</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='4'>Grand Total</td>
                                    <td>₹141268</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className={` ${tab === 'tab-2' ? '' : 'd-none d-lg-none'}`}>
                        <div className='s_review'>
                            <div className='d-flex s_review_div'>
                                <div className='s_review_profile'>
                                    <p className='mb-0'>NL</p>
                                </div>
                                <div className='s_review_detail'>
                                    <p className='mb-0'>Nathon Lyon</p>
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
                                        <p className='mb-0'>Great Product</p>
                                        <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                        <div className='s_review_img'>
                                            <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                        </div>
                                    </div>
                                    <div className='s_review_icon d-flex'>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineLike />
                                            <span>Like</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineDislike />
                                            <span>Dislike</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex s_review_div'>
                                <div className='s_review_profile'>
                                    <p className='mb-0'>NL</p>
                                </div>
                                <div className='s_review_detail'>
                                    <p className='mb-0'>Nathon Lyon</p>
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
                                        <p className='mb-0'>Great Product</p>
                                        <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                        <div className='s_review_img'>
                                            <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                        </div>
                                    </div>
                                    <div className='s_review_icon d-flex'>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineLike />
                                            <span>Like</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineDislike />
                                            <span>Dislike</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex s_review_div'>
                                <div className='s_review_profile'>
                                    <p className='mb-0'>NL</p>
                                </div>
                                <div className='s_review_detail'>
                                    <p className='mb-0'>Nathon Lyon</p>
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
                                        <p className='mb-0'>Great Product</p>
                                        <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                        <div className='s_review_img'>
                                            <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                        </div>
                                    </div>
                                    <div className='s_review_icon d-flex'>
                                        <div className="d-flex align-items-center me-4">
                                            <AiFillLike />
                                            <span>Like</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineDislike />
                                            <span>Dislike</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex s_review_div'>
                                <div className='s_review_profile'>
                                    <p className='mb-0'>NL</p>
                                </div>
                                <div className='s_review_detail'>
                                    <p className='mb-0'>Nathon Lyon</p>
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
                                        <p className='mb-0'>Great Product</p>
                                        <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                        <div className='s_review_img'>
                                            <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                            <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                        </div>
                                    </div>
                                    <div className='s_review_icon d-flex'>
                                        <div className="d-flex align-items-center me-4">
                                            <AiOutlineLike />
                                            <span>Like</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <AiFillDislike />
                                            <span>Dislike</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='s_view_all' onClick={() => setLgShow(true)}>
                            <Link>View All</Link>
                        </div>
                    </div>
                </div>
                <div className='s_also_like'>
                    <div className='d-flex justify-content-between'>
                        <h2>You may also like</h2>
                        <Link>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={4} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                            {
                                detail.map((ele, id) => {
                                    return (
                                        <Col key={id} className='py-4 '>
                                            <Link to={'/productdetail'} className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele.img} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>

                                                {ele.status ?
                                                    <div className='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                    : ''}
                                                <div className='s_card_text'>
                                                    <h5>{ele.title}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike className="mx-2">₹{ele.old_price}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                if (index < ele.rating) {
                                                                    return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                                } else {
                                                                    return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                                    ;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </div>
                </div>
                <div className='s_also_like'>
                    <div className='d-flex justify-content-between'>
                        <h2>People also search for</h2>
                        <Link>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={4} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                            {
                                detail.map((ele, id) => {
                                    return (
                                        <Col key={id} className='py-4'>
                                            <Link to={'/productdetail'} className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele.img} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>

                                                {ele.status ?
                                                    <div className='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                    : ''}
                                                <div className='s_card_text'>
                                                    <h5>{ele.title}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike className="mx-2">₹{ele.old_price}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                if (index < ele.rating) {
                                                                    return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                                } else {
                                                                    return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                                    ;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </div>
                </div>
            </section>


            {/* reveiw and feedback modal  */}
            <Modal
                className='s_review_modal'
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title id="" className='w-100 text-center'>
                        All Reviews
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='s_review'>
                        <div className='d-flex s_review_div'>
                            <div className='s_review_profile'>
                                <p className='mb-0'>NL</p>
                            </div>
                            <div className='s_review_detail'>
                                <p className='mb-0'>Nathon Lyon</p>
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
                                    <p className='mb-0'>Great Product</p>
                                    <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                    <div className='s_review_img'>
                                        <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                    </div>
                                </div>
                                <div className='s_review_icon d-flex'>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineLike />
                                        <span>Like</span>
                                    </div>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineDislike />
                                        <span>Dislike</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex s_review_div'>
                            <div className='s_review_profile'>
                                <p className='mb-0'>NL</p>
                            </div>
                            <div className='s_review_detail'>
                                <p className='mb-0'>Nathon Lyon</p>
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
                                    <p className='mb-0'>Great Product</p>
                                    <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                    <div className='s_review_img'>
                                        <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                    </div>
                                </div>
                                <div className='s_review_icon d-flex'>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineLike />
                                        <span>Like</span>
                                    </div>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineDislike />
                                        <span>Dislike</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex s_review_div'>
                            <div className='s_review_profile'>
                                <p className='mb-0'>NL</p>
                            </div>
                            <div className='s_review_detail'>
                                <p className='mb-0'>Nathon Lyon</p>
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
                                    <p className='mb-0'>Great Product</p>
                                    <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                    <div className='s_review_img'>
                                        <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                    </div>
                                </div>
                                <div className='s_review_icon d-flex'>
                                    <div className="d-flex align-items-center me-4">
                                        <AiFillLike />
                                        <span>Like</span>
                                    </div>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineDislike />
                                        <span>Dislike</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex s_review_div'>
                            <div className='s_review_profile'>
                                <p className='mb-0'>NL</p>
                            </div>
                            <div className='s_review_detail'>
                                <p className='mb-0'>Nathon Lyon</p>
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
                                    <p className='mb-0'>Great Product</p>
                                    <span>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</span>
                                    <div className='s_review_img'>
                                        <img src={require('../Img/Sujal/p_ring1.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring2.png')} alt='review 1'></img>
                                        <img src={require('../Img/Sujal/p_ring3.png')} alt='review 1'></img>
                                    </div>
                                </div>
                                <div className='s_review_icon d-flex'>
                                    <div className="d-flex align-items-center me-4">
                                        <AiOutlineLike />
                                        <span>Like</span>
                                    </div>
                                    <div className="d-flex align-items-center me-4">
                                        <AiFillDislike />
                                        <span>Dislike</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ProductDetail;