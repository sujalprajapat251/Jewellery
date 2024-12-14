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
    const { id } = useParams();

    // get subcategory data
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [isRing, setIsRing] = useState(false);
    const [isWatch, setIsWatch] = useState(false);
    useEffect(() => {
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
        });
    }, [Api, id, token]);


    //  fliter handling
    const [productList_detail, setproductList_detail] = useState([]);
    const [productlist, setProductList] = useState([]);
    useEffect(() => {
        const product = allProduct.filter((product) => { return product.sub_category_id === parseInt(id); })
        setproductList_detail(product);
        setProductList(product);
        // alert('');
    }, [id, allProduct])

    var cnt = false;
    let [newFilterData, setNewFliterData] = useState([]);
    const [fliterOptionData, setFliterOptionData] = useState([]);
    const fliterOptions = (x, y, z) => {

        // x is value y is id and z is name of input type
        const exists = fliterOptionData.some(option => option.name === x);
        if (exists) {
            
            setFliterOptionData(fliterOptionData.filter(option => option.name !== x));
        } else {
            setFliterOptionData([...fliterOptionData, { id: y, name: x, type: z }]);
            // fliterhanddler(x, y, z);
        }
    }

    // ?this function perform the fliter
    const fliterhanddler = () => {
        var FilterData = [];
        // console.log('fliterOptionData',fliterOptionData);
        // if(fliterOptionData.length > 0){
        //     cnt=true;
        // }
        const filteredProducts = productlist.filter((product) =>
            fliterOptionData.every((ele) => {
                if (ele.type === "gender") {
                    return product.gender === ele.name;
                }
                if (ele.type === "purity") {
                    return product.metal === ele.name;
                }
                if(ele.type==="occasion"){
                    return product?.occasion === ele.name;
                }
                if(ele.type==="Diamond Clarity"){
                    return product?.clarity === ele.name;
                }
                if (ele.type === "Metal") {
                    return product?.metal?.includes(ele.name);
                }
                if(ele.type === "Metal Color"){
                    return product?.metal_color === ele.name;
                }
                return false;
            })
        );
        // console.log('filteredProducts', filteredProducts);
        var updatedData = filteredProducts;
        setNewFliterData(updatedData);
        // console.log('cnt =>',cnt);
    };

    // this useeffect called when fliter applied into product list 
    useEffect(()=>{
        fliterhanddler()
    },[fliterOptionData])
    useEffect(() => {
        if (newFilterData.length > productlist.length) {
            setNewFliterData([]);
            setproductList_detail(productlist);
        }
        // else if (newFilterData.length === 0) {
        //     setproductList_detail(productlist);
        // }
        else {
            setproductList_detail(newFilterData);
        }
        // console.log('newFliterData =>',newFilterData);
        // console.log('productList_detail =>',productList_detail);
    }, [newFilterData])

    // close fliter data using icon
    const fliterOptionsClose = (x) => {
        setFliterOptionData(fliterOptionData.filter((y) => y !== x));
        // console.log(x);
        const checkboxs = document.getElementById(x.id);
        checkboxs.checked = false;
        
        // }
    }

    // backend connection code over 





    const [minValue, set_minValue] = useState(60);
    const [maxValue, set_maxValue] = useState(300);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

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
                                                    name="gender" value='Kids' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="kids">kids</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="men"
                                                    name="gender" value='Men' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="men">Men</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="women"
                                                    name="gender" value='Women' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="women">women</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Purity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="14"
                                                    name="purity" value={'Purity-14'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="14"  >14</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="20"
                                                    name="purity" value={'Purity-20'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="20" >20</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="24"
                                                    name="purity" value={'Purity-24'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="24" >24</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="32"
                                                    name="purity" value={'Purity-32'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="32" >32</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Occasion</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Bridal Wear"
                                                    name="occasion" value={'Bridal Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Bridal Wear">Bridal Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Engagement"
                                                    name="occasion" value={'Engagement'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Engagement">Engagement</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Modern Wear"
                                                    name="occasion" value={'Modern Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Modern Wear">Modern Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Office Wear"
                                                    name="occasion" value={'Office Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Office Wear">Office Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Traditional & Ethnic Wear"
                                                    name="occasion" value={'Traditional & Ethnic Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Diamond Clarity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="FL"
                                                    name="Diamond Clarity" value={'Clarity-FL'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="FL">FL</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="I1"
                                                    name="Diamond Clarity" value={'Clarity-I1'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="I1">I1</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="S12"
                                                    name="Diamond Clarity" value={'Clarity-S12'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="S12">S12</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS"
                                                    name="Diamond Clarity" value={'Clarity-VS'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="VS">VS</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS2"
                                                    name="Diamond Clarity" value={'Clarity-VS2'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="VS2">VS2</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="V1S1"
                                                    name="Diamond Clarity" value={'Clarity-V1S1'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="V1S1">V1S1</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Metal</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Gold"
                                                    name="Metal" value={'Metal-Gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Gold" >Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Platinum"
                                                    name="Metal" value={'Metal-Platinum'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Platinum">Platinum</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Metal Color</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Rose Gold"
                                                    name="Metal Color" value={'Color-Rose Gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Rose Gold">Rose Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="White"
                                                    name="Metal Color" value={'Color-White'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="White">White</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow"
                                                    name="Metal Color" value={'Color-Yellow'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Yellow">Yellow</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow & Rose"
                                                    name="Metal Color" value={'Color-Yellow & Rose'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Yellow & Rose">Yellow & Rose</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Type</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Drops"
                                                    name="Type" value={'Drops'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Drops">Drops</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Jhumka"
                                                    name="Type" value={'Jhumka'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Jhumka">Jhumka</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Hoops"
                                                    name="Type" value={'Hoops'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Hoops">Hoops</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Studs"
                                                    name="Type" value={'Studs'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Studs">Studs</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Earrings Height</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.11"
                                                    name="Height" value={'H-0.11 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.11">0.11 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.16"
                                                    name="Height" value={'H-0.16 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.16">0.16 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.25"
                                                    name="Height" value={'H-0.25 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.25">0.25 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.26"
                                                    name="Height" value={'H-0.26 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.26">0.26 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.29"
                                                    name="Height" value={'H-0.29 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.29">0.29 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.2"
                                                    name="Height" value={'H-0.2 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.2">0.2 cm</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="9">
                                        <Accordion.Header>Earrings Width</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.11cm"
                                                    name="Earrings Width" value={'W-0.11 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.11cm">0.11 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.16cm"
                                                    name="Earrings Width" value={'W-0.16 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.16cm">0.16 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.25cm"
                                                    name="Earrings Width" value={'W-0.25 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.25cm">0.25 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.26cm"
                                                    name="Earrings Width" value={'W-0.26 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.26cm">0.26 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.29cm"
                                                    name="Earrings Width" value={'W-0.2 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="0.29cm">0.29 cm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="0.2cm"
                                                    name="Earrings Width" value={'W-0.2 cm'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
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
                                                    name="gender" value='kids' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="kids">kids</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Male"
                                                    name="gender" value='male' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Male">Male</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Female"
                                                    name="gender" value='female' onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Female">Female</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Purity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="14K"
                                                    name="purity" value={'14k'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="14K"  >14K</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="18K"
                                                    name="purity" value={'18k'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="18K" >18K</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="22K"
                                                    name="purity" value={'22k'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="22K" >22K</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="24K"
                                                    name="purity" value={'24k'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="24K" >24K</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Silver-metal"
                                                    name="purity" value={'silver'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Silver-metal" >Silver</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Occasion</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Bridal Wear"
                                                    name="occasion" value={'Bridal Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Bridal Wear">Bridal Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Engagement"
                                                    name="occasion" value={'Engagement'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Engagement">Engagement</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Modern Wear"
                                                    name="occasion" value={'Modern Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Modern Wear">Modern Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Office Wear"
                                                    name="occasion" value={'Office Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Office Wear">Office Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Traditional & Ethnic Wear"
                                                    name="occasion" value={'Traditional & Ethnic Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Diamond Clarity</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="FL"
                                                    name="Diamond Clarity" value={'FL'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="FL">FL</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="I1"
                                                    name="Diamond Clarity" value={'I1'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="I1">I1</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="S12"
                                                    name="Diamond Clarity" value={'S12'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="S12">S12</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS"
                                                    name="Diamond Clarity" value={'VS'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="VS">VS</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="VS2"
                                                    name="Diamond Clarity" value={'VS2'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="VS2">VS2</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="V1S1"
                                                    name="Diamond Clarity" value={'V1S1'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="V1S1">V1S1</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Metal</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Gold"
                                                    name="Metal" value={'gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Gold" >Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Gold"
                                                    name="Metal" value={'silver'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Gold" >Silver</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Platinum"
                                                    name="Metal" value={'platinum'} onChange={(e) => { fliterOptions(e.target.value, e.target.id, e.target.name); }}></input>
                                                <label for="Platinum">Platinum</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Metal Color</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Rose Gold"
                                                    name="Metal Color" value={'rose'} onChange={(e) => { fliterOptions(e.target.value, e.target.id ,e.target.name); }}></input>
                                                <label for="Rose Gold">Rose Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="White"
                                                    name="Metal Color" value={'silver'} onChange={(e) => { fliterOptions(e.target.value, e.target.id,e.target.name); }}></input>
                                                <label for="White">White</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="white_gold"
                                                    name="Metal Color" value={'white_gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id,e.target.name); }}></input>
                                                <label for="white_gold">White Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="gold"
                                                    name="Metal Color" value={'gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id,e.target.name); }}></input>
                                                <label for="gold">Gold</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Width</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="14"
                                                    name="Earrings Width" value={'14'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="14">14 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="15"
                                                    name="Earrings Width" value={'15'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="15">15 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="16"
                                                    name="Earrings Width" value={'16'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="16">16 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="17"
                                                    name="Earrings Width" value={'17'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="17">17 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="18"
                                                    name="Earrings Width" value={'18'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="18">18 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="14"
                                                    name="Earrings Width" value={'14'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="14">14 mm</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="20"
                                                    name="Earrings Width" value={'20'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="20">20 mm</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
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
                                                    name="gender" value='Kids' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="kids">kids</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="men"
                                                    name="gender" value='Men' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="men">Men</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="women"
                                                    name="gender" value='Women' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="women">women</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Theme</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Classic"
                                                    name="Metal" value='Classic' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Classic">Classic</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Star"
                                                    name="Metal" value='Star' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Star">Star</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Type</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Screw"
                                                    name="Type" value='Screw' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Screw">Screw</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Watches"
                                                    name="Type" value='Watches' onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Watches">Watches</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Metal Color</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Rose Gold"
                                                    name="Metal Color" value={'Color-Rose Gold'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Rose Gold">Rose Gold</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="White"
                                                    name="Metal Color" value={'Color-White'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="White">White</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow"
                                                    name="Metal Color" value={'Color-Yellow'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Yellow">Yellow</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Yellow & Rose"
                                                    name="Metal Color" value={'Color-Yellow & Rose'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Yellow & Rose">Yellow & Rose</label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Occasion</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Bridal Wear"
                                                    name="occasion" value={'Bridal Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Bridal Wear">Bridal Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Engagement"
                                                    name="occasion" value={'Engagement'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Engagement">Engagement</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Modern Wear"
                                                    name="occasion" value={'Modern Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Modern Wear">Modern Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Office Wear"
                                                    name="occasion" value={'Office Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
                                                <label for="Office Wear">Office Wear</label>
                                            </div>
                                            <div className="d-flex align-items-center s_checkbox">
                                                <input type="checkbox" className="me-2" id="Traditional & Ethnic Wear"
                                                    name="occasion" value={'Traditional & Ethnic Wear'} onChange={(e) => { fliterOptions(e.target.value, e.target.id); }}></input>
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
                        <h4>{subCategoryData.name}</h4>
                        <div className='d-lg-flex '>
                            <div className='d-flex flex-wrap'>
                                {fliterOptionData.map((ele, ind) => {
                                    return (
                                        <div className='s_fliter_option' key={ind}>
                                            <p>{ele.name}</p>
                                            <IoCloseOutline onClick={() => { fliterOptionsClose(ele) }} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='s_fliter_select w-auto'>
                                <p className='mb-0 text-nowrap'>Sort by</p>
                                <FaAngleDown />
                                <div className='s_sortby_menu'>

                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='Best Sellings'></input>
                                        <label for='Best Sellings' >Best Sellings</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='low to high'></input>
                                        <label for='low to high'>Price (low to high)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='high to low'></input>
                                        <label for='high to low'>Price (high to low)</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='New Arrivals'></input>
                                        <label for='New Arrivals'>New Arrivals</label>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by' id='Recommendations'></input>
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
                                    return (
                                        <Col key={id} className='py-4'>
                                            <div className='s_seller_card'>
                                                <Link to={`/productdetail/${ele.id}`}>
                                                    <div className='s_card_img'>
                                                        <img src={ele.images?.[0]} className="w-100" alt={ele.title} key={ele.title} />
                                                    </div>
                                                    {ele.gender ?
                                                        <div className='s_card_status'><p className='mb-0'>{ele.metal_color}</p></div>
                                                        : ''}
                                                    <div className='s_card_text'>
                                                        <h5>{ele.product_name}</h5>
                                                        <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike className="mx-2">₹{ele.discount}</strike></p>
                                                        <div className='s_rating'>
                                                            {
                                                                [...Array(5)].map((_, index) => {
                                                                    if (index < 0) {
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