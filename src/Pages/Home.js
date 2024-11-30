import '../Css/Sujal/Home.css';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slider1 from '../Img/Sujal/slider1.png';
import slider2 from '../Img/Sujal/slider2.png';
import slider3 from '../Img/Sujal/slider3.png';
function Home() {
    return (
        <>
            <section className='s_slider'>
                <OwlCarousel className='owl-theme' items={1} margin={0} loop>
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
        </>
    )
}
export default Home;