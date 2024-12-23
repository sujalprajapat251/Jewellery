import '../Css/Sujal/ProductDetail.css'
import { Accordion, Col, Modal, Nav, Row } from "react-bootstrap";
import video from '../Img/Sujal/ringvideo.mp4'
import { useContext, useEffect, useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { FaAngleDown, FaShareAlt } from 'react-icons/fa';
import { Link,  useParams } from 'react-router-dom';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import noteContext from '../Context/noteContext';

import axios from 'axios';
function ProductDetail() {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("Login"));
    console.log('user', user.id);
    let [inStock, setInStock] = useState(true);

    // backend connnectivity code here

    const { Api, token, allProduct, wishlistID, findWishlistID, addwishlistHandler } = useContext(noteContext);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        axios
            .get(`${Api}/products/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const fetchedProducts = response?.data?.data || [];

                // Update product state
                setProduct(fetchedProducts);

                // Check stock availability
                if (fetchedProducts.qty <= 0) {
                    setInStock(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
        setAddToCard(true);
    }, [id,token,Api]);

    // size haddler
    const [size, setSize] = useState('');
    const [sizeArray, setSizeArray] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [youAlsoLike, setYouAlsoLike] = useState([]);
    const [offers, setOffers] = useState([]);
    const [peopleAlsoSearch, setPeopleAlsoSearch] = useState([]);
    useEffect(() => {


        const array = product?.size_name?.split(',').map(Number).filter((num) => !isNaN(num));

        if (array?.length) {
            setSizeArray(array);
            setSize(array[0]);
        } else {
            setSizeArray([]);
            setSize(null);
        }


        // fetch review data 
        axios.get(`${Api}/reviews/getall`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setReviews(response.data.data);

            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });

        // fetch you also like data
        const youAlso = allProduct.filter((item) => item.category_id === product.category_id)
        setYouAlsoLike(youAlso);


        // offer handling code and fetch offers data
        axios.get(`${Api}/productoffers/getall`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const offersData = response.data.productOffers.filter((offer) => offer.product_id === parseInt(id));
                setOffers(offersData);
                ;
            })

        //people also search for product

        for (let i = allProduct.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allProduct[i], allProduct[j]] = [allProduct[j], allProduct[i]]; // Swap
        }

        // Get 5 random products
        const randomProducts = allProduct.slice(0, 5);
        setPeopleAlsoSearch(randomProducts);
        console.log(randomProducts);
        // eslint-disable-next-line
    }, [product])


    // addto card handler
    const [addToCard, setAddToCard] = useState(true);
    const addCardHandle = async() => {
        if (addToCard) {
            await axios.post(`${Api}/cart/create`,
                {
                    customer_id: user.id,
                    product_id: product?.id,
                    quantity: 1,
                    unit_price: product?.total_price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    console.log("Product added to cart successfully!", response);
                })
            // addCard = false;
            setAddToCard(false);
        }
        // console.log(addCard);
    }
    // backend connnectivity code oevr here ////////////////////////////////

    // offer handling code 
    const [selectedOffers, setSelectedOffers] = useState([]);

    const handleOfferSelect = (offer, e) => {
        const parent = e.target.closest('.s_parent');

        const isChecking = selectedOffers.find((item) => item.id === offer.id);

        if (isChecking) {
            const data = selectedOffers.filter((item) => item.id !== offer.id);
            setSelectedOffers(data);
            console.log("Updated Offers:", data);
            parent.classList.remove('s_light_brown');
        } else {
            const offers = [...selectedOffers, offer];
            console.log("Updated Offers:", offers);
            setSelectedOffers(offers);
            parent.classList.add('s_light_brown');
        }
    }



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

    // review handller
    const [lgShow, setLgShow] = useState(false);
    const [reviewDetail, setreviewDetail] = useState([]);
    useEffect(() => {
        const product_review = reviews?.filter((item) => item.product_id === parseInt(id));
        setreviewDetail(product_review);
        // eslint-disable-next-line
    }, [reviews])

    //  color handdler
    const color = [{ name: 'rose', code: '#B76E79' }, { name: 'gold', code: '#FFD700' }, { name: 'silver', code: '#C0C0C0' }, { name: 'platinum', code: '#e5e4e2' }, { name: 'white-gold', code: '#FFFFF4' }, { name: 'yellow-gold', code: '##FFDF00' }]
    let metalColor = [];
    if (product.metal_color) {
        metalColor = color?.filter((color) => {
            return product.metal_color.includes(color.name);
        });
    }


    // thumbnail image handdlers {}
    const [thumbnail, setThumbnail] = useState(null);
    useEffect(() => {
        if (product?.images?.length <= 1) {
            setThumbnail(product.images[0]); // Set the default thumbnail
        }
        else {
            setThumbnail(null)
        }
    }, [product?.images]);
    const productImgHanddler = (index) => {
        setThumbnail(product.images[index]);
    }

    // other detail nav-tabe handller 
    const [tab, setTab] = useState('tab-0');



    // braking price calculation ------
    const metal_total = product?.price && product?.weight
        ? `${((parseFloat(product.price) / parseFloat(product.weight)) * parseFloat(product.weight)).toFixed(2)}`
        : 0;
    const stone_total = product?.stone_price && product?.gram
        ? `${(parseFloat(product.stone_price) * parseFloat(product.gram)).toFixed(2)}`
        : 0;
    const making_charge = product?.making_charge
        ? `${((parseFloat(metal_total) + parseFloat(stone_total)) * (parseFloat(product?.making_charge) / 100)).toFixed(2)}`
        : 0;
    console.log('making_charge', ((parseFloat(metal_total) + parseFloat(stone_total)) * (parseFloat(product?.making_charge) / 100)));
    const discount = (parseFloat(metal_total) + parseFloat(stone_total) + parseFloat(making_charge)) * parseFloat(product?.discount || 0) / 100;
    console.log(discount);
    const sub_total = ((parseFloat(metal_total) + parseFloat(stone_total) + parseFloat(making_charge)) - discount).toFixed(2);
    const gst_total = (sub_total * 3 / 100).toFixed(2);
    const great_total = ((parseFloat(sub_total) + parseFloat(gst_total)).toFixed(2));
    const isSelected = wishlistID.find((items) => items === product.id);
    console.log('price', product.making_charge);
    return (
        <>
            <section className="s_prodetail_page ds_container">
                <Row lg={2} className='gx-0 gx-md-4 py-4'>
                    <Col>
                        {thumbnail !== null ?
                            (() => {
                                const isVideo = /\.(mp4|webm|ogg)$/i.test(thumbnail);
                                return isVideo ? (
                                    <video controls className="w-100">
                                        <source src={thumbnail} type="video/mp4" className='h-100 object-fit-cover' />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={thumbnail} alt="thumbnail" className="w-100 object-fit-cover " style={{ aspectRatio: '1 / 1' }} />
                                );
                            })()
                            :
                            <div className="s_product_img d-flex flex-wrap">
                                {product?.images?.slice(0, 4).map((media, index) => {
                                    // Check if the media source ends with an image or video extension
                                    const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
                                    const isImage = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(media);

                                    return isVideo ? (
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
                                    ) : isImage ? (
                                        <img key={index} src={media} alt={`product-media-${index}`} className="product-image" onClick={() => productImgHanddler(index)} />
                                    ) : null; // Handle unknown formats
                                })}
                            </div>
                        }

                        <div className='s_product_slider'>
                            {product?.images?.length <= 6 ?
                                <div className='d-flex justify-content-lg-center overflow-auto'>
                                    {product.images?.map((item, index) => {
                                        const isVideo = /\.(mp4|webm|ogg)$/i.test(item);
                                        return (
                                            <div className='' key={index} >
                                                <div className='s_product_img' onClick={() => productImgHanddler(index)}>
                                                    {isVideo ?
                                                        <div className='s_product_video'
                                                            onMouseLeave={handleStopclick}
                                                            style={{ width: '100px', height: '100px' }}>
                                                            <video ref={videoRef}
                                                                className=''
                                                                controls={controlsVisible} muted>
                                                                <source src={video} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <img
                                                                src={require("../Img/Sujal/play.png")}
                                                                alt="play"
                                                            />
                                                        </div>
                                                        :
                                                        <img src={item} alt={`product-media-${index}`} style={{ width: '100px', height: '100px' }} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <OwlCarousel
                                    className="owl-theme"
                                    margin={20}
                                    nav
                                    responsive={{
                                        0: {
                                            items: 4, // Show 4 items on very small screens
                                        },
                                        576: {
                                            items: 6,
                                        },
                                    }}
                                >
                                    {product.images?.map((item, index) => {

                                        const isVideo = /\.(mp4|webm|ogg)$/i.test(item);
                                        return (
                                            <div className='item ' key={index} >
                                                <div className='s_product_img' onClick={() => productImgHanddler(index)}>
                                                    {isVideo ?
                                                        <div className='s_product_video w-100'
                                                            onMouseLeave={handleStopclick}>
                                                            <video ref={videoRef}
                                                                className=''
                                                                controls={controlsVisible} muted>
                                                                <source src={video} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <img
                                                                src={require("../Img/Sujal/play.png")}
                                                                alt="play"
                                                            />
                                                        </div>
                                                        :
                                                        <img src={item} alt={`product-media-${index}`} className={"w-100"} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </OwlCarousel>}

                        </div>
                    </Col>
                    <Col>
                        <div className='s_productdetail_sec'>
                            {
                                isSelected ?
                                    <div className='d-flex justify-content-end s_share_icon' onClick={() => { findWishlistID(isSelected) }}>
                                        <GoHeartFill className='s_active' />
                                        <FaShareAlt />
                                    </div> :
                                    <div className='d-flex justify-content-end s_share_icon' onClick={() => { addwishlistHandler(product.id) }}>
                                        <GoHeart />
                                        <FaShareAlt />
                                    </div>
                            }
                            <h3 className='s_title text-capitalize'>{product?.product_name}</h3>
                            <div className='s_rating'>
                                {
                                    [...Array(5)].map((_, index) => {
                                        if (index < product?.total_rating) {
                                            return <img src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                        } else {
                                            return <img src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                            ;
                                        }
                                    })
                                }
                            </div>
                            <div className='d-flex align-items-center'>
                                <h2 className='s_price'>₹{product?.total_price}</h2>
                                {inStock !== true ? <div className='s_stock_status'>out of stack</div> : ''}
                            </div>
                            <p className='s_description'>{product?.description}</p>

                            {product.category_name !== 'Watch' ? <>
                                <div className='s_metal_option d-flex justify-content-between text-capitalize'>
                                    <div>
                                        <h5>Metal Color</h5>
                                        <div variant="pills" defaultActiveKey="link-0" className='nav'>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-0" className='active'>
                                                    <div className='s_color' style={{ background: `${metalColor[0]?.code}` }}></div>
                                                    {product?.metal_color}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Metal</h5>
                                        <Nav variant="pills" defaultActiveKey="link-0">
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-0">{product?.metal}</Nav.Link>
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
                                                {sizeArray.map((item) => {
                                                    return <div className={`s_size_box ${item === size ? 'active' : ''}`} onClick={() => { setSize(item) }}>{item}</div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Diamond Quality</h4>
                                        <div className='s_box d-flex  align-items-center'>
                                            <span>{product?.metal}</span>
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
                                            {offers.map((item, index) => {
                                                return (
                                                    <div key={index} className={`d-flex align-items-center s_parent px-2`} onClick={(e) => { handleOfferSelect(item, e) }}>
                                                        <img src={item.image} alt='discount' />
                                                        <div>
                                                            <p className='mb-0'>{item?.name}</p>
                                                            <span>{item?.description}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className='s_button_sec '>
                                <div className='s_cart_btn'>
                                    {!addToCard ? (
                                        <Link to='/cart'>View Cart</Link>
                                    ) : (
                                        <Link to='#' onClick={addCardHandle}>Add to Cart</Link>
                                    )}
                                </div>
                                <div className='s_buy_btn'>
                                    <Link to={'#'}>Buy Now</Link>
                                </div>
                            </div>
                            <div className='s_product_service justify-content-start'>
                                <div className='s_box mx-2'>
                                    <img src={require('../Img/Sujal/service1.png')} alt='service1'></img>
                                    <span>Dispatch in 2 days</span>
                                </div>
                                <div className='s_box mx-2'>
                                    <img src={require('../Img/Sujal/service3.png')} alt='service3'></img>
                                    <span>Support 24*7</span>
                                </div>
                                <div className='s_box mx-2'>
                                    <img src={require('../Img/Sujal/service4.png')} alt='service4'></img>
                                    <span>Best Quality</span>
                                </div>
                            </div>
                            <div className='s_other_info'>
                                <h4>Return Policy</h4>
                                <span>Return Reason</span>
                                <p>Physical Damage, Defective, Wrong and missing item and any other reason</p>
                                <span>Return Reason</span>
                                <p>Physical Damage, Defective, Wrong and missing item and any other reason</p>
                                <span>Return Reason</span>
                                <p>Physical Damage, Defective, Wrong and missing item and any other reason</p>
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
                        {product.category_name !== 'Watch' ? <>
                            {console.log(product.category_name)}
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Metal Details</h4>
                                <span className='d-flex justify-content-between'><p>Metal Type</p><b>{product?.metal || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Weight</p><b>{product?.weight && product?.gram
                                    ? `${(parseFloat(product.weight) + parseFloat(product.gram)).toFixed(2)}g`
                                    : `${product.weight}g`} </b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>{product?.metal_color || '--'}</b></span>
                            </div>
                            <div className='s_table s_w_40'>
                                <h4 className='s_table_head'>Diamond Details</h4>
                                <span className='d-flex justify-content-between'><p>Clarity</p><b>{product?.clarity || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Setting</p><b>{product?.diamond_setting || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>{product?.diamond_color || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Shape</p><b>{product?.diamond_shape || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>No. of Diamonds</p><b>{product?.no_of_diamonds || '--'}</b></span>
                            </div>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>General Details</h4>
                                <span className='d-flex justify-content-between'><p>Jewellry Type</p><b>{product?.category_name || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Gender</p><b>{product?.gender || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Collection</p><b>{product?.collection || '--'}</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>{product?.occasion || '--'}</b></span>
                                <span className='d-flex justify-content-between word-wrap'><p>Size</p><b>{sizeArray.map((item) => item).join(', ') || '--'}</b></span>
                            </div>
                        </> : <>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Case</h4>
                                <span className='d-flex justify-content-between'><p>Size</p><b>{product?.size ? `${product.size}mm` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Water Resistant</p><b>{product?.water_resistant ? `${product.water_resistant} Meter` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Case Material</p><b>{product?.cash_material ? `${product.cash_material}` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Dial Color</p><b>{product?.metal_color ? `${product.metal_color}` : '-'}</b></span>
                            </div>
                            <div className='s_table s_w_40'>
                                <h4 className='s_table_head'>Movement</h4>
                                <span className='d-flex justify-content-between'><p>Movement</p><b>{product?.movement ? `${product.movement}` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Clasp Type</p><b>{product?.clasp_type ? `${product.clasp_type}` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>{product?.occasion ? `${product.occasion}` : '-'}</b></span>
                            </div>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Warranty</h4>
                                <span className='d-flex justify-content-between'><p>Reference Number</p><b>{product?.reference_number ? `${product.reference_number}` : '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Warranty</p><b>{product?.warranty ? `${product.warranty} Manufacturer Warranty` : '-'}</b></span>
                            </div>
                        </>}

                    </div>
                    <div className={`overflow-x-auto s_table_sec d-lg-flex ${tab === 'tab-1' ? '' : 'd-none d-lg-none'}`}>
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
                                    <td>{product?.metal ? `${product?.metal}` : '-'}</td>
                                    <td>{product?.price ? `₹ ${(product?.price) / (product?.weight)}/g` : '-'}</td>
                                    <td>{product?.weight ? `${product?.weight}g` : '-'}</td>
                                    <td>-</td>
                                    <td>₹{metal_total}</td>
                                </tr>
                                <tr>
                                    <td>Stone</td>
                                    <td>{product?.stone_price ? `₹ ${product?.stone_price}/g` : '-'}</td>
                                    <td>{product?.gram ? `${product?.gram}g` : '-'}</td>
                                    <td>-</td>
                                    <td>
                                        ₹ {stone_total}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Making Charges</td>
                                    <td>{product?.making_charge ? `${product?.making_charge}%` : '-'}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>₹ {making_charge}</td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>-</td>
                                    <td>{product?.weight && product?.gram
                                        ? `${(parseFloat(product.weight) + parseFloat(product.gram)).toFixed(2)}g`
                                        : '-'}</td>
                                    <td>{product?.discount ? `${product?.discount}%` : '-'}</td>
                                    <td>₹ {sub_total}</td>
                                </tr>
                                <tr>
                                    <td>GST</td>
                                    <td>3%</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>₹ {gst_total}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='4'>Grand Total</td>
                                    <td>₹ {great_total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className={` ${tab === 'tab-2' ? '' : 'd-none d-lg-none'}`}>
                        <div className='s_review'>
                            {reviewDetail.slice(0, 4).map((item, index) => {
                                return (
                                    <div className='d-flex s_review_div'>
                                        <div className='s_review_profile'>
                                            <p className='mb-0 text-capitalize'>{item.customer_name[0]}</p>
                                        </div>
                                        <div className='s_review_detail'>
                                            <p className='mb-0'>{item.customer_name}</p>
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
                                                <p className='mb-0'>Great Product</p>
                                                <span>{item.description}</span>
                                                {item.image ?
                                                    <div className='s_review_img'>
                                                        {item?.image.map((item) => {
                                                            return <img src={item} alt='review' key={item} />
                                                        })}
                                                    </div>
                                                    : ''}

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
                                )
                            })}
                        </div>
                        <div className='s_view_all' onClick={() => setLgShow(true)}>
                            <Link>View All</Link>
                        </div>
                    </div>
                </div>
                <div className='s_also_like'>
                    <div className='d-flex justify-content-between'>
                        <h2>You may also like</h2>
                        <Link to={`/productlist/subcategory/${product?.sub_category_id}`}>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={4} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                            {
                                youAlsoLike.slice(0, 5).map((ele, id) => {
                                    const discounted = ((parseFloat(ele.total_price) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    const discountPrice = (parseFloat(ele.total_price) - parseFloat(discounted)).toFixed(2);
                                    return (
                                        <Col key={id} className='py-4 '>
                                            <Link to={`/productdetail/${ele.id}`} className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>

                                                <div className='s_card_text'>
                                                    <h5>{ele.product_name}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹{discountPrice}</span><strike className="mx-2">₹{ele.total_price}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                if (index < ele.total_rating) {
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
                        <Link to={`/productlist/all/null`}>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={4} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                            {
                                peopleAlsoSearch.map((ele, id) => {
                                    const discounted = ((parseFloat(ele.total_price) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    const discountPrice = (parseFloat(ele.total_price) - parseFloat(discounted)).toFixed(2);
                                    return (
                                        <Col key={id} className='py-4'>
                                            <Link to={`/productdetail/${ele.id}`} className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele?.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>
                                                <div className='s_card_text'>
                                                    <h5>{ele.title}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹ {discountPrice}</span><strike className="mx-2">₹ {ele.total_price}</strike></p>
                                                    <div className='s_rating'>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                if (index < ele.total_rating) {
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
                        {reviewDetail.map((item, index) => {
                            return (
                                <div className='d-flex s_review_div'>
                                    <div className='s_review_profile'>
                                        <p className='mb-0 text-capitalize'>{item.customer_name[0]}</p>
                                    </div>
                                    <div className='s_review_detail'>
                                        <p className='mb-0'>{item.customer_name}</p>
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
                                            <p className='mb-0'>Great Product</p>
                                            <span>{item.description}</span>
                                            {item.image ?
                                                <div className='s_review_img'>
                                                    {item?.image.map((item) => {
                                                        return <img src={item} alt='review' key={item} />
                                                    })}
                                                </div>
                                                : ''}

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
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ProductDetail;