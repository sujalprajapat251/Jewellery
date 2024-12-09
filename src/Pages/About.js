import React, { useContext } from 'react'
import '../Css/dhruvin/About.css'
import noteContext from '../Context/noteContext'

const About = () => {
const {hello} = useContext(noteContext)

console.log(hello());


  return (
    <>
    
     <section className=''>
        <div>
            <div className='ds_about-bg'>
                <div className="ds_container">
                    <div className='row pb-5'>
                        <div className="col-xl-8 col-lg-12 mt-5">
                            <div className='position-relative'>
                                <div>
                                    <img src={require("../Img/dhruvin/about-chain.png")} alt="" width="100%" />
                                </div>
                                <div className='ds_about-box'>
                                    <div>
                                        <p>About us</p>
                                        <h2 className='ds_color text-uppercase fw-bold '>Perfect piece of jewellery for any occasion.</h2>
                                        <p className='ds_lh'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                        <div>
                                            <div>
                                                <div className='d-flex'>
                                                    <div>
                                                     <div className='ds_about-dimond'>
                                                        <img src={require("../Img/dhruvin/about-dimond.png")} alt="" width="100%" />
                                                     </div>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <h5 className='mb-0'>Special</h5>
                                                        <p className='ds_lh'>Cum ut patrioque complectitur, agam erat dicam cu has. No ludus timeam eligendi per ludus.</p>
                                                    </div>
                                                </div>

                                                <div className='d-flex'>
                                                    <div>
                                                      <div className='ds_about-dimond'>
                                                        <img src={require("../Img/dhruvin/about-dimond.png")} alt="" width="100%" />
                                                      </div>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <h5 className='mb-0'>Pure Quality</h5>
                                                        <p className='ds_lh'>Cum ut patrioque complectitur, agam erat dicam cu has. No ludus timeam eligendi per ludus.</p>
                                                    </div>
                                                </div>

                                                <div className='d-flex'>
                                                    <div>
                                                      <div className='ds_about-dimond'>
                                                          <img src={require("../Img/dhruvin/about-dimond.png")} alt="" width="100%" />
                                                      </div>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <h5 className='mb-0'>Modern</h5>
                                                        <p className='ds_lh'>Cum ut patrioque complectitur, agam erat dicam cu has. No ludus timeam eligendi per ludus.</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
     </section> 

     <section>
       <div>
         <div className='ds_about-desing'>
            <div className='ds_about-padding'>
                <div className="ds_container">
                    <div className='row justify-content-end'>
                        <div className="col-xl-8 col-lg-8">
                            <div>
                                <div className='position-relative'>
                                    <div>
                                        <img src={require("../Img/dhruvin/about-bangle.png")} alt="" width="100%" />
                                    </div>
                                    <div className='ds_about-box2'>
                                        <div>
                                            <p>Who we are</p>
                                            <h2 className='ds_color text-uppercase fw-bold '>Gives you quality service at the best price.</h2>
                                            <p className='ds_lh'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                                            <div className=''>
                                                <div className='row'>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-4  ds_about-width">
                                                        <div>
                                                            <div>
                                                               <span>
                                                                   <img src={require("../Img/dhruvin/support.png")} alt="" width="15%" />
                                                                </span>
                                                                <span className='ds_600 ms-2'>Support 24/7</span>
                                                           </div>
                                                             <div className='mt-4'>
                                                                <span>
                                                                      <img src={require("../Img/dhruvin/winner.png")} alt="" width="15%" />
                                                                   </span>
                                                                <span className='ds_600 ms-2'>Best Quality</span>
                                                              </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mt-4 ds_about-width">
                                                        <div>
                                                            <div>
                                                                <span>
                                                                      <img src={require("../Img/dhruvin/truck.png")} alt="" width="15%" />
                                                                   </span>
                                                                <span className='ds_600 ms-2'>Fastest Delivery</span>
                                                              </div>
                                                              <div className='mt-4'>
                                                                 <span>
                                                                    <img src={require("../Img/dhruvin/true.png")} alt="" width="15%" />
                                                                  </span>
                                                                  <span className='ds_600 ms-2'>Warranty 30 days</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
       </div>
     </section>

     <section>
        <div className='mt-5 pt-2'>
            <div className='ds-about-ring-bg pb-5'>
                <div className="ds_container">
                    <div className='ds_about-chain-b'>
                       <div className="row pt-5 pb-3">
                         <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 pt-4">
                            <div>
                                <div className="row">
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 ">
                                        <div>
                                            <div>
                                                <img className='ds_about-hand-ring' src={require("../Img/dhruvin/about-hand-ring.png")} alt="" width="100%" />
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7  mt-md-3 mt-4">
                                                    <div>
                                                        <img className='ds_about-best-ring' src={require("../Img/dhruvin/about-best-ring.png")} alt="" width="100%" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5  mt-md-3 mt-4">
                                                    <div>
                                                       <img className='ds_about-pandle' src={require("../Img/dhruvin/pandle.png")} alt="" width="100%" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12  mt-md-0 mt-4">
                                        <div>
                                            <img className='ds_about-girl' src={require("../Img/dhruvin/about-girl.png")} alt="" width="100%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>

                         <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 pt-4">
                            <div className='ds_about-chain-bg'>
                               <div className='ds_about-box3'>
                                  <p>What we do</p>
                                  <h2 className='ds_color fw-bold'>We Develop Create Custom Jewels.</h2>
                                  <p className='ds_lh'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
                               </div>
                            </div>
                         </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
     </section>
    </>
  )
}

export default About
