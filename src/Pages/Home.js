import '../Css/Sujal/Home.css';
import React, { useContext, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slider1 from '../Img/Sujal/slider1.png';
import slider2 from '../Img/Sujal/slider2.png';
import slider3 from '../Img/Sujal/slider3.png';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import es_card1 from '../Img/Sujal/platinum.png';
import es_card2 from '../Img/Sujal/design.png';
import es_card3 from '../Img/Sujal/jewel.png';
import noteContext from '../Context/noteContext';
import fillstar from '../Img/Sujal/fillStar.png';
import halfstar from '../Img/Sujal/halfstar.png';
import nofillstar from '../Img/Sujal/nofillstar.png';
function Home() {
    const navigate = useNavigate();
    // backend connection code----------------------------------

    // useContext //
    const { allCategory, allProduct, addwishlistHandler, wishlistID, findWishlistID, bestseller } = useContext(noteContext);


    // cat slideer responsive
    const cat_sliderres = {
        0: { items: 1 },
        376: { items: 2 },
        600: { items: 3 },
        1024: { items: 4 },
        1200: { items: 5 },
        1440: { items: 6 },
        1640: { items: 7 },
    }


    // feature slideer responsive
    const feature_sliderres = {

        0: { items: 1 },
        376: { items: 1 },
        600: { items: 3 },
        1024: { items: 2 },
        1200: { items: 3 },
        1600: { items: 4 },
    }


    // heart and wishlist  handler
    const [loadingItems, setLoadingItems] = useState([]);
    const handleAddToWishlist = (itemId) => {
        setLoadingItems([...loadingItems, itemId]);
        addwishlistHandler(itemId)
        setTimeout(() => {
            setLoadingItems((prev) => prev.filter((loadingItem) => loadingItem !== itemId));
        }, 2000);
    };
    const handleFindWishlistID = (itemId) => {
        setLoadingItems((prev) => [...prev, itemId]);
        findWishlistID(itemId)
        setTimeout(() => {
            setLoadingItems((prev) => prev.filter((loadingItem) => loadingItem !== itemId));
        }, 2000);
    };


    // best seller card  responsive handler 
    const [itemsToShow, setItemsToShow] = useState(5); // Default to 5 items

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1919) {
                setItemsToShow(12);
            } else if (window.innerWidth > 1399) {
                setItemsToShow(10);
            } else if (window.innerWidth > 991) {
                setItemsToShow(8);
            } else if (window.innerWidth > 767) {
                setItemsToShow(6);
            } else if (window.innerWidth > 556) {
                setItemsToShow(4);
            } else {
                setItemsToShow(6);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    // backend conection code over----------------------------------------------------------------
    return (


        <>
            <section className='s_slider'>
                <OwlCarousel className='owl-theme' items={1} margin={0} loop >
                    <div className='item' style={{ backgroundImage: `url(${slider1})` }}>
                        <div className='s_slider_detail ds_container'>
                            <div className='s_slider_text'>
                                <p>UNIQUE</p>
                                <p>AND AUTHENTIC</p>
                                <p>VINTAGE DESIGNER</p>
                                <p>JEWELLERY</p>
                                <p className='s_slider_description mb-0'>Discover the timeless beauty of  jewellery</p>
                                <br />
                                <div className='s_slider_btn'>
                                    <Link to={`/productlist/all/null`}>View Collection</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item' style={{ backgroundImage: `url(${slider2})` }}>
                        <div className='s_slider_detail ds_container'>
                            <div className='s_slider_text'>
                                <p>Jewellery that</p>
                                <p>as beautiful as </p>
                                <p>you are</p>
                                <p></p>
                                <p className='s_slider_description mb-0'>Elevate Your Style with our collection</p>
                                <br />
                                <div className='s_slider_btn'>
                                    <Link to={`/productlist/all/null`}>View Collection</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item' style={{ backgroundImage: `url(${slider3})` }}>
                        <div className='s_slider_detail ds_container'>
                            <div className='s_slider_text'>
                                <p>The Sparkle of
                                </p>
                                <p>Your Dreams</p>

                                <p className='s_slider_description mb-0'>Pure Elegance, Pure Diamonds</p>
                                <br />
                                <div className='s_slider_btn'>
                                    <Link to={`/productlist/all/null`}>View Collection</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </section>
            <section className='s_catseller_sec'>
                <section className='s_cat_sec'>
                    <div className='s_cat_head'>
                        <p className='mb-2'>DISCOVER ALL TRENDS</p>
                        <h2>Shop by category</h2>
                    </div>
                    <div className='s_cat_slider'>
                        <OwlCarousel className='owl-theme' loop margin={10} items={7} nav={true} responsive={cat_sliderres} dots={false} autoplay autoplayTimeout={3000} autoplayHoverPause>
                            {allCategory.map((ele, id) => {
                                return (
                                    <Link className='item' key={id} to={`/productlist/category/${ele.name}`}>
                                        <img src={ele.image} alt=''></img>
                                        <h4>{ele.name}</h4>
                                    </Link>
                                )
                            })}
                        </OwlCarousel>
                    </div>
                </section>
                <section className='s_seller_sec ds_container'>
                    <div className='s_cat_head'>
                        <p className='mb-2'>Explore our most loved products</p>
                        <h2>The Best Sellers</h2>
                    </div>
                    <Row xxl={5} lg={4} md={3} sm={2} className='s_seller_cards s_seller_spe_cards row-cols-1 gx-2 gx-sm-3'>
                        {
                            bestseller.slice(0, itemsToShow).map((ele, id) => {
                                var isSelected = wishlistID.find((items) => items === ele.id);
                                const discounted = ((parseFloat(ele.price_with_gst) * parseFloat(ele.discount)) / 100).toFixed(2);
                                let discountPrice = [];
                                if (!isNaN(parseFloat(discounted))) {
                                    discountPrice = (parseFloat(ele.price_with_gst) + parseFloat(discounted)).toFixed(0);
                                } else {
                                    discountPrice = ele.price_with_gst;
                                }
                                return (
                                    <Col key={id} className='py-4' >
                                        <div className='s_seller_card'>

                                            <div className='s_card_img bg-white'>
                                                <img src={ele.images?.[0]} className="w-100 bg-white" alt={ele.title} key={ele.title} />
                                            </div>
                                            {loadingItems.includes(ele.id) ? (
                                                <div className="loading s_heart_icon">
                                                    <svg height="24px" width="32px"> {/* Adjusted height and width */}
                                                        <polyline
                                                            id="back"
                                                            points="0.157 11.977, 14 11.977, 21.843 24, 43 0, 50 12, 64 12"
                                                        ></polyline>
                                                        <polyline
                                                            id="front"
                                                            points="0.157 11.977, 14 11.977, 21.843 24, 43 0, 50 12, 64 12"
                                                        ></polyline>
                                                    </svg>
                                                </div>
                                            ) : isSelected ? (
                                                <div className="s_heart_icon active"
                                                    onClick={() => {
                                                        handleFindWishlistID(ele.id)
                                                        // Pass the item's ID to findWishlistID
                                                    }}
                                                >
                                                    <GoHeartFill />
                                                </div>
                                            ) : (
                                                <div
                                                    className="s_heart_icon"
                                                    onClick={() => {
                                                        // Add to wishlist
                                                        handleAddToWishlist(ele.id) // Trigger the loader and toggle liked state
                                                    }}
                                                >
                                                    <GoHeart />
                                                </div>
                                            )}
                                            <div className='s_card_text' >
                                                <Link to={`/productdetail/${ele.id}`}>
                                                    <h5>{ele.product_name}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹ {parseFloat(ele.price_with_gst).toFixed(0)}</span><strike className="mx-2">₹ {discountPrice}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                const rating = ele.total_rating;
                                                                if (index < Math.floor(rating)) {
                                                                    return <img alt={index} src={fillstar} />;
                                                                } else if (index < rating) {

                                                                    return <img alt={index} src={halfstar} />;
                                                                } else {

                                                                    return <img alt={index} src={nofillstar} />;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                    <div className='s_card_btn'><p className=''>Buy Now</p></div>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section >
            </section >
            <section className='s_elegance_sec'>
                <div className='ds_container row'>
                    <div className='s_elegance_con col-xl-10 col-12 mx-auto'>
                        <h2 className='s_elegance_head'>Style & Elegance</h2>
                        <Row className='align-items-center pt-5' >
                            <Col lg={6} md={6}>
                                <img src={require('../Img/Sujal/elegance_img.png')} className='w-100' alt='elegance'></img>
                            </Col>
                            <Col xxl={4} lg={6} md={6}>
                                <div className='s_elegance_text'>
                                    <h4>Charmed By The Style</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                    <div className='s_elegance_btn'>
                                        <Link to={`/productlist/all/null`}>Shop Now</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
            <section className='s_essential_sec'>
                <div className='ds_container s_seller_sec'>
                    <div className='s_cat_head'>
                        <p className='mb-2'>Celebrate your day with our collection</p>
                        <h2>Essentials For You</h2>
                    </div>
                    <Row className='row-cols-1 gx-0 gx-sm-4' lg={4} sm={2}>
                        <Col className='position-relative py-5' >
                            <Link to={`/productlist/occasion/Bridal Wear`} className='s_es_card text-dark'>
                                <img src={require('../Img/Sujal/weddingwear.png')} alt='wedding wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Bridal Wear</h4>
                                        <p>Traditional attire</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col className='position-relative py-5'>
                            <Link to={`/productlist/occasion/Traditional`} className='s_es_card text-dark'>
                                <img src={require('../Img/Sujal/partywear.png')} alt='party wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Traditional Wear</h4>
                                        <p>Glamorous Look</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col className='position-relative py-5'>
                            <Link to={`/productlist/occasion/Office Wear`} className='s_es_card text-dark'>
                                <img src={require('../Img/Sujal/officewear.png')} alt='office wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Office Wear</h4>
                                        <p>Professional Look</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col className='position-relative py-5'>
                            <Link to={`/productlist/occasion/Modern wear`} className='s_es_card text-dark'>
                                <img src={require('../Img/Sujal/everydaywear.png')} alt='everyday wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Modern Wear</h4>
                                        <p>Casual Comfort</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row className='py-5 gx-0 gx-sm-3' >
                        <Col lg={4} sm={12}>
                            <div to={`/productlist/search/ring`} className='s_card d-flex align-items-center' >
                                <img src={es_card1} className='w-100' alt='card1'></img>
                                <div>
                                    <div>
                                        <h3>Alluring</h3>
                                        <h1>Platinum</h1>
                                    </div>
                                    <p className='text-white'>SIMPLEM& ELEGANT</p>
                                    <small className='text-white'>Design starts from $120</small>
                                    <div className='s_card_btn'>
                                        <Link to={'/productlist/search/Ring'}>Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} sm={12}>
                            <div className='s_card d-flex align-items-center' >
                                <img src={es_card2} className='w-100' alt='card2'></img>
                                <div>
                                    <div>
                                        <h3 className='text-white'>Luminous</h3>
                                        <h1>Design</h1>
                                    </div>
                                    <p className='text-white'>GIRLS DIAMOND CHAINS</p>
                                    <small className='text-white'>Design starts from $120</small>
                                    <div className='s_card_btn'>
                                        <Link to={'/productlist/search/Pendent'} >Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} sm={12} className=''>
                            <div className='s_card d-flex align-items-center s_card1' >
                                <img src={es_card3} className='w-100' alt='card3'></img>
                                <div>
                                    <div>
                                        <h3>Enchanting</h3>
                                        <h1>Jewels</h1>
                                    </div>
                                    <p className='text-white'>GORGEOUS ROSE GOLD</p>
                                    <small className='text-white'>Design starts from $120</small>
                                    <div className='s_card_btn'>
                                        <Link to={'/productlist/search/Bracelet'}>Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className='s_feature_sec'>
                <div className='row d-flex justify-content-between gx-0'>
                    <div className='col-lg-8 s_feature_slider '>
                        <div className="s_feature_bgtxt ">FEATURED PRODUCTS</div>
                        <div className='s_cat_slider w-100 pt-0' >
                            <OwlCarousel className='owl-theme' loop margin={20} items={4} nav={true} dots={false}
                                responsive={
                                    feature_sliderres
                                }>
                                {allProduct.slice(0, 5).map((item, idx) => {
                                    const discounted = ((parseFloat(item.price_with_gst) * parseFloat(item.discount)) / 100).toFixed(2);
                                    let discountPrice = [];
                                    if (!isNaN(parseFloat(discounted))) {
                                        discountPrice = (parseFloat(item.price_with_gst) + parseFloat(discounted)).toFixed(0);
                                    } else {
                                        discountPrice = item.price_with_gst;
                                    }
                                    return (
                                        <div className='item bg-white' key={idx}  onClick={()=>{navigate(`/productdetail/${item.id}`)}}>
                                            <div className='shadow'>
                                                <img src={item.images[0]} className='w-100' alt={`image${idx}`}></img>
                                                <div className='s_slider_text '>
                                                    <Link to={`/productdetail/${item.id}`}>
                                                        <h5 className='text-capitalize'>{item.product_name}</h5>
                                                        <p className='mb-0'><span className='mx-2'>₹ {parseFloat(item.price_with_gst).toFixed(0)}</span><strike className="mx-2">₹ {discountPrice}</strike></p>
                                                        <div className='s_rating'>
                                                            {
                                                                [...Array(5)].map((_, index) => {
                                                                    const rating = item.total_rating;
                                                                    if (index < Math.floor(rating)) {
                                                                        return <img alt={index} src={fillstar} />;
                                                                    } else if (index < rating) {

                                                                        return <img alt={index} src={halfstar} />;
                                                                    } else {

                                                                        return <img alt={index} src={nofillstar} />;
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                        <div className='s_card_btn'><p className=''>Buy Now</p></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className='col-lg-4 s_feature_img d-none d-lg-block'>
                        <img src={require('../Img/Sujal/featureimg.png')} alt='feature Img' className=''></img>
                    </div>
                </div>
            </section>
            <section className='s_service_sec'>
                <div className='ds_container'>
                    <div className='s_cat_head'>
                        <p className='mb-2'>Your satisfaction is our mission</p>
                        <h2>Our Services</h2>
                    </div>
                    <Row lg={3} md={2} className='justify-content-center row-cols-1 gx-0 gx-md-4'>
                        <Col>
                            <div className='s_service_box d-flex justify-content-between align-items-center'>
                                <img src={require('../Img/Sujal/shipping.png')} alt='Shipping'></img>
                                <div>
                                    <h4>Shipping</h4>
                                    <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='s_service_box d-flex justify-content-between align-items-center'>
                                <img src={require('../Img/Sujal/money-back.png')} alt='Money-Back'></img>
                                <div>
                                    <h4>15 Day Money-Back</h4>
                                    <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='s_service_box d-flex justify-content-between align-items-center'>
                                <img src={require('../Img/Sujal/hallmarks.png')} alt='BIS Hallmarked'></img>
                                <div>
                                    <h4>BIS Hallmarked</h4>
                                    <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='s_service_box d-flex justify-content-between align-items-center'>
                                <img src={require('../Img/Sujal/warranty.png')} alt='Warranty'></img>
                                <div>
                                    <h4>One Year Warranty</h4>
                                    <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='s_service_box d-flex justify-content-between align-items-center'>
                                <img src={require('../Img/Sujal/certified.png')} alt='Certified'></img>
                                <div>
                                    <h4>100% Certified</h4>
                                    <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* don't remove below code its important */}

            {/* <section className='s_news_sec'>
                <div className='s_news_detail'>
                    <p>NEWSLETTER</p>
                    <h2>Subscribe And Get</h2>
                    <h2>10% Off On Your First Order</h2>
                    <p>Keep up with our latest news and Sales.</p>
                    <div className='s_news_search d-flex justify-content-between'>
                        <input type='text' placeholder='Enter Email Address'></input>
                        <div className='s_news_btn'>
                            <Link>Subscribe</Link>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}
export default Home;