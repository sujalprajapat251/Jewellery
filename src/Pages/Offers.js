import React from 'react'
import '../Css/dhruvin/Offers.css'
import { useNavigate } from 'react-router-dom'

const Offers = () => {
 const  navigate = useNavigate();
  return (
    <>
      <div className='mt-4 mb-5 pb-4'>
        <div className="ds_container">
          <div className='text-center'>
            <h2 className='ds_color'>OFFERS</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br /> industry. Lorem Ipsum has been the industry's standard </p>
          </div>
          <div className="row ">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  mt-4">
              <div className="row ">
                <div className="col-xl-7 col-lg-7 col-md-12 pe-lg-0 ">
                  <div>
                    <img className='ds_offer-img' src={require("../Img/dhruvin/neck.png")} alt="" width="100%" />
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 ps-lg-0">
                  <div className='ds_offer-bg text-center h-100'>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100 mt-lg-0 pt-lg-0 pt-3 '>
                      <h5 className='text-light'>Our Bestsellers</h5>
                      <h1 className='ds_offer-heading'>2024 new
                        Collection</h1>
                      <h2 className='ds_offer-off'>15% OFF</h2>
                      <div className='mb-lg-0 mb-5 mt-lg-0 mt-1'>
                        <button className='ds_offer-btn ' onClick={()=>{navigate('/')}}>View Collection</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mt-4">
              <div className="row ">
                <div className="col-xl-7 col-lg-7 col-md-12 pe-lg-0">
                  <div>
                    <img className='ds_hand-white' src={require("../Img/dhruvin/d-ring.png")} alt="" width="100%" />
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-12 ps-lg-0">
                  <div className='ds_offer-bg text-center h-100 ds_offer-padding'>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100 pt-lg-0 pt-3'>
                      <h5 className='text-light'>New Arrival</h5>
                      <h1 className='ds_offer-heading'>Solitaire Utsav</h1>
                      <h5 className='text-light'>25% OFF Above $2599</h5>
                      <div className='mt-3 mb-lg-0 mb-5'>
                        <button className='ds_offer-btn ' onClick={()=>{navigate('/')}}>Shop Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className='mt-5 pt-3'>
            <div className='ds_bg-img'>
              <div className="ds_img-manage h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 col-12">
                    <div>
                      <h1 className='text-light'>The Necklace That <br />
                        Defines You.</h1>
                      <h6 className='text-light mt-3'>Up to 40% Off on Trending collection</h6>
                      <div className='mt-4'>
                        <button className='ds_off-shop' onClick={()=>{navigate('/')}}>Shop Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=' pt-4'>
            <div className='row'>
              <div className='col-xl-5 col-lg-5 col-md-12 mt-5'>
                <div className='ds_off-flat'>
                  <div className="row h-100 justify-content-end align-items-center">
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6">
                      <div className='text-center ds_card-manage'>
                        <h3 className='text-light fw-bold'>Flat 25% Off On Making Charge</h3>
                        <p className='text-light'>On Wedding Collection</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='ds_ring-bg mt-md-5 mt-3'>
                  <div className="row h-100 justify-content-end align-items-center">
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6">
                      <div className='text-center ds_card-manage2'>
                        <h3 className='text-light fw-bold'>A Bracelet That Blossoms with Charm</h3>
                        <p className='text-light'>Get 15% off on Rose-Gold Bracelet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-7 col-lg-7 col-md-12 mt-md-5 mt-3">
                <div className='ds_sale-bg'>
                  <div className='row h-100 justify-content-end align-items-center'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-center">
                      <div className='position-relative'>
                        <h5 className='text-light'>BEST COLLECTION</h5>
                        <h2 className='ds_offer-fes '>FESTIVAL</h2>
                        <h4 className='ds_offer-text text-light'>Sale</h4>
                      </div>
                      <div className='mt-5 pt-3'>
                        <button className='ds_offer-shop' onClick={()=>{navigate('/')}}>Shop Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ************** Always be on trend with unique pieces  *************** */}
          <div className='mt-5 pt-4'>
            <div className='text-center'>
              <h2 className='ds_color'>Always be on trend with <br /> unique pieces</h2>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 mt-sm-5 pt-3">
                <div className="row justify-content-end">
                  <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6">
                    <div>
                      <img className='ds_al-img' src={require("../Img/dhruvin/krown.png")} alt="" />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6">
                    <div className='mt-md-3 mt-3'>
                      <img className='ds_al-nack' src={require("../Img/dhruvin/alnack.png")} alt="" width="100%" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                <div>
                  <div>
                    <img className='ds_hand-ring' src={require("../Img/dhruvin/hand-ring.png")} alt="" width="100%" />
                  </div>
                  <div className="row">
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 mt-3">
                      <div>
                        <img className='ds_nack-star' src={require("../Img/dhruvin/nack-star.png")} alt="" width="100%" />
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 mt-3">
                      <div>
                        <img className='ds_al-box' src={require("../Img/dhruvin/rign-box.png")} alt="" width="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 mt-sm-5  pt-3">
                <div>
                  <div className='ds_hide-show'>
                    <img className='ds_al-paper-ring' src={require("../Img/dhruvin/paper-ring.png")} alt="" width="100%" />
                  </div>

                  <div className='ds_al-desing'>
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 mt-md-3">
                        <div>
                          <img className='ds_al-chain' src={require("../Img/dhruvin/chain.png")} alt="" width="100%" />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className='ds_hide'>
                    <div className="row">
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-6'>
                        <div>
                          <img className='ds_al-paper-ring' src={require("../Img/dhruvin/paper-ring.png")} alt="" width="100%" />
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 mt-md-3 mt-sm-0 mt-3">
                        <div>
                          <img className='ds_al-chain' src={require("../Img/dhruvin/chain.png")} alt="" width="100%" />
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


    </>
  )
}

export default Offers
