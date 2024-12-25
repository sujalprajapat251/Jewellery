import { Accordion, Col, Offcanvas, Row } from 'react-bootstrap';
import '../Css/Sujal/ProductList.css'
import { useContext, useEffect, useState } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import { IoCloseOutline } from 'react-icons/io5';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import noteContext from '../Context/noteContext';
import axios from 'axios';
function ProductList() {
    const { Api, token, allProduct } = useContext(noteContext);

    // backend connection code
    const { id, type } = useParams();
    const { category, field, value } = useParams();
    // get subcategory data
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [isRing, setIsRing] = useState(false);
    const [isWatch, setIsWatch] = useState(false);

    useEffect(() => {
        // console.warn('type',type);
        if (type === 'subcategory') {
            axios.get(`${Api}/subcategories/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const data = response.data.subCategory;
                const checkRing = data.name?.includes('Ring') || data.category_name?.includes('Ring');
                setIsRing(checkRing);
                const checkWatch = data.name?.includes('Watch') || data.category_name?.includes('Watch');
                setIsWatch(checkWatch);
                setSubCategoryData(response.data.subCategory);
                // console.log('subCategory', checkRing , checkWatch)
            });
        }
    }, [id, type, Api, token]);


    //  fliter handling
    const [productList_detail, setproductList_detail] = useState([]);
    const [productlist, setProductList] = useState([]);


    // useNav baar filyterin handler
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let product = []
        if (type === 'subcategory') {
            product = allProduct?.filter((product) => { return product.sub_category_id === parseInt(id); })
        }
        if (type === 'category') {
            product = allProduct?.filter((product) => { return ((product.category_name).toLowerCase()).includes((id).toLowerCase()) })
        }
        if (type === 'search') {
            product = allProduct?.filter((product) => { return product.product_name.toLowerCase().includes(id.toLowerCase()); })
        }
        if (type === 'all') {
            product = allProduct;
        }
        if (type === 'occasion') {
            console.log(allProduct?.map((product) => product.occasion));
            product = allProduct?.filter(product =>
                product.occasion?.includes(
                    id
                )
            );
            console.log('product', product);
        }


        // other conditions
        if (category) {
            if (category === 'all') {
                if (field === 'price') {
                    let price = [];
                    if (value.includes('>')) {
                        price = [value.replace('>', '')]; // Handle greater-than condition
                    } else if (value.includes('<')) {
                        price = [value.replace('<', '')]; // Handle less-than condition
                    } else {
                        price = value.split('-'); // Handle range condition
                    }

                    const minPrice = parseInt(price[0], 10) * 1000;
                    const maxPrice = price[1] ? parseInt(price[1], 10) * 1000 : null;

                    product = allProduct?.filter((product) => {
                        if (value.includes('>')) {
                            return product.total_price >= minPrice;
                        } else if (value.includes('<')) {
                            return product.total_price <= minPrice;
                        } else {
                            return (
                                product.total_price >= minPrice &&
                                product.total_price <= maxPrice
                            );
                        }
                    });
                } else if (field === 'gender') {
                    product = allProduct?.filter((product) =>
                        product.gender?.toLowerCase() === value.toLowerCase()
                    );
                }
            }
            else if (category === 'gold coin') {
                const data = allProduct?.filter((product) => product?.category_name === 'Gold Coin')
                if (field === 'weight') {
                    product = data?.filter(product =>
                        product?.weight === (parseFloat(value)).toFixed(2)
                    );
                }
                else {
                    product = data?.filter((product) =>
                        product?.metal.includes(field) && product?.weight === (parseFloat(value)).toFixed(2)
                    );
                }
            }
            else {
                const data = allProduct?.filter((product) => (product.category_name.toLowerCase()).includes(category.toLowerCase()));
                if (field === 'price') {
                    let price = [];
                    if (value.includes('>')) {
                        price = [value.replace('>', '')]; // Handle greater-than condition
                    } else if (value.includes('<')) {
                        price = [value.replace('<', '')]; // Handle less-than condition
                    } else {
                        price = value.split('-'); // Handle range condition
                    }

                    const minPrice = parseInt(price[0], 10) * 1000;
                    const maxPrice = price[1] ? parseInt(price[1], 10) * 1000 : null;

                    product = data?.filter((product) => {
                        if (value.includes('>')) {
                            return product.total_price >= minPrice;
                        } else if (value.includes('<')) {
                            return product.total_price <= minPrice;
                        } else {
                            return (
                                product.total_price >= minPrice &&
                                product.total_price <= maxPrice
                            );
                        }
                    });
                } else if (field === 'men') {
                    product = data?.filter(product =>
                        (product?.gender.toLowerCase() === 'men' || product?.gender.toLowerCase() === 'male') && product?.sub_category_name.includes(value)
                    );
                }

                console.log('pro', data);
            }
        }


        setproductList_detail(product);
        setProductList(product);
    }, [id, allProduct, type, category, value, field])






    // flitering functionality
    let filters = [];
    if (isWatch) {
        filters = {
            gender: [...new Set(productlist?.map(item => item?.gender).filter(value => value) || [])],
            theme: [...new Set(productlist?.map(item => item?.theme).filter(value => value) || [])],
            clasp_type: [...new Set(productlist?.map(item => item?.clasp_type).filter(value => value) || [])],
            metal_color: [...new Set(productlist?.map(item => item?.metal_color).filter(value => value) || [])],
            occasion: [...new Set(productlist?.map(item => item?.occasion).filter(value => value) || [])],
        }
    }
    else if (isRing) {
        filters = {
            gender: [...new Set(productlist?.map(item => item?.gender).filter(value => value) || [])],
            // purity: [...new Set(productlist?.map(item => item?.metal).filter(value => value) || [])],
            occasion: [...new Set(productlist?.map(item => item?.occasion).filter(value => value) || [])],
            clarity: [...new Set(productlist?.map(item => item?.clarity).filter(value => value) || [])],
            metal: [...new Set(productlist?.map(item => item?.metal).filter(value => value) || [])],
            metal_color: [...new Set(productlist?.map(item => item?.metal_color).filter(value => value) || [])],

        };
    }
    else {
        filters = {
            gender: [...new Set(productlist?.map(item => item?.gender).filter(value => value) || [])],
            // purity: [...new Set(productlist?.map(item => item?.metal).filter(value => value) || [])],
            occasion: [...new Set(productlist?.map(item => item?.occasion).filter(value => value) || [])],
            clarity: [...new Set(productlist?.map(item => item?.clarity).filter(value => value) || [])],
            metal: [...new Set(productlist?.map(item => item?.metal).filter(value => value) || [])],
            metal_color: [...new Set(productlist?.map(item => item?.metal_color).filter(value => value) || [])],
            size_name: [
                ...new Set(
                    productlist
                        ?.flatMap(item => item?.size_name?.split(',').map(Number) || []) // Split and convert to numbers
                        .filter(value => !isNaN(value)) // Remove invalid numbers
                ),
            ],
        };
    }
    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        if (isWatch) {
            setSelectedFilters({ gender: [], theme: [], clasp_type: [], metal_color: [], occasion: [] });
        } else if (isRing) {
            setSelectedFilters({ gender: [], purity: [], occasion: [], clarity: [], metal: [], metal_color: [], size_name: [] });
        } else {
            setSelectedFilters({ gender: [], purity: [], occasion: [], clarity: [], metal: [], metal_color: [] });
        }
    }, [isWatch, isRing]);

    const filterHandler = (type, value, index) => {
        // alert('')
        console.error(selectedFilters);
        let currentValues, updatedValues;
        setSelectedFilters((prev) => {
            currentValues = prev[type];
            console.warn('index', prev[type].includes(value));
            if ((prev[type].includes(value) && index) === 0) {
                const checkboxId = `${type}-${index}`;
                console.log('selected', checkboxId);
                var idx = document.getElementById(checkboxId);
                console.log('id', idx);
                if (idx.checked === true) {
                    idx.checked = false;
                }
            }
            updatedValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [type]: updatedValues };
        });
    };

    const [minValue, set_minValue] = useState();
    const [maxValue, set_maxValue] = useState();
    const [maxPrice, setMaxPrice] = useState(100000);

    useEffect(() => {
        if (productlist?.length > 0) {
            const prices = productlist
                .map(item => item?.total_price)
                .filter(price => price !== undefined && price !== null);

            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                set_minValue(minPrice);
                set_maxValue(maxPrice);
                setMaxPrice(maxPrice);
            }
        }
    }, [productlist]);

    let condition;
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
    useEffect(() => {
        fliteringhandle(condition);
        // eslint-disable-next-line
    }, [selectedFilters, minValue, maxValue]);
    const fliteringhandle = (x) => {
        condition = x;
        const filterData = productlist?.filter((item) =>
            // Check all selected filters
            Object.keys(selectedFilters).every(key =>
                selectedFilters[key].length === 0 || selectedFilters[key].includes(item[key])
            ) &&
            (item.total_price >= minValue && item.total_price <= maxValue)
            // Check price range
        );
        // let filteredData = [];
        let sortedData = [];


        if (condition === 1) {
            sortedData = filterData.sort((a, b) => b.total_rating - a.total_rating);
        }
        else if (condition === 2) {
            sortedData = filterData.sort((a, b) => a.total_price - b.total_price);
        }
        else if (condition === 3) {
            sortedData = filterData.sort((a, b) => b.total_price - a.total_price);
        }
        else if (condition === 4) {
            sortedData = filterData.reverse();
        }
        else {
            sortedData = filterData;
        }
        console.log('sort', sortedData)
        setproductList_detail(sortedData);
    }






    // offcanvas handdler   
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <section className="d-md-flex ds_container">


                {/* default fliter */}
                {isRing === false && isWatch === false ?
                    <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Fliter</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='px-0'>
                            <div className="s_fliter" flush='true'>
                                <div className='s_fliter_head d-none d-md-block'>
                                    <h4>Filter</h4>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="s_price_slider">
                                                <MultiRangeSlider
                                                    min={0}
                                                    max={maxPrice}
                                                    step={10000}
                                                    minValue={minValue}
                                                    maxValue={maxValue}
                                                    onInput={handleInput}
                                                />
                                                <div className='d-flex justify-content-between align-items-center flex-wrap s_slider_text'>
                                                    <p>min : ₹ {minValue}</p>
                                                    <p>max : ₹ {maxValue}</p>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {Object.keys(filters).map((filterType, index) => {
                                        const formattedWord = filterType.charAt(0).toUpperCase() + filterType.slice(1).toLowerCase();
                                        return (

                                            < Accordion.Item eventKey={index} key={filterType} >
                                                <Accordion.Header className='text-capitalize' ><p className='mb-0'> {filterType === 'size_name' ? 'width' : formattedWord}</p> </Accordion.Header>
                                                <Accordion.Body>
                                                    {filters?.[filterType].map((value, index) => (
                                                        // console.log('id123', typeof(filterType+index))
                                                        <div key={value} className="d-flex align-items-center s_checkbox">
                                                            <input type="checkbox" className="me-2" id={`${filterType}-${index}`}
                                                                name={filterType} value={value} onChange={() => { filterHandler(filterType, value) }}></input>
                                                            <label htmlFor={`${filterType}-${index}`} className='text-capitalize'> {value} </label>
                                                        </div>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                    : ''}


                {/*  filter option for rings  */}
                {isRing === true ?
                    <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Filter</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='px-0'>
                            <div className="s_fliter " flush='true'>
                                <div className='s_fliter_head d-none d-md-block'>
                                    <h4>Filter</h4>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="s_price_slider">
                                                <MultiRangeSlider
                                                    min={0}
                                                    max={maxPrice}
                                                    step={10000}
                                                    minValue={minValue}
                                                    maxValue={maxValue}
                                                    onInput={handleInput}
                                                />
                                                <div className='d-flex justify-content-between align-items-center flex-wrap s_slider_text'>
                                                    <p>min : ₹ {minValue}</p>
                                                    <p>max : ₹ {maxValue}</p>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {Object.keys(filters).map((filterType, index) => {
                                        const formattedWord = filterType.charAt(0).toUpperCase() + filterType.slice(1).toLowerCase();
                                        return (

                                            < Accordion.Item eventKey={index} key={filterType} >
                                                <Accordion.Header className='text-capitalize' ><p className='mb-0'> {filterType === 'size_name' ? 'width' : formattedWord}</p> </Accordion.Header>
                                                <Accordion.Body>
                                                    {filters?.[filterType].map((value, index) => (
                                                        // console.log('id123', typeof(filterType+index))
                                                        <div key={value} className="d-flex align-items-center s_checkbox">
                                                            <input type="checkbox" className="me-2" id={`${filterType}-${index}`}
                                                                name={filterType} value={value} onChange={() => { filterHandler(filterType, value) }}></input>
                                                            <label htmlFor={`${filterType}-${index}`} className='text-capitalize'> {value} </label>
                                                        </div>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion >
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                    : ''}

                {/*  filter option for watch  */}
                {isWatch === true ?
                    <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Filter</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='px-0'>
                            <div className="s_fliter" flush='true'>
                                <div className='s_fliter_head d-none d-md-block'>
                                    <h4>Filter</h4>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="s_price_slider">
                                                <MultiRangeSlider
                                                    min={0}
                                                    max={maxPrice}
                                                    step={10000}
                                                    minValue={minValue}
                                                    maxValue={maxValue}
                                                    onInput={handleInput}
                                                />
                                                <div className='d-flex justify-content-between align-items-center flex-wrap s_slider_text'>
                                                    <p>min : ₹ {minValue}</p>
                                                    <p>max : ₹ {maxValue}</p>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {Object.keys(filters).map((filterType, index) => {
                                        const formattedWord = filterType.charAt(0).toUpperCase() + filterType.slice(1).toLowerCase();
                                        return (

                                            < Accordion.Item eventKey={index} key={filterType} >
                                                <Accordion.Header className='text-capitalize' ><p className='mb-0'> {filterType === 'size_name' ? 'width' : formattedWord}</p> </Accordion.Header>
                                                <Accordion.Body>
                                                    {filters?.[filterType].map((value, index) => (
                                                        // console.log('id123', typeof(filterType+index))
                                                        <div key={value} className="d-flex align-items-center s_checkbox">
                                                            <input type="checkbox" className="me-2" id={`${filterType}-${index}`}
                                                                name={filterType} value={value} onChange={() => { filterHandler(filterType, value) }}></input>
                                                            <label htmlFor={`${filterType}-${index}`} className='text-capitalize'> {value} </label>
                                                        </div>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                    : ''}





                <div className='s_responsive_fliter d-md-none d-flex justify-content-between align-items-center'>
                    <p className='mb-0'>Fliter</p>
                    <FaBars onClick={handleShow} />
                </div>
                <div className='s_product_list flex-fill'>
                    <div className='s_top d-sm-flex justify-content-between'>
                        <h4 className='text-nowrap align-self-center'>{subCategoryData.name}</h4>
                        <div className='d-lg-flex '>
                            <div className='d-flex flex-wrap'>
                                {   
                                    Object.entries(selectedFilters).map(([key, values]) => (
                                        values.length > 0 ? (
                                            values.map((value, index) => (
                                                <div key={index} className='s_fliter_option'>
                                                    <p>{value}</p>
                                                    <IoCloseOutline onClick={() => filterHandler(key, value, index)} />
                                                </div>
                                            ))
                                        ) : null
                                    ))
                                }
                                {/* {selectedFilters.map((ele, ind) => {
                                    return (
                                        <div className='s_fliter_option' key={ind}>
                                            <p>{ele.name}</p>
                                            <IoCloseOutline  />
                                        </div>
                                    );
                                })} */}
                            </div>
                            <div className='s_fliter_select w-auto'>
                                <p className='mb-0 text-nowrap'>Sort by</p>
                                <FaAngleDown />
                                <div className='s_sortby_menu'>

                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='Best Sellings' onClick={() => { fliteringhandle(1) }}></input>
                                        <label htmlFor='Best Sellings' >Best Sellings</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='low to high' onClick={() => { fliteringhandle(2) }}></input>
                                        <label htmlFor='low to high'>Price (low to high)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='high to low' onClick={() => { fliteringhandle(3) }}></input>
                                        <label htmlFor='high to low'>Price (high to low)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='New Arrivals' onClick={() => { fliteringhandle(4) }}></input>
                                        <label htmlFor='New Arrivals'>New Arrivals</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='Recommendations' onClick={() => { fliteringhandle(5) }}></input>
                                        <label htmlFor='Recommendations'>Recommendations</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Row xxl={4} lg={3} md={2} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-3 '>
                            {
                                productList_detail.map((ele, id) => {

                                    const discounted = ((parseFloat(ele.total_price) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    let discountPrice = [];
                                    console.log(ele.product_name, discounted);
                                    if (!isNaN(parseFloat(discounted))) {
                                        discountPrice = (parseFloat(ele.total_price) - parseFloat(discounted)).toFixed(2);
                                    } else {
                                        discountPrice = ele.total_price;
                                    }
                                    return (
                                        <Col key={id} className='py-4 '>
                                            <div className='s_seller_card '>
                                                <div >
                                                    <div className='s_card_img'>
                                                        <img src={ele.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                    </div>

                                                    <div  className='s_card_text'>
                                                        <Link to={`/productdetail/${ele.id}`}>
                                                            <h5>{ele.product_name}</h5>
                                                            <p className='mb-0'><span className='mx-2'>₹{discountPrice}</span><strike className="mx-2">₹{ele.total_price}</strike></p>
                                                            <div className='s_rating'>
                                                                {
                                                                    [...Array(5)].map((_, index) => {
                                                                        if (index < ele.total_rating) {
                                                                            return <img key={index} src={require('../Img/Sujal/fillStar.png')} alt='star' />;
                                                                        } else {
                                                                            return <img key={index} src={require('../Img/Sujal/nofillstar.png')} alt='star' />;
                                                                            ;
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='s_card_btn'><p className=''>Buy Now</p></div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </div>
                </div>
            </section >
        </>
    )
}
export default ProductList;