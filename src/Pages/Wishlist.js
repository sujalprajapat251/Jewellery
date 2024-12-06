import '../Css/Sujal/Wishlist.css'
import wishlist1 from '../Img/Sujal/wishlist1.png';
import wishlist2 from '../Img/Sujal/wishlist2.png';
import wishlist3  from '../Img/Sujal/wishlist3.png';
import { Col, Row } from 'react-bootstrap';
import { GoHeartFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
function Wishlist() {
    const wishlist_detail = [
        { id: 1, title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        {id: 2, title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        {id: 3, title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        {id: 4, title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
    ]
    return (
        <>
            {wishlist_detail.length === 0 ?
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
                    <Row xxl={6} lg={4} md={3} sm={2} className='s_seller_cards row-cols-1 gx-0 gx-sm-3'>
                        {
                            wishlist_detail.map((ele, id) => {
                                return (
                                    <Col key={id} className='py-4'>
                                        <div className='s_seller_card'>
                                            <div className='s_card_img'>
                                                <img src={ele.img} className="w-100" alt={ele.title} key={ele.title} />
                                            </div>
                                            <div className='s_heart_icon s_heart_icons filled'>
                                                <GoHeartFill />
                                            </div>
                                            {ele.status ?
                                                <div className='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                : ''}
                                            <div className='s_card_text'>
                                                <h5>{ele.title}</h5>
                                                <p className='mb-0' key={'p'+id}>
                                                    <span className='mx-2' key={'price'+id}>₹{ele.price}</span>
                                                    <strike className="mx-2" key={id}>₹{ele.old_price}</strike>
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
                                                <Link></Link>
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