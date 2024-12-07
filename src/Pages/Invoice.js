import React from 'react'
import '../Css/dhruvin/Invoice.css'

const Invoice = () => {
  return (
    <div>
       <section className=" mb-5">
        <div>
          <div className="ds_container">
            <div className="mt-4">
              <div className="row justify-content-center">
                <div className="col-xl-8 ">
                  <div className="ds_in-bg">
                    <h5 className="fw-bold">LOGO</h5>
                    <div className="d-flex flex-wrap justify-content-between ">
                      <div className="mt-4">
                        <h5 className="ds_in-name">Jhon Wick</h5>
                        <h6 className="ds_in-email">example@gmail.com</h6>
                        <h6 className="ds_in-email">+1 565 5656 565</h6>
                      </div>
                      <div className="d-flex justify-content-between mt-4 ds_in-flex-manage">
                        <div>
                          <p className="ds_in-text mb-0">Invoice No</p>
                          <p className="ds_in-text mb-0">Invoice Date</p>
                          <p className="ds_in-text mb-0">Order ID</p>
                          <p className="ds_in-text mb-0">GSTIN</p>
                        </div>
                        <div className="text-end">
                          <p className="ds_in-text mb-0 text-dark ds_600">#123456</p>
                          <p className="ds_in-text mb-0 text-dark ds_600">26/09/2024</p>
                          <p className="ds_in-text mb-0 text-dark ds_600">#1123456789654</p>
                          <p className="ds_in-text mb-0 text-dark ds_600">CGHCJU554451JH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 mt-4">
                      <div className="ds_in-border h-100">
                        <p className="ds_in-sold ds_600 mb-2">SOLD BY</p>
                        <p className="ds_in-sold text-dark ds_600 mb-0">COCOBLU RETAIL LIMITED </p>
                        <p className="ds_in-add text-dark fw-400">Renaissance industrial smart city, Kalyan Sape road, Thane, Maharashtra, 421302 IN</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 mt-4">
                      <div className="ds_in-border h-100">
                        <p className="ds_in-sold ds_600 mb-2">BILLED TO</p>
                        <p className="ds_in-sold text-dark ds_600 mb-0">Alex Shroff </p>
                        <p className="ds_in-add text-dark fw-400">Ehrenkranz 13 Washington Square S , New York , Washington Square , NY 10012 , USA</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 mt-4">
                      <div className="ds_in-border border-0 h-100">
                        <p className="ds_in-sold ds_600 mb-2">SHIPPED TO</p>
                        <p className="ds_in-sold text-dark ds_600 mb-0">Alex Shroff </p>
                        <p className="ds_in-add text-dark fw-400">Ehrenkranz 13 Washington Square S , New York , Washington Square , NY 10012 , USA</p>
                      </div>
                    </div>

                    <div>
                      <div className="ds_in-line mt-3"></div>
                    </div>

                    <div className="mt-4 ds_table-main">
                      <table>
                        <thead>
                          <tr>
                            <th className="ds_table-th">Item</th>
                            <th className="ds_table-th">Qty.</th>
                            <th className="ds_table-th">Price</th>
                            <th className="ds_table-th">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="ds_table-title ds_600">Dual Tone Halo Diamond Finger Ring</div>
                              <p className='mb-0'><span className='ds_tcolor '>Size :</span> <span className='ds_600'>5</span></p>
                              <p className=''><span className='ds_tcolor'>Metal :</span> <span className='ds_600'>925 Silver</span></p>
                            </td>
                            <td className="ds_table-quantity ds_600">1</td>
                            <td className="ds_table-price">₹1200.00</td>
                            <td className="ds_table-price">₹1200.00</td>
                          </tr>
                          <tr>
                          <td>
                              <div className="ds_table-title ds_600">Dual Tone Halo Diamond Finger Ring</div>
                              <p className='mb-0'><span className='ds_tcolor '>Size :</span> <span className='ds_600'>5</span></p>
                              <p className=''><span className='ds_tcolor'>Metal :</span> <span className='ds_600'>925 Silver</span></p>
                            </td>
                            <td className="ds_table-quantity ds_600">1</td>
                            <td className="ds_table-price">₹1200.00</td>
                            <td className="ds_table-price">₹1200.00</td>
                          </tr>
                        </tbody>
                      </table>



                    </div>

                    <div>
                      <div className="ds_in-line mt-5"></div>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between flex-wrap align-items-end ">
                        <div className="mt-4">
                          <h6 className="ds_in-method">Payment Method </h6>
                          <p className="ds_in-name mb-0">Bank Name : Bank Central Asia (BCA)</p>
                          <p className="ds_in-name mb-0">Card No. : 1234 5678 9123 4567</p>
                          <p className="ds_in-name mb-0">Name : Jhon Wick</p>
                        </div>
                        <div className="mt-4">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="ds_in-sub">Sub Total</p>
                              <p className="ds_in-sub">Discount</p>
                              <p className="ds_in-sub">SGST</p>
                              <p className="ds_in-sub">CGST</p>
                              <h6 className="ds_in-total">Total Amount</h6>
                            </div>
                            <div className="ms-5">
                              <p className="ds_in-sub ds_600 text-dark">₹2400.00</p>
                              <p className="ds_in-sub ds_600" style={{ color: "#0F993E" }}>-₹40.00</p>
                              <p className="ds_in-sub ds_600 text-dark">₹3.50</p>
                              <p className="ds_in-sub ds_600 text-dark">₹6.50</p>
                              <h6 className="ds_in-total ds_600">₹2470.00</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 text-center">
                      <div>
                        <p className="ds_in-thank mb-0">Thank you for shopping with us!</p>
                        <p className="ds_in-thank ">Have a nice day <img src={require("../Img/dhruvin/smile.png")} alt="" /></p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="d_invoicefooter">
            <p className="mb-0">If you have any questions, feel free to call customer care at +1 565 5656 565 or use Contact Us section.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Invoice
