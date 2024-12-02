import '../Css/Sujal/Home.css';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slider1 from '../Img/Sujal/slider1.png';
import slider2 from '../Img/Sujal/slider2.png';
import slider3 from '../Img/Sujal/slider3.png';
import cat1 from '../Img/Sujal/cat1.png';
import cat2 from '../Img/Sujal/cat2.png';
import cat3 from '../Img/Sujal/cat3.png';
import cat4 from '../Img/Sujal/cat4.png';
import cat5 from '../Img/Sujal/cat5.png';
import cat6 from '../Img/Sujal/cat6.png';
import cat7 from '../Img/Sujal/cat7.png';
import seller1 from '../Img/Sujal/seller1.png';
import seller2 from '../Img/Sujal/seller2.png';
import seller3 from '../Img/Sujal/seller3.png';
import seller4 from '../Img/Sujal/seller4.png';
import seller5 from '../Img/Sujal/seller5.png';
import seller6 from '../Img/Sujal/seller6.png';
import seller7 from '../Img/Sujal/seller7.png';
import seller8 from '../Img/Sujal/seller8.png';
import seller9 from '../Img/Sujal/seller9.png';
import seller10 from '../Img/Sujal/seller10.png';
import seller11 from '../Img/Sujal/seller11.png';
import seller12 from '../Img/Sujal/seller12.png';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
function Home() {
    const cat_sliderres = {

        0: { items: 1 },
        376: { items: 2 },
        600: { items: 3 },
        1024: { items: 4 },
        1200: { items: 5 },
        1440: { items: 7 },
    }
    const card_detail = [
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: seller1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: seller2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: seller3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: seller4 },
        { title: 'Dimond Set', price: '1200', old_price: '1500', rating: 1, img: seller5 },
        { title: 'Dimond Earring', price: '1200', old_price: '1500', rating: 5, img: seller6 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, img: seller7 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 1, img: seller8 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: seller9 },
        { title: 'Dimond Set', price: '1200', old_price: '1500', rating: 5, img: seller10 },
        { title: 'Dimond Earring', price: '1200', old_price: '1500', rating: 2, img: seller11 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 1, img: seller12 },

    ]
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
                            <div class='item'>
                                <img src={cat1} alt=''></img>
                                <h4>Diamond’s</h4>
                            </div>
                            <div class='item'>
                                <img src={cat2} alt=''></img>
                                <h4>Earrings</h4>
                            </div>
                            <div class='item'>
                                <img src={cat3} alt=''></img>
                                <h4>Rings</h4>

                            </div>
                            <div class='item'>
                                <img src={cat4} alt=''></img>
                                <h4>Bracelets</h4>

                            </div>
                            <div class='item'>
                                <img src={cat5} alt=''></img>
                                <h4>Necklace</h4>

                            </div>
                            <div class='item'>
                                <img src={cat6} alt=''></img>
                                <h4>Gold Lava</h4>

                            </div>
                            <div class='item'>
                                <img src={cat7} alt=''></img>
                                <h4>Charms</h4>

                            </div>
                        </OwlCarousel>
                    </div>
                </section>
                <section className='s_seller_sec ds_container'>
                    <div className='s_cat_head'>
                        <p className='mb-2'>DISCOVER ALL TRENDS</p>
                        <h2>Shop by category</h2>
                    </div>
                    <Row xxl={6} lg={4} md={3} sm={2} className='s_seller_cards row-cols-1 gx-0 gx-sm-3'>
                        {
                            card_detail.map((ele, id) => {
                                console.log(ele.img)
                                return (
                                    <Col key={id} className='py-4'>
                                        <div className='s_seller_card'>
                                            <div className='s_card_img'>
                                                <img src={ele.img} className="w-100" alt={ele.title} key={ele.title} />
                                            </div>
                                            <div className='s_heart_icon'>
                                                <GoHeart />
                                            </div>
                                            {ele.status ?
                                                <div class='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                : ''}
                                            <div className='s_card_text'>
                                                <h5>{ele.title}</h5>
                                                <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike class="mx-2">₹{ele.old_price}</strike></p>
                                                <div className='sp_rating'>
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
                                                <Link></Link>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                        {/* <Col >
                            <div className='s_seller_card'>
                                <div className='sp_card_img'>
                                    <img src={require('../Img/Sujal/seller1.png')} className='w-100'></img>
                                </div>
                                <div class='s_card_status'><p className='mb-0'>treading</p></div>
                                <div className='s_card_text'>
                                    <h5>Gold Ear Rings</h5>
                                    <p className='mb-0'><span className='mx-2'>₹1200</span><strike class="mx-2">₹1500</strike></p>
                                    <div className='sp_'></div>
                                    <Link></Link>
                                </div>
                            </div>

                        </Col> */}
                        {/* <Col className='s_seller_card'>
                            <img src={require('../Img/Sujal/seller2.png')} className='w-100'></img>
                        </Col>
                        <Col className='s_seller_card'>
                            <img src={require('../Img/Sujal/seller3.png')} className='w-100'></img>
                        </Col>
                        <Col className='s_seller_card'>
                            <img src={require('../Img/Sujal/seller4.png')} className='w-100'></img>
                        </Col>
                        <Col className='s_seller_card'>
                            <img src={require('../Img/Sujal/seller5.png')} className='w-100'></img>
                        </Col>
                        <Col className='s_seller_card'>
                            <img src={require('../Img/Sujal/seller6.png')} className='w-100'></img>
                        </Col> */}
                    </Row>
                </section>
            </section>
        </>
    )
}
export default Home;