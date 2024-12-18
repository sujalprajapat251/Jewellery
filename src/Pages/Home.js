import '../Css/Sujal/Home.css';
import React, { useContext, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slider1 from '../Img/Sujal/slider1.png';
import slider2 from '../Img/Sujal/slider2.png';
import slider3 from '../Img/Sujal/slider3.png';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import es_card1 from '../Img/Sujal/platinum.png';
import es_card2 from '../Img/Sujal/design.png';
import es_card3 from '../Img/Sujal/jewel.png';
import noteContext from '../Context/noteContext';

function Home() {
    // backend connection code
    const { allCategory , allProduct , addwishlistHandler , wishlistID , removeWishlistHandler } = useContext(noteContext);

    // cat slideer responsive
    const cat_sliderres = {
        0: { items: 1 },
        376: { items: 2 },
        600: { items: 3 },
        1024: { items: 4 },
        1200: { items: 5 },
        1440: { items: 7 },
    }

    // feature slideer responsive
    const feature_sliderres = {

        0: { items: 1 },
        376: { items: 2 },
        600: { items: 3 },
        1024: { items: 3 },
        1200: { items: 3 },
        1440: { items: 4 },
    }

    // card detail slideer responsive
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const data = allProduct.filter((product) => product?.collection === 'best seller')
        // console.log(data)
        setBestSeller(data);
    }, [allProduct]);
    // const card_detail = [
    //     { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: seller1 },
    //     { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: seller2 },
    //     { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: seller3 },
    //     { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: seller4 },
    //     { title: 'Dimond Set', price: '1200', old_price: '1500', rating: 1, img: seller5 },
    //     { title: 'Dimond Earring', price: '1200', old_price: '1500', rating: 5, img: seller6 },
    //     { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, img: seller7 },
    //     { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 1, img: seller8 },
    //     { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: seller9 },
    //     { title: 'Dimond Set', price: '1200', old_price: '1500', rating: 5, img: seller10 },
    //     { title: 'Dimond Earring', price: '1200', old_price: '1500', rating: 2, img: seller11 },
    //     { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 1, img: seller12 },
    // ]
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
                                    <a href='#viewcollection'>View Collection</a>
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
                                    <a href='#viewcollection'>View Collection</a>
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
                                    <a href='#viewcollection'>View Collection</a>
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
                                    <Link className='item' key={id} to={`/productlist/category/${ele.id}`}>
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
                    <Row xxl={6} lg={4} md={3} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                        {
                            bestSeller.slice(0, 12).map((ele, id) => {
                                var isSelected = wishlistID.find((items) => items === ele.id);
                                return (
                                    <Col key={id} className='py-4'>
                                        <div className='s_seller_card'>
                                            <Link to={'#'}>
                                                <div className='s_card_img bg-white'>
                                                    <img src={ele.images?.[0]} className="w-100 bg-white" alt={ele.title} key={ele.title} />
                                                </div>
                                                {
                                                    isSelected ? 
                                                    <div className='s_heart_icon active' onClick={()=>{removeWishlistHandler(isSelected)}}>
                                                        <GoHeartFill />
                                                    </div> : <div className='s_heart_icon' onClick={() => { addwishlistHandler(ele.id) }}>
                                                        <GoHeart />
                                                    </div>
                                                }
                                                    { 
                                                    console.log('isSelected', isSelected)
                                                    }
                                                {ele.gender ?
                                                    <div className='s_card_status'><p className='mb-0'>{ele.metal_color}</p></div>
                                                    : ''}
                                                <Link className='s_card_text' to={`/productdetail/${ele.id}`}>
                                                    <h5>{ele.product_name}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike className="mx-2">₹{ele.discount}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                if (index < 0) {
                                                                    return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                                } else {
                                                                    return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                                    ;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </Link>
                                            </Link>

                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
            </section>
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
                                        <Link>Shop Now</Link>
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
                            <div className='s_es_card'>
                                <img src={require('../Img/Sujal/weddingwear.png')} alt='wedding wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Wedding Wear</h4>
                                        <p>Traditional attire</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className='position-relative py-5'>
                            <div className='s_es_card'>
                                <img src={require('../Img/Sujal/partywear.png')} alt='party wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Party Wear</h4>
                                        <p>Glamorous Look</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className='position-relative py-5'>
                            <div className='s_es_card'>
                                <img src={require('../Img/Sujal/officewear.png')} alt='office wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Office Wear</h4>
                                        <p>Professional Look</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className='position-relative py-5'>
                            <div className='s_es_card'>
                                <img src={require('../Img/Sujal/everydaywear.png')} alt='everyday wear' className='w-100 '></img>
                                <div className='s_card_detail'>
                                    <div>
                                        <h4>Everyday Wear</h4>
                                        <p>Casual Comfort</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='py-5 gx-0 gx-sm-3' >
                        <Col lg={4} sm={12}>
                            <div className='s_card d-flex align-items-center' >
                                <img src={es_card1} className='w-100' alt='card1'></img>
                                <div>
                                    <div>
                                        <h3>Alluring</h3>
                                        <h1>Platinum</h1>
                                    </div>
                                    <p className='text-white'>SIMPLEM& ELEGANT</p>
                                    <small className='text-white'>Design starts from $120</small>
                                    <div className='s_card_btn'>
                                        <Link to={'#'}>Shop Now</Link>
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
                                        <Link to={'#'}>Shop Now</Link>
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
                                        <Link to={'#'}>Shop Now</Link>
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
                            <OwlCarousel className='owl-theme ' loop margin={20} items={4} nav={true} dots={false}
                                responsive={
                                    feature_sliderres
                                }
                            >
                                {allProduct.slice(0, 5).map((item, idx) => {
                                    return (
                                        <Link className='item' key={idx} to={`/productdetail/${item.id}`}>
                                            <img src={item.images[0]} className='w-100' alt={`image${idx}`}></img>
                                            <div className='s_slider_text'>
                                                <h5 className='text-capitalize'>{item.product_name}</h5>
                                                <p className='mb-0'><span className='mx-2'>{item.price}</span><strike className="mx-2">{item.discount}</strike></p>
                                                <div className='s_rating'>
                                                    {
                                                        [...Array(5)].map((_, index) => {
                                                            if (index < item.rating) {
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
                                    )
                                })}
                                {/* 
                                <Link className='item' to={'/productlist'}>
                                    <img src={require('../Img/Sujal/s_bracelet.png')} className='w-100' alt='Bracelet'></img>
                                    <div className='s_slider_text'>
                                        <h5>Bracelet</h5>
                                        <p className='mb-0'><span className='mx-2'>₹1200</span><strike className="mx-2">₹1500</strike></p>
                                        <div className='s_rating'>
                                            {
                                                [...Array(5)].map((_, index) => {
                                                    if (index < 1) {
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
                                <Link className='item' to={'/productlist'}>
                                    <img src={require('../Img/Sujal/s_diamond_ring.png')} className='w-100' alt='Dimond Ring'></img>
                                    <div className='s_slider_text'>
                                        <h5>Dimond Ring</h5>
                                        <p className='mb-0'><span className='mx-2'>₹1200</span><strike className="mx-2">₹1500</strike></p>
                                        <div className='s_rating'>
                                            {
                                                [...Array(5)].map((_, index) => {
                                                    if (index < 0) {
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
                                <Link className='item' to={'/productlist'}>
                                    <img src={require('../Img/Sujal/s_diamond_earing.png')} className='w-100' alt='Dimond Earring'></img>
                                    <div className='s_slider_text'>
                                        <h5>Dimond Earring</h5>
                                        <p className='mb-0'><span className='mx-2'>₹1200</span><strike className="mx-2">₹1500</strike></p>
                                        <div className='s_rating'>
                                            {
                                                [...Array(5)].map((_, index) => {
                                                    if (index < 5) {
                                                        return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                    } else {
                                                        return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                        ;
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </Link> */}

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
            <section className='s_news_sec'>
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
            </section>
        </>
    )
}
export default Home;