import { Nav, Offcanvas, Accordion } from 'react-bootstrap';
import '../Css/Sujal/Header.css';
import { IoCartOutline, IoCloseOutline, IoPersonOutline, IoSearch } from 'react-icons/io5';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/noteContext';
import { Link, useLocation } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import Login from './Login';






function Header() {
    const { allProduct, allSubCategory, bestseller, wishlistData, cartData, store } = useContext(noteContext);
    // menu catgegory handller
    const [goldSubcate, setGoldSubcate] = useState([]);
    const [silverSubcate, setSilverSubcate] = useState([]);
    const [diamondSubcate, setDiamondSubcate] = useState([]);
    const [earingSubcate, setEaringSubcate] = useState([]);
    const [ringSubcate, setRingSubcate] = useState([]);
    const [pendantsSubcate, setPendantSubcate] = useState([]);
    const [platiumSubcate, setPlatiumSubcate] = useState([]);
    const [watchSubcate, setWatchSubcate] = useState([]);
    // const [storedata, setstoredata] = useState(() => JSON.parse(localStorage.getItem("Login"))); // Initialize directly
    // const [store, setStore] = useState('');

    useEffect(() => {
        const goldCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Gold") {
                goldCategories.push(ele);
            }
            return null;
        });
        setGoldSubcate(goldCategories);
        const silverCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Silver") {
                silverCategories.push(ele);
            }
            return null;
        });
        setSilverSubcate(silverCategories);
        const diamondCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Diamond") {
                diamondCategories.push(ele);
            }
            return null;
        });
        setDiamondSubcate(diamondCategories);
        const earingCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Earrings") {
                earingCategories.push(ele);
            }
            return null;
        });
        setEaringSubcate(earingCategories);
        const ringCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Rings") {
                ringCategories.push(ele);
            }
            return null;
        });
        setRingSubcate(ringCategories);
        const pendantCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Pendants") {
                pendantCategories.push(ele);
            }
            return null;
        });
        setPendantSubcate(pendantCategories);
        const PlatinumCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Platinum") {
                PlatinumCategories.push(ele);
            }
            return null;
        });
        setPlatiumSubcate(PlatinumCategories);
        const watchCategories = [];
        allSubCategory.map((ele) => {
            if (ele.category_name === "Watch") {
                watchCategories.push(ele);
            }
            return null;
        });
        setWatchSubcate(watchCategories);
    }, [allSubCategory]);

    const [menGold, setMenGold] = useState([]);
    const [menSilver, setMenSilver] = useState([]);
    useEffect(() => {
        // filter product by category
        //   for gold
        const goldProducts = allProduct.filter(
            (ele) => ele.category_name === "Gold" && ele.gender === "male"
        );


        const uniqueGoldProducts = goldProducts.filter(
            (ele, index, self) =>
                index === self.findIndex((item) => item.category_name === ele.category_name)
        );

        setMenGold(uniqueGoldProducts);


        //   for silver
        const silverProducts = allProduct.filter(
            (ele) => ele.category_name === "Silver" && ele.gender === "male"
        );
        const uniqueSilverProducts = silverProducts.filter(
            (ele, index, self) =>
                index === self.findIndex((item) => item.category_name === ele.category_name)
        );

        setMenSilver(uniqueSilverProducts);
    }, [allProduct]);
    // menu catgegory handller over ---------------

    // search handdig 

    const [Search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [PopularData, setPopularData] = useState();
    const [SearchModal, setSearchModal] = useState(false);
    const searchHandle = () => {
        var data = document.getElementById('searchData').value;
        const filteredSearchData = allProduct.filter(item => item.product_name.toLowerCase().includes(data));
        // console.log(filteredSearchData);
        setSearchData(filteredSearchData);
        const filteredPopularData = bestseller.filter(item => item.product_name.toLowerCase().includes(data));
        setPopularData(filteredPopularData);
        // console.warn(data);
        if (data.length > 0) {
            setSearchModal(true);
        }
        else {
            setSearchModal(false);
        }
        setSearch(data);
    }



    // offcanvas 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // LoginModal handing
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    // heart handler logic
    const [isFilled, setIsFilled] = useState(false);
    const location = useLocation(); // React Router hook to get the current location

    useEffect(() => {
        if (location.pathname === '/wishlist') {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [location.pathname]); // Dependency array listens to changes in pathname


    return (
        <>
            <div className="text-center s_header_top">
                <p className='ds_container mb-0'>Welcome to our Store</p></div>
            <section className='ds_container s_header_sec d-flex justify-content-between flex-wrap flex-lg-nowrap'>
                <div className='s_header_input d-flex justify-content-between align-items-center col-lg-4 col-12 order-lg-1 order-3'>
                    <input type='text' id='searchData' placeholder='Search for Jewellery and more...' onChange={(e) => { searchHandle(); }}></input>
                    <IoSearch onClick={(e) => { searchHandle(null); }} />
                </div>
                <Link className='s_logo text-decoration-none col-lg-4 col-4 ms-lg-auto order-lg-2 order-1 align-self-center '>
                    <h2 className='text-lg-center mb-0'>LOGO</h2>
                </Link>
                <div className='col-lg-4 col-4 d-flex justify-content-end align-items-center order-lg-3 order-2'>
                    {store ? <Link to={'/wishlist'} className={`s_header_icon s_heart_icons ${isFilled ? "filled" : "empty"}`}>
                        <div class="position-relative">
                            {isFilled ? <IoMdHeart /> : <IoMdHeartEmpty />}
                            <span class="position-absolute  translate-middle badge rounded-pill" style={{ background: 'var(--brown)', top: '5px' }}>
                                {wishlistData.length}
                            </span>
                        </div>
                        <p className='mb-0'>Wishlist</p>
                    </Link> :
                        <Link to={'#'} onClick={handleLoginShow} className={`s_header_icon s_heart_icons ${isFilled ? "filled" : "empty"}`} >
                            {isFilled ? <IoMdHeart /> : <IoMdHeartEmpty />}

                            <p className='mb-0'>Wishlist</p>
                        </Link>}
                    {store ? <Link to={'/cart'} className='s_header_icon'>
                        <div class="position-relative">
                            <IoCartOutline />
                            <span class="position-absolute   translate-middle badge rounded-pill" style={{ background: 'var(--brown)', top: '5px' }}>
                                {cartData?.length}
                            </span>
                        </div>
                        <p className='mb-0'>Cart</p>
                    </Link> : <Link to={'#'} onClick={handleLoginShow} className='s_header_icon'>
                        <IoCartOutline />
                        <p className='mb-0'>Cart</p>
                    </Link>}

                    {
                        store ? (<Link to={'/myprofile'} className='s_header_icon'>
                            <IoPersonOutline />
                            <p className='mb-0 text-capitalize'>{store?.name}</p>
                        </Link>) :
                            (<Link to={'#'} className='s_header_icon' onClick={handleLoginShow}>
                                <IoPersonOutline />
                                <p className='mb-0'>Account</p>
                            </Link>)
                    }

                    <Link to={'#'} className=' d-lg-none d-flex align-items-center fs-2 s_bar_icon' onClick={handleShow}>
                        <FaBars />
                    </Link>
                </div>
            </section>
            <section className='s_header_menu  d-none d-lg-block'>
                <Nav className='justify-content-between ds_container  flex-nowrap px-0 text-nowrap'>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={'/productlist/all/null'} className='ps-md-0'>All Jewellery</Link>
                        <div className='s_submenu'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {allSubCategory.slice(0, 9).map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/search/${ele.name.endsWith('s') ? ele.name.slice(0, -1) : ele.name}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Gender</h4>
                                <Link to="/productlist/all/gender/Men">Men</Link>
                                <Link to="/productlist/all/gender/Women">Women</Link>
                                <Link to="/productlist/all/gender/Kids">Kids & Teens</Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price Band</h4>
                                <Link to="/productlist/all/price/<25">&lt;25K</Link>
                                <Link to="/productlist/all/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/all/price/100>">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={`/productlist/category/Gold`}>Gold</Link>
                        <div className='s_submenu   '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {goldSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Men</h4>
                                {menGold.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/gold/men/${ele.sub_category_name}`} key={ele.id}><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Gold Coin</h4>
                                <Link to={`/productlist/category/Gold Coin`}>Special Coin</Link>
                                <Link to="/productlist/gold coin/weight/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/8">8 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/25">25 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/30">30 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/50">50 Gm.</Link>
                                <Link to="/productlist/gold coin/weight/100">100 Gm.</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={`/productlist/category/Silver`}>Silver</Link>
                        <div className='s_submenu '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {silverSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Men</h4>
                                {menSilver.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/silver/men/${ele.sub_category_name}`} key={ele.id}><img alt={ele.sub_category_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/silver/price/<25">&lt;25K</Link>
                                <Link to="/productlist/silver/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/silver/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/silver/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='d-flex'>
                        <Link to={`/productlist/category/Diamond`}>Diamond</Link>
                        <div className='s_submenu s_pos_50 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {diamondSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list '>
                                <h4 className='s_submenu_head ps-0'>Earrings</h4>
                                {earingSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Rings</h4>
                                {ringSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Pendants</h4>
                                {pendantsSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/diamond/price/<25">&lt;25K</Link>
                                <Link to="/productlist/diamond/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/diamond/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/diamond/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='d-flex'>
                        <Link to={`/productlist/category/Platinum`}>Platinum</Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Category</h4>
                                {platiumSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Price</h4>
                                <Link to="/productlist/platinum/price/<25">&lt;25K</Link>
                                <Link to="/productlist/platinum/price/25-50">25K - 50K</Link>
                                <Link to="/productlist/platinum/price/50-100">50K - 1L</Link>
                                <Link to="/productlist/platinum/price/>100">1L & Above</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='d-flex'>
                        <Link to={`/productlist/category/Gold Coin`}>Gold Coins</Link>
                        <div className='s_submenu s_pos_50'>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>24 Kt (995)</h4>
                                <Link to="/productlist/gold coin/24/0.5">0.5 Gm.</Link>
                                <Link to="/productlist/gold coin/24/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/24/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/24/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/24/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/24/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/24/20">20 Gm.</Link>
                                <Link to="/productlist/gold coin/24/50">50 Gm.</Link>
                            </div>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>22 Kt (916)</h4>
                                <Link to="/productlist/gold coin/22/1">1 Gm.</Link>
                                <Link to="/productlist/gold coin/22/2">2 Gm.</Link>
                                <Link to="/productlist/gold coin/22/4">4 Gm.</Link>
                                <Link to="/productlist/gold coin/22/5">5 Gm.</Link>
                                <Link to="/productlist/gold coin/22/10">10 Gm.</Link>
                                <Link to="/productlist/gold coin/22/20">20 Gm.</Link>
                                <Link to="/productlist/gold coin/22/50">50 Gm.</Link>
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to="/productlist/occasion/bridal wear">Wedding</Link>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={`/productlist/category/Watch`}>Watches</Link>
                        <div className='s_submenu s_pos_100 '>
                            <div className='s_submenu_list'>
                                <h4 className='s_submenu_head ps-0'>Brands</h4>
                                {watchSubcate.map((ele, id) => {
                                    return (
                                        <Link to={`/productlist/subcategory/${ele.id}`} key={ele.id}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    </Nav.Item>
                    <Nav.Item className='position-relative d-flex'>
                        <Link to={'/productlist/all/null'} className='pe-md-0'>Gifting</Link>
                        <div className='s_submenu s_small_submenu s_pos_100'>
                            <div className='s_submenu_list '>
                                <Link to="/productlist/gift/Gifting for loved ones/Women">Gifting for loved ones</Link>
                                <Link to={'/productlist/gift/Gifting for loved ones/all'}>Gift Cards</Link>
                                <Link to="/productlist/gift/Gifting for loved ones/Men">Corporate Gifting</Link>
                            </div>
                        </div>
                    </Nav.Item>
                </Nav>
            </section>

            {/* offcanvas from 991px */}
            <Offcanvas show={show} onHide={handleClose} className='sp_header_offcanvas d-lg-none' responsive='lg'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className='s_logo'>
                            <h2 className='text-lg-center mb-0'>LOGO</h2>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className=''>
                    <Accordion flush>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header ><h4 className='s_submenu_head px-0'>All Category</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="00">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {allSubCategory.slice(0, 9).map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="01">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gender</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/all/gender/Men">Men</Link></p>
                                                <p><Link to="/productlist/all/gender/Women">Women</Link></p>
                                                <p><Link to="/productlist/all/gender/Kids">Kids & Teens</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="02">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price Band</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/all/price/<25">&lt;25K</Link></p>
                                                <p> <Link to="/productlist/all/price/25-50">25K - 50K</Link></p>
                                                <p> <Link to="/productlist/all/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gold</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="10">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {goldSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="11">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {menGold.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/gold/men/${ele.sub_category_name}`} ><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="12">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Gold Coin</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to={`/productlist/category/Gold Coin`}>Special Coin</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/8">8 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/20">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/25">25 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/30">30 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/50">50 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/weight/100">100 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Silver</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="20">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {silverSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="21">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Men</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {menSilver.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/silver/men/${ele.sub_category_name}`} ><img alt={ele.product_name} src={ele.images[0]}></img>{ele.sub_category_name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="22">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/silver/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/silver/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/silver/price/50-100">50K - 1L</Link></p>
                                                <p><Link to="/productlist/silver/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Diamond</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="30">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {diamondSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="31">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Earrings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {earingSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="32">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Rings</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {ringSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="33">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Pendants</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {pendantsSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="34">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/Diamond/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/Diamond/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/Diamond/price/50-100">50K - 1L</Link></p>
                                                <p><Link to="/productlist/Diamond/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Platinum</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="40">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Category</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {platiumSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`} ><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="41">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Price</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/platinum/price/<25">&lt;25K</Link></p>
                                                <p><Link to="/productlist/platinum/price/25-50">25K - 50K</Link></p>
                                                <p><Link to="/productlist/platinum/price/>100">1L & Above</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gold Coins</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="50">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>24 Kt (995)</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/gold coin/24/0.5">0.5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/10">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/20">20 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/24/50">50 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="51">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>22 Kt (916)</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                <p><Link to="/productlist/gold coin/22/1">1 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/2">2 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/4">4 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/5">5 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/10">10 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/20">20 Gm.</Link></p>
                                                <p><Link to="/productlist/gold coin/22/50">50 Gm.</Link></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className='sp_spacial_accitem'>
                            <Link to="/productlist/occasion/bridal wear" className='s_spec_submenu_head'><h4>Wedding</h4></Link>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Watches</h4></Accordion.Header>
                            <Accordion.Body>
                                <Accordion flush>
                                    <Accordion.Item eventKey="70">
                                        <Accordion.Header><h4 className='s_submenu_head px-0'>Brands</h4></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='s_submenu_list'>
                                                {watchSubcate.map((ele, id) => {
                                                    return (
                                                        <p key={ele.id}><Link to={`/productlist/subcategory/${ele.id}`}><img alt={ele.name} src={ele.image}></img>{ele.name}</Link></p>
                                                    )
                                                })}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                            <Accordion.Header><h4 className='s_submenu_head px-0'>Gifting</h4></Accordion.Header>
                            <Accordion.Body>
                                <div className='s_submenu_list'>
                                    <p><Link to="/productlist/all/gender/Women">Gifting for loved ones</Link></p>
                                    <p><Link to={'/productlist/all/null'}>Gift Cards</Link></p>
                                    <p><Link to="/productlist/all/gender/Men">Corporate Gifting</Link></p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>






            {/* search section */}
            <section className={`s_search_sec ${SearchModal ? 'show' : ''}`}>
                {searchData.length === 0 ?
                    <>
                        <div className='s_serach_head  border-0'><IoCloseOutline className='ms-auto ' onClick={() => { setSearchModal(false) }} /></div>
                        <div className='s_search_not'>
                            <h2>No result found.</h2></div>
                    </>
                    : <>
                        <div className='s_serach_head'><h5 className='mb-0'>Suggestions</h5><IoCloseOutline onClick={() => { setSearchModal(false) }} /></div>
                        {searchData.slice(0, 8).map((el, id) => {
                            return (
                                <div key={id} className='s_search_item'>
                                    <p>
                                        <Link to={`productdetail/${el.id}`}>
                                            <Highlighter
                                                highlightClassName="text-dark bg-transparent p-0"
                                                searchWords={[Search]} // Replace 'Search' with the array of words you want to highlight
                                                autoEscape={true}   // Ensure special characters are escaped
                                                textToHighlight={el.product_name} // The text where you want to apply the highlight
                                            />
                                        </Link>
                                    </p>
                                </div>
                            )
                        })}
                        <div className='s_serach_head'><h5 className='mb-0'>Popular Products</h5></div>
                        {PopularData.slice(0, 4).map((el, id) => {
                            const discounted = ((parseFloat(el.total_price) * parseFloat(el.discount)) / 100).toFixed(2);
                            let discountPrice = [];
                            console.log(el.product_name, discounted);
                            if (!isNaN(parseFloat(discounted))) {
                                discountPrice = (parseFloat(el.total_price) - parseFloat(discounted)).toFixed(2);
                            } else {
                                discountPrice = el.total_price;
                            }
                            return (
                                <div key={id} lassName='s_search_item'>
                                    <Link to={`productdetail/${el.id}`} className='d-flex align-items-center'>
                                        <img src={el.images[0]} alt={el.product_name}></img>
                                        <div>
                                            <p className='mb-0'>{el.product_name}</p>
                                            <span>
                                                <small>₹{discountPrice}</small>
                                                <strike>₹{el.total_price}</strike>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </>
                }
                <Link to={`/productlist/search/${Search}`} className='s_serach_head border-top border-0 mt-auto'><h5 className='mb-0'>Search for “{Search}”</h5><FaArrowRight /></Link>
            </section>

            {/* login modal component */}
            <Login isOpen={showLogin} onClose={() => handleLoginClose()} onOpen={() => handleLoginShow()}>
            </Login>

        </>
    );
}
export default Header;