import { useContext, useEffect, useState } from 'react';
import '../Css/Sujal/Wishlist.css'
import { Col, Row } from 'react-bootstrap';
import { GoHeartFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import noteContext from '../Context/noteContext';
function Wishlist() {
    const {wishlistData, removeWishlistHandler , allProduct} =useContext(noteContext); 
    console.log(wishlistData);
    const [wishlistproducts,setWishlistData]= useState([]);
    useEffect(()=>{
        const productData = wishlistData.filter((wishlistItem) =>
            allProduct.some((product) => product.id === wishlistItem.product_id)
          );
          setWishlistData(productData);
    },[wishlistData])
    console.log(wishlistproducts);
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
                    <Row xxl={6} lg={4} md={3} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                        {
                            wishlistproducts.map((ele, id) => {
                                return (
                                    <Col key={id} className='py-4'>
                                        <div className='s_seller_card'>
                                            <Link to={'#'}>
                                                <div className='s_card_img'>
                                                    <img src={ele?.images || ele?.product_image[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>
                                                <div className='s_heart_icon s_heart_icons filled' onClick={()=>{removeWishlistHandler(ele.id)}}>
                                                    <GoHeartFill />
                                                </div>
                                                {ele.status ?
                                                    <div className='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                    : ''}
                                                <Link to={`/productdetail/${ele.id}`} className='s_card_text'>
                                                    <h5>{ele.product_name}</h5>
                                                    <p className='mb-0' key={'p' + id}>
                                                        <span className='mx-2' key={'price' + id}>₹{ele?.total_price || ele?.product_price}</span>
                                                        <strike className="mx-2" key={id}>₹{ele?.discount || 0.00}</strike>
                                                    </p>
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
                                                </Link>
                                            </Link>
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