import { Accordion, Col, Offcanvas, Row } from 'react-bootstrap';
import '../Css/Sujal/ProductList.css'
import { useContext, useEffect, useState } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import { IoCloseOutline } from 'react-icons/io5';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import noteContext from '../Context/noteContext';
import axios  from 'axios';
function ProductList() {
    const { Api, token, allProduct } = useContext(noteContext);

    // backend connection code
    const { id, type } = useParams();

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
        if (type === 'category') {
            axios.get(`${Api}/categories/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log(response.data.category.name);
                const data = response.data.category;
                const checkRing = data.name?.includes('Ring');
                setIsRing(checkRing);
                const checkWatch = data.name?.includes('Watch');
                setIsWatch(checkWatch);
                setSubCategoryData(response.data.category);
                // console.log('category', checkRing , checkWatch)
            });
        }
    }, [id, type , Api, token]);


    //  fliter handling
    const [productList_detail, setproductList_detail] = useState([]);
    const [productlist, setProductList] = useState([]);
    useEffect(() => {
        let product = []
        if (type === 'subcategory') {
            product = allProduct?.filter((product) => { return product.sub_category_id === parseInt(id); })
        }
        if (type === 'category') {
            product = allProduct?.filter((product) => { return product.category_id === parseInt(id); })
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
        setproductList_detail(product);
        setProductList(product);
        // alert('');
    }, [id, allProduct , type])






    // flitering functionality

    const filters = {
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

    const [selectedFilters, setSelectedFilters] = useState({
        gender: [],
        purity: [],
        occasion: [],
        clarity: [],
        metal: [],
        metal_color: [],
        size_name: [],
    });
    const filterHandler = (type, value, index) => {
        let currentValues, updatedValues;
        setSelectedFilters((prev) => {
            currentValues = prev[type];
            if (prev[type].includes(value) && index) {
                console.log(typeof (type + index));
                const checkboxId = `${type}-${index}`;
                var idx = document.getElementById(checkboxId).checked;
                console.log('id', idx);
                if (idx) {
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

        // filteredData = filterData.filter((item) => item.total_price >= minValue && item.total_price <= maxValue);
        // console.log(filteredData);

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
    // flitering functionality over






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
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="s_price_slider">
                                                <MultiRangeSlider
                                                    min={0}
                                                    max={400}
                                                    step={5}
                                                    minValue={minValue}
                                                    maxValue={maxValue}
                                                    onInput={(e) => {
                                                        handleInput(e);
                                                    }}
                                                />
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Gender</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="kids"
                                                    name="gender" value='Kids' ></input>
                                                <label for="kids">kids</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="men"
                                                    name="gender" value='Men' ></input>
                                                <label for="men">Men</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="women"
                                                    name="gender" value='Women' ></input>
                                                <label for="women">women</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Purity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="14"
                                                    name="purity" value={'Purity-14'} ></input>
                                                <label for="14"  >14</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="20"
                                                    name="purity" value={'Purity-20'} ></input>
                                                <label for="20" >20</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="24"
                                                    name="purity" value={'Purity-24'} ></input>
                                                <label for="24" >24</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="32"
                                                    name="purity" value={'Purity-32'} ></input>
                                                <label for="32" >32</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Occasion</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Bridal Wear"
                                                    name="occasion" value={'Bridal Wear'} ></input>
                                                <label for="Bridal Wear">Bridal Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Engagement"
                                                    name="occasion" value={'Engagement'} ></input>
                                                <label for="Engagement">Engagement</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Modern Wear"
                                                    name="occasion" value={'Modern Wear'} ></input>
                                                <label for="Modern Wear">Modern Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Office Wear"
                                                    name="occasion" value={'Office Wear'} ></input>
                                                <label for="Office Wear">Office Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Traditional & Ethnic Wear"
                                                    name="occasion" value={'Traditional & Ethnic Wear'} ></input>
                                                <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Diamond Clarity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="FL"
                                                    name="Diamond Clarity" value={'Clarity-FL'} ></input>
                                                <label for="FL">FL</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="I1"
                                                    name="Diamond Clarity" value={'Clarity-I1'} ></input>
                                                <label for="I1">I1</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="S12"
                                                    name="Diamond Clarity" value={'Clarity-S12'} ></input>
                                                <label for="S12">S12</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS"
                                                    name="Diamond Clarity" value={'Clarity-VS'} ></input>
                                                <label for="VS">VS</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS2"
                                                    name="Diamond Clarity" value={'Clarity-VS2'} ></input>
                                                <label for="VS2">VS2</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="V1S1"
                                                    name="Diamond Clarity" value={'Clarity-V1S1'} ></input>
                                                <label for="V1S1">V1S1</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Metal</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Gold"
                                                    name="Metal" value={'Metal-Gold'} ></input>
                                                <label for="Gold" >Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Platinum"
                                                    name="Metal" value={'Metal-Platinum'} ></input>
                                                <label for="Platinum">Platinum</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Metal Color</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Rose Gold"
                                                    name="Metal Color" value={'Color-Rose Gold'} ></input>
                                                <label for="Rose Gold">Rose Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="White"
                                                    name="Metal Color" value={'Color-White'} ></input>
                                                <label for="White">White</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow"
                                                    name="Metal Color" value={'Color-Yellow'} ></input>
                                                <label for="Yellow">Yellow</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow & Rose"
                                                    name="Metal Color" value={'Color-Yellow & Rose'} ></input>
                                                <label for="Yellow & Rose">Yellow & Rose</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Type</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Drops"
                                                    name="Type" value={'Drops'}></input>
                                                <label for="Drops">Drops</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Jhumka"
                                                    name="Type" value={'Jhumka'} ></input>
                                                <label for="Jhumka">Jhumka</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Hoops"
                                                    name="Type" value={'Hoops'} ></input>
                                                <label for="Hoops">Hoops</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Studs"
                                                    name="Type" value={'Studs'} ></input>
                                                <label for="Studs">Studs</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Earrings Height</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.11"
                                                    name="Height" value={'H-0.11 cm'} ></input>
                                                <label for="0.11">0.11 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.16"
                                                    name="Height" value={'H-0.16 cm'} ></input>
                                                <label for="0.16">0.16 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.25"
                                                    name="Height" value={'H-0.25 cm'} ></input>
                                                <label for="0.25">0.25 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.26"
                                                    name="Height" value={'H-0.26 cm'} ></input>
                                                <label for="0.26">0.26 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.29"
                                                    name="Height" value={'H-0.29 cm'} ></input>
                                                <label for="0.29">0.29 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.2"
                                                    name="Height" value={'H-0.2 cm'} ></input>
                                                <label for="0.2">0.2 cm</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="9">
                                        <Accordion.Header>Earrings Width</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.11cm"
                                                    name="Earrings Width" value={'W-0.11 cm'} ></input>
                                                <label for="0.11cm">0.11 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.16cm"
                                                    name="Earrings Width" value={'W-0.16 cm'} ></input>
                                                <label for="0.16cm">0.16 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.25cm"
                                                    name="Earrings Width" value={'W-0.25 cm'}></input>
                                                <label for="0.25cm">0.25 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.26cm"
                                                    name="Earrings Width" value={'W-0.26 cm'} ></input>
                                                <label for="0.26cm">0.26 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.29cm"
                                                    name="Earrings Width" value={'W-0.2 cm'} ></input>
                                                <label for="0.29cm">0.29 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.2cm"
                                                    name="Earrings Width" value={'W-0.2 cm'} ></input>
                                                <label for="0.2cm">0.2 cm</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
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
                                    {Object.keys(filters).map((filterType, index) => (
                                        <Accordion.Item eventKey={index} key={filterType}>
                                            <Accordion.Header className='text-capitalize' ><p className='mb-0'> {`${filterType}`}</p> </Accordion.Header>
                                            <Accordion.Body>
                                                {filters?.[filterType].map((value, index) => (
                                                    // console.log('id123', typeof(filterType+index))
                                                    <div key={value} className="d-flex align-items-center s_checkbox">
                                                        <input type="checkbox" className="me-2" id={`${filterType}-${index}`}
                                                            name={filterType} value={value} onChange={() => { filterHandler(filterType, value) }}></input>
                                                        <label for={`${filterType}-${index}`} className='text-capitalize'> {value} </label>
                                                    </div>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
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
                                                    max={1000}
                                                    step={5}
                                                    minValue={minValue}
                                                    maxValue={maxValue}
                                                    onInput={(e) => {
                                                        handleInput(e);
                                                    }}
                                                />
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Gender</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="kids"
                                                    name="gender" value='Kids' ></input>
                                                <label for="kids">kids</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="men"
                                                    name="gender" value='Men' ></input>
                                                <label for="men">Men</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="women"
                                                    name="gender" value='Women' ></input>
                                                <label for="women">women</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Theme</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Classic"
                                                    name="Metal" value='Classic'></input>
                                                <label for="Classic">Classic</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Star"
                                                    name="Metal" value='Star' ></input>
                                                <label for="Star">Star</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Type</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Screw"
                                                    name="Type" value='Screw' ></input>
                                                <label for="Screw">Screw</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Watches"
                                                    name="Type" value='Watches' ></input>
                                                <label for="Watches">Watches</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Metal Color</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Rose Gold"
                                                    name="Metal Color" value={'Color-Rose Gold'} ></input>
                                                <label for="Rose Gold">Rose Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="White"
                                                    name="Metal Color" value={'Color-White'} ></input>
                                                <label for="White">White</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow"
                                                    name="Metal Color" value={'Color-Yellow'} ></input>
                                                <label for="Yellow">Yellow</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow & Rose"
                                                    name="Metal Color" value={'Color-Yellow & Rose'} ></input>
                                                <label for="Yellow & Rose">Yellow & Rose</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Occasion</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Bridal Wear"
                                                    name="occasion" value={'Bridal Wear'} ></input>
                                                <label for="Bridal Wear">Bridal Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Engagement"
                                                    name="occasion" value={'Engagement'} ></input>
                                                <label for="Engagement">Engagement</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Modern Wear"
                                                    name="occasion" value={'Modern Wear'} ></input>
                                                <label for="Modern Wear">Modern Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Office Wear"
                                                    name="occasion" value={'Office Wear'} ></input>
                                                <label for="Office Wear">Office Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Traditional & Ethnic Wear"
                                                    name="occasion" value={'Traditional & Ethnic Wear'} ></input>
                                                <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
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
                                        <label for='Best Sellings' >Best Sellings</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='low to high' onClick={() => { fliteringhandle(2) }}></input>
                                        <label for='low to high'>Price (low to high)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='high to low' onClick={() => { fliteringhandle(3) }}></input>
                                        <label for='high to low'>Price (high to low)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='New Arrivals' onClick={() => { fliteringhandle(4) }}></input>
                                        <label for='New Arrivals'>New Arrivals</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='Recommendations' onClick={() => { fliteringhandle(5) }}></input>
                                        <label for='Recommendations'>Recommendations</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Row xxl={4} lg={3} md={2} sm={2} className='s_seller_cards row-cols-1 gx-2 gx-sm-3'>
                            {
                                productList_detail.map((ele, id) => {
                                    const discounted = ((parseFloat(ele.total_price) * parseFloat(ele.discount)) / 100).toFixed(2);
                                    const discountPrice = (parseFloat(ele.total_price) - parseFloat(discounted)).toFixed(2);
                                    return (
                                        <Col key={id} className='py-4'>
                                            <div className='s_seller_card'>
                                                <Link to={`/productdetail/${ele.id}`}>
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
                                            </div>
                                        </Col>
                                    )
                                })
                            }

                        </Row>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProductList;