import { useContext, useEffect, useState } from 'react';
import '../Css/Sujal/Wishlist.css'
import { Col, Row } from 'react-bootstrap';
import { GoHeartFill } from 'react-icons/go';
import { Link} from 'react-router-dom';
import noteContext from '../Context/noteContext';
import fillstar from '../Img/Sujal/fillStar.png';
import halfstar from '../Img/Sujal/halfstar.png';
import nofillstar from '../Img/Sujal/nofillstar.png';
function Wishlist() {
    // backend conection code ----------------------------------------------------------------

    // useContext
    const { wishlistData, findWishlistID, allProduct } = useContext(noteContext);


    // fliter wishlistData from product data
    const [wishlistproducts, setWishlistData] = useState([]);
    useEffect(() => {
        const productData = allProduct.filter((wishlistItem) =>
            wishlistData.some((product) => product.product_id === wishlistItem.id)
        );
        // console.log('data',productData);
        setWishlistData(productData);
    }, [wishlistData, allProduct]);

    
    // console.log('hellloo',wishlistproducts);
     // backend conection code over ----------------------------------------------------------------
    return (
        <>
            {wishlistData.length === 0 ?
                <section>
                    <div className='ds_empty-inner'>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-center'>
                                <img src={require("../Img/Sujal/empty_wishlist.png")} alt="" width="20%" />
                                <h3 className='ds_color'>Empty Wishlist</h3>
                                <p className='mb-0'>Your wishlist is empty please add</p><p> your favourite items to wishlist</p>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className='s_wishlist_sec ds_container'>
                    <Row xxl={5} lg={4} md={3} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-4'>
                        {
                            wishlistproducts.map((ele, id) => {
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
                                            <div className='s_card_img'>
                                                <img src={ele?.images[0] || ele?.product_image[0]} className="w-100" alt={ele.title} key={ele.title} />
                                            </div>
                                            <div className='s_heart_icon s_heart_icons filled' onClick={() => { findWishlistID(ele.id) }}>
                                                <GoHeartFill />
                                            </div>
                                            <div  className='s_card_text'>
                                                <Link to={`/productdetail/${ele.product_id || ele.id}`}>
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
                </section>
            }
        </>
    )
}
export default Wishlist; 