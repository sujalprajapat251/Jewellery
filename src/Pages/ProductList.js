import { Accordion, Col, Offcanvas, Row } from 'react-bootstrap';
import '../Css/Sujal/ProductList.css'
import { useState } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import { IoCloseOutline } from 'react-icons/io5';
import wishlist1 from '../Img/Sujal/wishlist1.png';
import wishlist2 from '../Img/Sujal/wishlist2.png';
import wishlist3 from '../Img/Sujal/wishlist3.png';
import { FaAngleDown, FaBars } from 'react-icons/fa';
function ProductList() {

    const [minValue, set_minValue] = useState(60);
    const [maxValue, set_maxValue] = useState(300);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };


    const productList_detail = [
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },
        { title: 'gold ear ring', price: '1200', old_price: '1500', rating: 4, status: 'fast selling', img: wishlist1 },
        { title: 'Silver Necklace', price: '1200', old_price: '1500', rating: 2, status: 'trending', img: wishlist2 },
        { title: 'Ankle Bracelets', price: '1200', old_price: '1500', rating: 3, img: wishlist3 },
        { title: 'Earrings', price: '1200', old_price: '1500', rating: 4, img: wishlist1 },

    ]


    // offcanvas handdler   
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <section className="d-md-flex ds_container">

                {/* default fliter */}
                <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Fliter</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='px-0'>
                        <div className="s_fliter" flush>
                            <div className='s_fliter_head d-none d-md-block'>
                                <h4>Filter</h4>
                            </div>
                            <Accordion defaultActiveKey={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}>
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
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="kids"
                                                name="gender"></input>
                                            <label for="kids">kids</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="men"
                                                name="gender"></input>
                                            <label for="men">Men</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="women"
                                                name="gender"></input>
                                            <label for="women">women</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Purity</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="14"
                                                name="purity"></input>
                                            <label for="14">14</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="20"
                                                name="purityr"></input>
                                            <label for="20">20</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="24"
                                                name="purity"></input>
                                            <label for="24">24</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="32"
                                                name="purity"></input>
                                            <label for="32">32</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Occasion</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Bridal Wear"
                                                name="occasion"></input>
                                            <label for="Bridal Wear">Bridal Wear</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Engagement"
                                                name="occasion"></input>
                                            <label for="Engagement">Engagement</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Modern Wear"
                                                name="occasion"></input>
                                            <label for="Modern Wear">Modern Wear</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Office Wear"
                                                name="occasion"></input>
                                            <label for="Office Wear">Office Wear</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Traditional & Ethnic Wear"
                                                name="occasion"></input>
                                            <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Diamond Clarity</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="FL"
                                                name="Diamond Clarity"></input>
                                            <label for="FL">FL</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="I1"
                                                name="Diamond Clarity"></input>
                                            <label for="I1">I1</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="S12"
                                                name="Diamond Clarity"></input>
                                            <label for="S12">S12</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="VS"
                                                name="Diamond Clarity"></input>
                                            <label for="VS">VS</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="VS2"
                                                name="Diamond Clarity"></input>
                                            <label for="VS2">VS2</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="V1S1"
                                                name="Diamond Clarity"></input>
                                            <label for="V1S1">V1S1</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>Metal</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Gold"
                                                name="Metal"></input>
                                            <label for="Gold">Gold</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Platinum"
                                                name="Metal"></input>
                                            <label for="Platinum">Platinum</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="6">
                                    <Accordion.Header>Metal Color</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Rose Gold"
                                                name="Metal Color"></input>
                                            <label for="Rose Gold">Rose Gold</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="White"
                                                name="Metal Color"></input>
                                            <label for="White">White</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Yellow"
                                                name="Metal Color"></input>
                                            <label for="Yellow">Yellow</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Yellow & Rose"
                                                name="Metal Color"></input>
                                            <label for="Yellow & Rose">Yellow & Rose</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="7">
                                    <Accordion.Header>Type</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Drops"
                                                name="Type"></input>
                                            <label for="Drops">Drops</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Jhumka"
                                                name="Type"></input>
                                            <label for="Jhumka">Jhumka</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Hoops"
                                                name="Type"></input>
                                            <label for="Hoops">Hoops</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="Studs"
                                                name="Type"></input>
                                            <label for="Studs">Studs</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="8">
                                    <Accordion.Header>Earrings Height</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.11"
                                                name="Height"></input>
                                            <label for="0.11">0.11 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.16"
                                                name="Height"></input>
                                            <label for="0.16">0.16 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.25"
                                                name="Height"></input>
                                            <label for="0.25">0.25 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.26"
                                                name="Height"></input>
                                            <label for="0.26">0.26 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.29"
                                                name="Height"></input>
                                            <label for="0.29">0.29 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.2"
                                                name="Height"></input>
                                            <label for="0.2">0.2 cm</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="9">
                                    <Accordion.Header>Earrings Width</Accordion.Header>
                                    <Accordion.Body>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.11cm"
                                                name="Earrings Width"></input>
                                            <label for="0.11cm">0.11 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.16cm"
                                                name="Earrings Width"></input>
                                            <label for="0.16cm">0.16 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.25cm"
                                                name="Earrings Width"></input>
                                            <label for="0.25cm">0.25 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.26cm"
                                                name="Earrings Width"></input>
                                            <label for="0.26cm">0.26 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.29cm"
                                                name="Earrings Width"></input>
                                            <label for="0.29cm">0.29 cm</label>
                                        </div>
                                        <div class="d-flex align-items-center s_checkbox">
                                            <input type="checkbox" class="me-2" id="0.2cm"
                                                name="Earrings Width"></input>
                                            <label for="0.2cm">0.2 cm</label>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>









                {/*  filter option for rings  */}
                {/* <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Fliter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-0'>
                <div className="s_fliter " flush>
                <div className='s_fliter_head d-none d-md-block'>
                        <h4>Filter</h4>
                    </div>
                <Accordion defaultActiveKey={['0','1','2','3','4','5','6','7','8']}>
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
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="kids"
                                        name="gender"></input>
                                    <label for="kids">kids</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="men"
                                        name="gender"></input>
                                    <label for="men">Men</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="women"
                                        name="gender"></input>
                                    <label for="women">women</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Purity</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="14"
                                        name="purity"></input>
                                    <label for="14">14</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="20"
                                        name="purityr"></input>
                                    <label for="20">20</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="24"
                                        name="purity"></input>
                                    <label for="24">24</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="32"
                                        name="purity"></input>
                                    <label for="32">32</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Occasion</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Bridal Wear"
                                        name="occasion"></input>
                                    <label for="Bridal Wear">Bridal Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Engagement"
                                        name="occasion"></input>
                                    <label for="Engagement">Engagement</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Modern Wear"
                                        name="occasion"></input>
                                    <label for="Modern Wear">Modern Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Office Wear"
                                        name="occasion"></input>
                                    <label for="Office Wear">Office Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Traditional & Ethnic Wear"
                                        name="occasion"></input>
                                    <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Diamond Clarity</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="FL"
                                        name="Diamond Clarity"></input>
                                    <label for="FL">FL</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="I1"
                                        name="Diamond Clarity"></input>
                                    <label for="I1">I1</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="S12"
                                        name="Diamond Clarity"></input>
                                    <label for="S12">S12</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="VS"
                                        name="Diamond Clarity"></input>
                                    <label for="VS">VS</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="VS2"
                                        name="Diamond Clarity"></input>
                                    <label for="VS2">VS2</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="V1S1"
                                        name="Diamond Clarity"></input>
                                    <label for="V1S1">V1S1</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Metal</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Gold"
                                        name="Metal"></input>
                                    <label for="Gold">Gold</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Platinum"
                                        name="Metal"></input>
                                    <label for="Platinum">Platinum</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Metal Color</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Rose Gold"
                                        name="Metal Color"></input>
                                    <label for="Rose Gold">Rose Gold</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="White"
                                        name="Metal Color"></input>
                                    <label for="White">White</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Yellow"
                                        name="Metal Color"></input>
                                    <label for="Yellow">Yellow</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Yellow & Rose"
                                        name="Metal Color"></input>
                                    <label for="Yellow & Rose">Yellow & Rose</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Type</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Drops"
                                        name="Type"></input>
                                    <label for="Drops">Drops</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Jhumka"
                                        name="Type"></input>
                                    <label for="Jhumka">Jhumka</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Hoops"
                                        name="Type"></input>
                                    <label for="Hoops">Hoops</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Studs"
                                        name="Type"></input>
                                    <label for="Studs">Studs</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                            <Accordion.Header>Width</Accordion.Header>
                            <Accordion.Body>
                            <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="12.4 mm"
                                        name="Earrings Width"></input>
                                    <label for="12.4 mm">12.4 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="12.8 mm"
                                        name="Earrings Width"></input>
                                    <label for="12.8 mm">12.8 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="12 mm"
                                        name="Earrings Width"></input>
                                    <label for="12 mm">12 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="13.2 mm"
                                        name="Earrings Width"></input>
                                    <label for="13.2 mm">13.2 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="13.5 mm"
                                        name="Earrings Width"></input>
                                    <label for="13.5 mm">13.5 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="14.2 mm"
                                        name="Earrings Width"></input>
                                    <label for="14.2 mm">14.2 mm</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="20.3mm"
                                        name="Earrings Width"></input>
                                    <label for="20.3mm">20.3mm</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div> 
                </Offcanvas.Body>
            </Offcanvas> */}










                {/*  filter option for watch  */}

                {/* <Offcanvas show={show} onHide={handleClose} responsive="md" className="s_fliter_offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Fliter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-0'>
                <div className="s_fliter" flush>
                <div className='s_fliter_head d-none d-md-block'>
                        <h4>Filter</h4>
                    </div>
                    <Accordion defaultActiveKey={['0','1','2','3','4','5','6','7','8']}>
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
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="kids"
                                        name="gender"></input>
                                    <label for="kids">kids</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="men"
                                        name="gender"></input>
                                    <label for="men">Men</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="women"
                                        name="gender"></input>
                                    <label for="women">women</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Theme</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Classic"
                                        name="Metal"></input>
                                    <label for="Classic">Classic</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Star"
                                        name="Metal"></input>
                                    <label for="Star">Star</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Type</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Screw"
                                        name="Type"></input>
                                    <label for="Screw">Screw</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Watches"
                                        name="Type"></input>
                                    <label for="Watches">Watches</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Metal Color</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Rose Gold"
                                        name="Metal Color"></input>
                                    <label for="Rose Gold">Rose Gold</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="White"
                                        name="Metal Color"></input>
                                    <label for="White">White</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Yellow"
                                        name="Metal Color"></input>
                                    <label for="Yellow">Yellow</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Yellow & Rose"
                                        name="Metal Color"></input>
                                    <label for="Yellow & Rose">Yellow & Rose</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Occasion</Accordion.Header>
                            <Accordion.Body>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Bridal Wear"
                                        name="occasion"></input>
                                    <label for="Bridal Wear">Bridal Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Engagement"
                                        name="occasion"></input>
                                    <label for="Engagement">Engagement</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Modern Wear"
                                        name="occasion"></input>
                                    <label for="Modern Wear">Modern Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Office Wear"
                                        name="occasion"></input>
                                    <label for="Office Wear">Office Wear</label>
                                </div>
                                <div class="d-flex align-items-center s_checkbox">
                                    <input type="checkbox" class="me-2" id="Traditional & Ethnic Wear"
                                        name="occasion"></input>
                                    <label for="Traditional & Ethnic Wear">Traditional & Ethnic Wear</label>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div> 
                </Offcanvas.Body>
                </Offcanvas> */}





                <div className='s_responsive_fliter d-md-none d-flex justify-content-between align-items-center'>
                    <p className='mb-0'>Fliter</p>
                    <FaBars onClick={handleShow} />
                </div>
                <div className='s_product_list '>
                    <div className='s_top d-sm-flex justify-content-between'>
                        <h4>Earrings</h4>
                        <div className='d-lg-flex '>
                            <div className='d-flex flex-wrap'>
                                <div className='s_fliter_option'>
                                    <p>Women</p>
                                    <IoCloseOutline />
                                </div>
                                <div className='s_fliter_option'>
                                    <p>20</p>
                                    <IoCloseOutline />
                                </div>
                                <div className='s_fliter_option'>
                                    <p>$ 25k to $50k</p>
                                    <IoCloseOutline />
                                </div>
                            </div>
                            <div className='s_fliter_select'>
                                <p className='mb-0'>Sort by</p>
                                <FaAngleDown />
                                <div className='s_sortby_menu'>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by'></input>
                                        <span>Best Sellings</span>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by'></input>
                                        <span>Price (low to high)</span>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by'></input>
                                        <span>Price (high to low)</span>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by'></input>
                                        <span>New Arrivals</span>
                                    </div>
                                    <div className='s_sortby_option'>
                                        <input type='radio' name='sort_by'></input>
                                        <span>Recommendations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Row xxl={4} lg={3} md={2} sm={2} className='s_seller_cards row-cols-1 gx-0 gx-sm-3'>
                            {
                                productList_detail.map((ele, id) => {
                                    console.log(ele.img)
                                    return (
                                        <Col key={id} className='py-4'>
                                            <div className='s_seller_card'>
                                                <div className='s_card_img'>
                                                    <img src={ele.img} className="w-100" alt={ele.title} key={ele.title} />
                                                </div>

                                                {ele.status ?
                                                    <div class='s_card_status'><p className='mb-0'>{ele.status}</p></div>
                                                    : ''}
                                                <div className='s_card_text'>
                                                    <h5>{ele.title}</h5>
                                                    <p className='mb-0'><span className='mx-2'>₹{ele.price}</span><strike class="mx-2">₹{ele.old_price}</strike></p>
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
        </>
    )
}
export default ProductList;