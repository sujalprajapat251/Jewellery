import '../Css/Sujal/ProductDetail.css'
import { Accordion, Col, Modal, Nav, Row } from "react-bootstrap";
import video from '../Img/Sujal/ringvideo.mp4'
import React, { useContext, useEffect, useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { FaAngleDown, FaAngleUp, FaShareAlt, } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import noteContext from '../Context/noteContext';
import axios from 'axios';
import Login from '../Component/Login';
import fillstar from '../Img/Sujal/fillStar.png';
import halfstar from '../Img/Sujal/halfstar.png';
import nofillstar from '../Img/Sujal/nofillstar.png';
function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log('user', user?.id);
    let [inStock, setInStock] = useState(true);
    const calledOnce = React.useRef(false);
    // backend connnectivity code ---------------------------------------------------------------

    // useContext
    const { Api, token, allProduct, wishlistID, findWishlistID, addwishlistHandler, store, addToCardhandle ,pricehandling } = useContext(noteContext);

    // get product detail using Api
    const [product, setProduct] = useState([]);

    // Reset the 
    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, [id]);

    const getProduct = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchProductData();
        setAddToCard(true);
        calledOnce.current = true;
    }

    // fetch product data 
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${Api}/products/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.data) {
                const fetchedProducts = response?.data?.data || [];
                setProduct(fetchedProducts);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    }
    // get size , youAlso like and people also search for Data from all products 
    const [size, setSize] = useState(0);
    const [sizeArray, setSizeArray] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [youAlsoLike, setYouAlsoLike] = useState([]);
    const [offers, setOffers] = useState([]);
    const [peopleAlsoSearch, setPeopleAlsoSearch] = useState([]);
    const [sizeOpen,setSizeOpen] = useState(false)
    useEffect(() => {
        // console.log("product", product);
        // get size data
        const array = product?.size_name?.split(',').map(Number).filter((num) => !isNaN(num));
        if (array?.length) {
            setSizeArray(array);
            setSize(array[0]);
        } else {
            setSizeArray([]);
            setSize(0);
        }

        // outof stock handling 
        fetchStockData();

        // fetch review data using function 
        fetchReviewData()

        // fetch product offer using api 
        fetchProductOffer();

        // eslint-disable-next-line
    }, [product])

    useEffect(() => {
        // alert('');
        // console.error('allProduct = > ', allProduct);
        const youAlso = allProduct.filter((item) =>
            item.category_id === product?.category_id && item.id !== product.id
        )
        setYouAlsoLike(youAlso);
        //people also search for product
        for (let i = allProduct.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allProduct[i], allProduct[j]] = [allProduct[j], allProduct[i]]; // Swap
        }

        // Get 5 random products for people also search
        const randomProducts = allProduct.slice(0, 10);
        setPeopleAlsoSearch(randomProducts);
        // console.log(randomProducts);
        // eslint-disable-next-line
        // console.warn('size', product)
    }, [allProduct, product])


    // fetch product offers
    const fetchProductOffer = async () => {
        try {
            const response = await axios.get(`${Api}/productoffers/getallactive`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.productOffers) {
                const today = new Date();
                const offersData = response.data.productOffers.filter((offer) => {
                    if (!offer.end_date) return false; // Exclude if end_date is missing
                    const offerEndDate = new Date(offer.end_date);
                    return offer.product_id === parseInt(id) && offerEndDate >= today;
                });
                setOffers(offersData);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    }

    // fetch stock data 
    const fetchStockData = async () => {
        try {
            const response = await axios.get(`${Api}/stocks/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.data) {
                var data = response?.data?.data.filter(data => data?.product_id === product?.id);
                // console.warn('data', data);
                // console.log('stockData', product);
                if (data.length === 0) {
                    setInStock(false);
                }
                else {
                    setInStock(true);
                }
            }
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    }

    // fetch review data  function is here
    const fetchReviewData = async () => {
        try {
            const response = await axios.get(`${Api}/reviews/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(response?.data?.data);
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    }

    // addto card data function using Api

    const [showLogin, setShowLogin] = useState(false);
    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);
    const [addToCard, setAddToCard] = useState(true);
    const addCardHandle = async () => {
        if (!store) {
            setShowLogin(true);
        } else {
            addToCardhandle(product, size, selectedOffers);
            setAddToCard(false);
        }
    }



    // backend connnectivity code oevr here ----------------------------------------------------------------


    // video handdler and image code here
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

    // review modal code here
    const [lgShow, setLgShow] = useState(false);
    const [reviewDetail, setreviewDetail] = useState([]);
    useEffect(() => {
        const product_review = reviews?.filter((item) => item.product_id === parseInt(id));
        setreviewDetail(product_review);
        // eslint-disable-next-line
    }, [reviews])

    //  color of metal code here
    const color = [{ name: 'rose', code: '#B76E79' }, { name: 'gold', code: '#FFD700' }, { name: 'silver', code: '#C0C0C0' }, { name: 'platinum', code: '#e5e4e2' }, { name: 'white-gold', code: '#FFFFF4' }, { name: 'yellow-gold', code: '##FFDF00' }]
    let metalColor = [];
    if (product.metal_color) {
        metalColor = color?.filter((color) => {
            return product.metal_color.includes(color.name);
        });
    }


    // thumbnail image handdlers code here
    const [thumbnail, setThumbnail] = useState(null);
    useEffect(() => {
        if (product?.images?.length <= 1) {
            setThumbnail(product.images[0]);
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
    // console.log('making_charge', ((parseFloat(metal_total) + parseFloat(stone_total)) * (parseFloat(product?.making_charge) / 100)));
    const discount = (parseFloat(metal_total) + parseFloat(stone_total) + parseFloat(making_charge)) * parseFloat(product?.discount || 0) / 100;
    // console.log(discount);
    const sub_total = ((parseFloat(metal_total) + parseFloat(stone_total) + parseFloat(making_charge))).toFixed(2);
    const gst_total = (sub_total * 3 / 100).toFixed(2);
    const great_total = ((parseFloat(sub_total) + parseFloat(gst_total) - discount).toFixed(2));
    const isSelected = wishlistID.find((items) => items === product?.id);
    // console.log('price', product.making_charge);

    // people also like and people also search for responsive handling

    const [itemsToShow, setItemsToShow] = useState(5); // Default to 5 items
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1399) {
                setItemsToShow(5);
            } else if (window.innerWidth > 991) {
                setItemsToShow(4);
            }
            else if (window.innerWidth > 767) {
                setItemsToShow(3);
            } else if (window.innerWidth > 556) {
                setItemsToShow(4);
            } else if (window.innerWidth > 375) {
                setItemsToShow(4);
            } else {
                setItemsToShow(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // like dislike handling
    const handleLike = async (id, x) => {
        // console.warn(id, x);
        const response = await axios.post(`${Api}/reviews/${id}/like-dislike`, {
            like_or_dislike: `${x}`,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response) {
            fetchReviewData();
        }
    }
    // offer handling code 
    const [selectedOffers, setSelectedOffers] = useState([]);

    const handleOfferSelect = (offer, e) => {
        const parent = e.target.closest('.s_parent');
        var classname = document.getElementsByClassName('s_parent');
        Array.from(classname).forEach(function (item) {
            if (item.classList.contains('s_light_brown')) {
                item.classList.remove('s_light_brown');
            }
        });
        // console.warn("Updated Offers:", offer);
        setSelectedOffers(offer);
        // console.log('offer',offer);
        parent.classList.add('s_light_brown');
        // }
    }

    // buy now handling
    const buyNowHandling = () => {
        let discount = 0;
        if (selectedOffers?.type === 'percentage') {
            // console.log('selected',selectedOffers)
            discount = parseFloat((parseFloat(product.total_price) * (parseFloat(selectedOffers.discount) / 100)).toFixed(2));
            //   unit_price = (parseFloat(product.total_price) - parseFloat(discount)).toFixed(2);
            // console.log('discount', discount);
        }
        if (selectedOffers?.type === 'fixed') {
            // console.log('selected',selectedOffers)
            discount = parseFloat(selectedOffers.price);
            //unit_price = (parseFloat(product.total_price) - parseFloat(selectedOffers.price)).toFixed(2);
        }
        const tax = ((parseFloat(product?.total_price) - discount) * 3 / 100).toFixed(2);
        const total = (parseFloat(product?.total_price) + parseFloat(tax)).toFixed(2);
        localStorage.setItem("OrderDetails", JSON.stringify({
            sub_total: product?.total_price,
            discount,
            tax,
            total
        }));
        localStorage.setItem("BuyNow", JSON.stringify({
            product_id: product?.id,
            qty: 1,
            size: size || 0,
            metal: product?.metal
        }))
    }

    // share modal handling

    const [shareModal, setShareModal] = useState(false);

    const copyLinkHandle = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setShareModal(false)
    };

    const shareOnFacebook = () => {
        const currentUrl = encodeURIComponent(window.location.href); // Encode the current URL
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        window.open(facebookShareUrl, '_blank'); // Open in a new tab
    };

    const shareOnWhatsApp = () => {
        const currentUrl = encodeURIComponent(window.location.href); // Encode the current URL
        const whatsappShareUrl = `https://api.whatsapp.com/send?text=${currentUrl}`;
        window.open(whatsappShareUrl, '_blank'); // Open in a new tab
    };

    const shareOnX = () => {
        const currentUrl = encodeURIComponent(window.location.href); // Encode the current URL
        const xShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
        window.open(xShareUrl, '_blank'); // Open in a new tab
    };

    const shareOnInstagram = () => {
        const instagramProfileUrl = `https://www.instagram.com/direct/inbox/`;
        window.open(instagramProfileUrl, '_blank');
    }
    return (
        <>
            <section className="s_prodetail_page ds_container">
                <div className='d-block d-lg-none s_productdetail_sec'>
                    {store ?
                        isSelected ?
                            <div className='d-flex justify-content-end s_share_icon' >
                                <GoHeartFill className='s_active' onClick={() => { findWishlistID(product.id) }} />
                                <FaShareAlt onClick={() => { setShareModal(true) }} />
                            </div> :
                            <div className='d-flex justify-content-end s_share_icon' >
                                <GoHeart onClick={() => { addwishlistHandler(product.id) }} />
                                <FaShareAlt onClick={() => { setShareModal(true) }} />
                            </div> :
                        <div className='d-flex justify-content-end s_share_icon' >
                            <GoHeart onClick={handleLoginShow} />
                            <FaShareAlt onClick={() => { setShareModal(true) }} />
                        </div>
                    }
                </div>
                <Row lg={2} className='gx-0 gx-md-4 pt-lg-4 pb-4 row-cols-1'>
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
                                {[...Array(4)].map((_, index) => {
                                    const media = product?.images?.[index];
                                    const isVideo = media && /\.(mp4|webm|ogg)$/i.test(media);
                                    const isImage = media && /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(media);

                                    return media ? (
                                        isVideo ? (
                                            <div
                                                className="s_product_video"
                                                onMouseLeave={handleStopclick}
                                                key={`video-${index}`}
                                            >
                                                <video ref={videoRef} controls={controlsVisible} muted>
                                                    <source src={media} type="video/mp4" />
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
                                            <div className='s_image'>
                                            <img
                                                key={`image-${index}`}
                                                src={media}
                                                alt={`product-media-${index}`}
                                                
                                                onClick={() => productImgHanddler(index)}
                                            />
                                            </div>
                                        ) : null
                                    ) : (
                                        <div className='s_blank_img'>
                                            <div
                                                className="s_product-image"
                                            >
                                                
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        }

                        <div className='s_product_slider'>
                            {product?.images?.length <= 6 ?
                                <div className='d-flex justify-content-sm-center overflow-auto'>
                                    {product.images?.map((item, index) => {
                                        const isVideo = /\.(mp4|webm|ogg)$/i.test(item);
                                        return (
                                            <div className='' key={index} >
                                                <div className='s_product_img' onClick={() => productImgHanddler(index)}>
                                                    {isVideo ?
                                                        <div className='s_product_video'
                                                            onMouseLeave={handleStopclick}
                                                            style={{ width: '100px', height: '100px' }}>
                                                            <video
                                                                className=''
                                                                muted>
                                                                <source src={item} type="video/mp4" />
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
                                    dots={false}
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
                                                            <video
                                                                className=''
                                                                muted>
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
                        <div className='s_productdetail_sec '>
                            <div className='d-none d-lg-block'>
                                {store ?
                                    isSelected ?
                                        <div className='d-flex justify-content-end s_share_icon' >
                                            <GoHeartFill className='s_active' onClick={() => { findWishlistID(product.id) }} />
                                            <FaShareAlt onClick={() => { setShareModal(true) }} />
                                        </div> :
                                        <div className='d-flex justify-content-end s_share_icon' >
                                            <GoHeart onClick={() => { addwishlistHandler(product.id) }} />
                                            <FaShareAlt onClick={() => { setShareModal(true) }} />
                                        </div> :
                                    <div className='d-flex justify-content-end s_share_icon' >
                                        <GoHeart onClick={handleLoginShow} />
                                        <FaShareAlt onClick={() => { setShareModal(true) }} />
                                    </div>
                                }
                            </div>
                            <h3 className='s_title text-capitalize text-center text-lg-start '>{product?.product_name}</h3>
                            <div className='s_rating d-flex justify-content-center justify-content-lg-start'>
                                {
                                    [...Array(5)].map((_, index) => {
                                        if (index < product?.total_rating) {
                                            return <img key={index} src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                        } else {
                                            return <img key={index} src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                            ;
                                        }
                                    })
                                }
                            </div>
                            <div className='d-flex align-items-center justify-content-center justify-content-lg-start'>
                                <h2 className='s_price text-center text-lg-start'>₹ {parseFloat(great_total).toFixed(2)}</h2>
                                {inStock === true ?  '' : <div className='s_stock_status'>out of stack</div>}
                            </div>
                            <p className='s_description text-center text-lg-start'>{product?.description}</p>

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
                                            {sizeOpen ? 
                                            <FaAngleUp className='ms-auto' style={{cursor:'pointer'}} onClick={()=>{setSizeOpen(false)}}/>
                                            :
                                            <FaAngleDown className='ms-auto' style={{cursor:'pointer'}} onClick={()=>{setSizeOpen(true)}}/>
                                            }
                                            <div className='s_size_menu'>
                                                { sizeOpen ? sizeArray.map((item) => {
                                                    return <div key={item} className={`s_size_box ${item === size ? 'active' : ''}`} onClick={() => { setSize(item) }}>{item}</div>
                                                }):''}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Diamond Quality</h4>
                                        <div className='s_box d-flex  align-items-center'>
                                            <span>{product?.diamond_quality || '--'}</span>
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
                                <Accordion flush>
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
                                    {store ? (
                                        <Link to={'/payment'} onClick={() => { buyNowHandling() }}>Buy Now</Link>
                                    ) : (
                                        <Link to={'#'} onClick={handleLoginShow}>Buy Now</Link>
                                    )}

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
                                <span>Return Period</span>
                                <p>10 days from delivery</p>
                                <span>Return Policy</span>
                                <p>Full refund and replacement</p>
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
                            {/* {console.log(product.category_name)} */}
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>Metal Details</h4>
                                <span className='d-flex justify-content-between'><p>Metal Type</p><b>{product?.metal || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Weight</p><b>{product?.weight && product?.gram
                                    ? `${(parseFloat(product.weight) + parseFloat(product.gram)).toFixed(2)}g`
                                    : `${product.weight}g`} </b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>{product?.metal_color || '-'}</b></span>
                            </div>
                            <div className='s_table s_w_40'>
                                <h4 className='s_table_head'>Diamond Details</h4>
                                <span className='d-flex justify-content-between'><p>Clarity</p><b>{product?.clarity || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Setting</p><b>{product?.diamond_setting || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Color</p><b>{product?.diamond_color || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Shape</p><b>{product?.diamond_shape || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>No. of Diamonds</p><b>{product?.no_of_diamonds || '-'}</b></span>
                            </div>
                            <div className='s_table s_w_30'>
                                <h4 className='s_table_head'>General Details</h4>
                                <span className='d-flex justify-content-between'><p>Jewellry Type</p><b>{product?.category_name || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Gender</p><b>{product?.gender || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Collection</p><b>{product?.collection || '-'}</b></span>
                                <span className='d-flex justify-content-between'><p>Occasion</p><b>{product?.occasion || '-'}</b></span>
                                <span className='d-flex justify-content-between word-wrap'><p>Size</p><b>{sizeArray.map((item) => item).join(', ') || '-'}</b></span>
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
                                    <td>{product?.price ? `₹ ${((product?.price) / (product?.weight)).toFixed(2)}/g` : '-'}</td>
                                    <td>{product?.weight ? `${product?.weight}g` : '-'}</td>
                                    <td>-</td>
                                    <td>₹ {metal_total}</td>
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
                                    <div className='d-flex s_review_div' key={index}>
                                        <div className='s_review_profile'>
                                            <p className='mb-0 text-capitalize'>{item.customer_name[0]}</p>
                                        </div>
                                        <div className='s_review_detail'>
                                            <p className='mb-0'>{item.customer_name}</p>
                                            <div className='s_rating'>
                                                {
                                                    [...Array(5)].map((_, index) => {
                                                        const rating = product?.total_rating;
                                                        if (index < Math.floor(rating)) {
                                                            return <img alt={index} src={fillstar} />;
                                                        } else if (index < rating) {

                                                            return <img alt={index} src={halfstar} />;
                                                        } else {

                                                            return <img alt={index} src={nofillstar} />;
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
                                                {/* {console.warn(item.like_or_dislike)} */}
                                                {store && item.like_or_dislike === 0 ? <>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiOutlineLike onClick={() => { handleLike(item.id, 1) }} />
                                                        <span>Like</span>
                                                    </div>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiOutlineDislike onClick={() => { handleLike(item.id, 2) }} />
                                                        <span>Dislike</span>
                                                    </div>
                                                </> : ''}
                                                {store && item.like_or_dislike === 1 ? <>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiFillLike onClick={() => { handleLike(item.id, 1) }} />
                                                        <span>Like</span>
                                                    </div>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiOutlineDislike onClick={() => { handleLike(item.id, 2) }} />
                                                        <span>Dislike</span>
                                                    </div>
                                                </> : ''}
                                                {store && item.like_or_dislike === 2 ? <>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiOutlineLike onClick={() => { handleLike(item.id, 1) }} />
                                                        <span>Like</span>
                                                    </div>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiFillDislike onClick={() => { handleLike(item.id, 2) }} />
                                                        <span>Dislike</span>
                                                    </div>
                                                </> : ''}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {reviewDetail.length > 4 ? <div className='s_view_all' onClick={() => setLgShow(true)}>
                            <Link>View All</Link>
                        </div> : ''}

                    </div>
                </div>
                <div className='s_also_like'>
                    <div className='d-flex justify-content-between'>
                        <h2>You may also like</h2>
                        <Link to={`/productlist/category/${product?.category_name}`}>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={3} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-4'>
                            {
                                youAlsoLike?.slice(0, itemsToShow).map((ele, id) => {
                                    const price = pricehandling(ele); 
                                    const discounted = ((parseFloat(ele.price_with_gst) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    let discountPrice = [];
                                    if (!isNaN(parseFloat(discounted))) {
                                        discountPrice = (parseFloat(ele.price_with_gst) + parseFloat(discounted)).toFixed(0);
                                    } else {
                                        discountPrice = ele.price_with_gst;
                                    }
                                    return (
                                        <Col key={id} className='py-4' onClick={() => { navigate(`/productdetail/${ele.id}`) }}>
                                            <div className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>

                                                <div className='s_card_text'>
                                                    <Link to={`/productdetail/${ele.id}`}>
                                                        <h5>{ele.product_name}</h5>
                                                        <p className='mb-0'><span className='mx-2'>₹ {parseFloat(price).toFixed(0)}</span><strike className="mx-2">₹ {discountPrice}</strike></p>
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
                    </div>
                </div>
                <div className='s_also_like'>
                    <div className='d-flex justify-content-between'>
                        <h2>People also search for</h2>
                        <Link to={`/productlist/all/null`}>View More</Link>
                    </div>
                    <div>
                        <Row xxl={5} lg={4} md={3} sm={3} className='s_seller_cards row-cols-1 gx-2 gx-sm-4'>
                            {
                                peopleAlsoSearch?.slice(0, itemsToShow).map((ele, id) => {
                                    const price = pricehandling(ele); 
                                    const discounted = ((parseFloat(ele.price_with_gst) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    let discountPrice = [];
                                    if (!isNaN(parseFloat(discounted))) {
                                        discountPrice = (parseFloat(ele.price_with_gst) + parseFloat(discounted)).toFixed(0);
                                    } else {
                                        discountPrice = ele.price_with_gst;
                                    }
                                    return (
                                        <Col key={id} className='py-4' onClick={() => { navigate(`/productdetail/${ele.id}`) }}>
                                            <div className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele?.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>
                                                <div className='s_card_text'>
                                                    <Link to={`/productdetail/${ele.id}`}>
                                                        <h5>{ele.product_name}</h5>
                                                        <p className='mb-0'><span className='mx-2'>₹ {parseFloat(price).toFixed(0)}</span><strike className="mx-2">₹ {discountPrice}</strike></p>
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
                        {reviewDetail?.map((item, index) => {
                            // console.log(item);
                            return (
                                <div className='d-flex s_review_div' key={index}>
                                    <div className='s_review_profile'>
                                        <p className='mb-0 text-capitalize'>{item.customer_name[0]}</p>
                                    </div>
                                    <div className='s_review_detail'>
                                        <p className='mb-0'>{item.customer_name}</p>
                                        <div className='s_rating'>
                                            {
                                                [...Array(5)].map((_, index) => {
                                                    const rating = item.rating;
                                                    if (index < Math.floor(rating)) {
                                                        return <img alt={index} src={fillstar} />;
                                                    } else if (index < rating) {

                                                        return <img alt={index} src={halfstar} />;
                                                    } else {

                                                        return <img alt={index} src={nofillstar} />;
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
                                        <div className='s_review_icon d-flex '>
                                            { store && item.like_or_dislike === 0 ? <>
                                                <div className="d-flex align-items-center me-4">
                                                    <AiOutlineLike onClick={() => { handleLike(item.id, 1) }} />
                                                    <span>Like</span>
                                                </div>
                                                <div className="d-flex align-items-center me-4">
                                                    <AiOutlineDislike onClick={() => { handleLike(item.id, 2) }} />
                                                    <span>Dislike</span>
                                                </div>
                                            </> : ''}
                                            { store && item.like_or_dislike === 1 ? <>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiFillLike onClick={() => { handleLike(item.id, 1) }} />
                                                        <span>Like</span>
                                                    </div>
                                                    <div className="d-flex align-items-center me-4">
                                                        <AiOutlineDislike onClick={() => { handleLike(item.id, 2) }} />
                                                        <span>Dislike</span>
                                                    </div>
                                                </> : ''}
                                            {store && item.like_or_dislike === 2 ? <>
                                                <div className="d-flex align-items-center me-4">
                                                    <AiOutlineLike onClick={() => { handleLike(item.id, 1) }} />
                                                    <span>Like</span>
                                                </div>
                                                <div className="d-flex align-items-center me-4">
                                                    <AiFillDislike onClick={() => { handleLike(item.id, 2) }} />
                                                    <span>Dislike</span>
                                                </div>
                                            </> : ''}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
            {/* login modal component */}
            <Login isOpen={showLogin} onClose={() => handleLoginClose()} onOpen={() => handleLoginShow()}>
            </Login>

            {/* share link modal */}
            <Modal className='s_share_madal'
                show={shareModal}
                onHide={() => setShareModal(false)}
                centered>
                <Modal.Header closeButton className='border-0'>
                    <Modal.Title id="" className='fs-3'>
                        Share Your Discovery!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='s_product d-flex align-items-center'>
                        <img alt='product_img' src={product?.images?.[0]}></img>
                        <p>{product?.product_name}</p>
                    </div>
                    <div className='s_link'>
                        <div className='s_link_url text-truncate'>{window.location.href}</div>
                        <div className='s_link_btn' onClick={() => { copyLinkHandle() }}>Copy URL</div>
                    </div>
                    <div className='s_link_icon'>
                        <Link to={''} onClick={() => { shareOnFacebook() }}>
                            <div>
                                <img alt='facebook' src={require('../Img/Sujal/facebook.png')}></img>
                                <p>facebook</p>
                            </div>
                        </Link>
                        <Link to={''} onClick={() => { shareOnWhatsApp() }}>
                            <img alt='facebook' src={require('../Img/Sujal/whatsapp.png')}></img>
                            <p>Whatsapp</p>
                        </Link>
                        <Link to={''} onClick={() => { shareOnX() }}>
                            <img alt='facebook' src={require('../Img/Sujal/twitter.png')}></img>
                            <p>X</p>
                        </Link>
                        <Link to={''} onClick={() => { shareOnInstagram() }}>
                            <img alt='facebook' src={require('../Img/Sujal/instagram.png')}></img>
                            <p>Instagram</p>
                        </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ProductDetail;