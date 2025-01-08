import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Css/dhruvin/Invoice.css'
import noteContext from '../Context/noteContext'
import axios from 'axios'
import { FaPrint } from 'react-icons/fa'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {

const {Api , store} = useContext(noteContext)
const Id = JSON.parse(localStorage.getItem("orderId"))
const local = JSON.parse(localStorage.getItem("OrderDetails"))
const [invoice, setInvoice] = useState({})
const [invoiceData, setinvoiceData] = useState([]) 
const invoiceRef = useRef(); 

useEffect(() => {
  const fetchInvoice = async (retryCount = 0) => {
    const maxRetries = 3; 
    const retryDelay = (retryCount) => Math.pow(2, retryCount) * 1000; 

    try {
      const response = await axios.get(`${Api}/order/get/${Id}`, {
        headers: {
          Authorization: `Bearer ${store?.access_token}`,
        },
      });

      console.log(response?.data);
      setInvoice(response?.data?.order);
      setinvoiceData(response?.data?.order?.order_items);
    } catch (error) {
      if (error.response?.status === 429 && retryCount < maxRetries) {
       
        console.warn(`Retrying invoice fetch in ${retryDelay(retryCount)}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay(retryCount)));
        return fetchInvoice(retryCount + 1);
      }

      console.error("Error fetching invoice:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  fetchInvoice();
  // eslint-disable-next-line
}, []); 


 const handlePrint = () => {
  const element = invoiceRef.current;
  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${Id}.pdf`);
  });
};


  return (
    <div>
       <section className=" mb-5">
        <div>
          <div ref={invoiceRef} className="ds_container">
            <div className="mt-4">
              
              <div className='text-end me-md-5 mb-4 me-3'>
                <FaPrint onClick={handlePrint} className='fs-2 ds_cursor' />
              </div>

              <div className="row justify-content-center">
                <div className="col-xl-8 ">
                  <div className="ds_in-bg">
                    <h5 className="fw-bold">LOGO</h5>
                    <div className="d-flex flex-wrap justify-content-between ">
                      <div className="mt-4">
                        <h5 className="ds_in-name">{invoice?.contact_name}</h5>
                        <h6 className="ds_in-email">{invoice?.customer_email}</h6>
                        <h6 className="ds_in-email">+91 {invoice?.contact_no}</h6>
                      </div>
                      <div className="d-flex justify-content-between mt-4 ds_in-flex-manage">
                        <div>
                          <p className="ds_in-text mb-0">Invoice No</p>
                          <p className="ds_in-text mb-0">Invoice Date</p>
                          <p className="ds_in-text mb-0">Order ID</p>
                          <p className="ds_in-text mb-0">GSTIN</p>
                        </div>
                        <div className="text-end">
                          <p className="ds_in-text mb-0 text-dark ds_600">#{invoice?.invoice_number}</p>
                          <p className="ds_in-text mb-0 text-dark ds_600">{invoice?.order_date}</p>
                          <p className="ds_in-text mb-0 text-dark ds_600">#{Id}</p>
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
                        <p className="ds_in-sold text-dark ds_600 mb-0">{invoice?.contact_name}</p>
                        <p className="ds_in-add text-dark fw-400">{invoice?.delivery_address}</p>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 mt-4">
                      <div className="ds_in-border border-0 h-100">
                        <p className="ds_in-sold ds_600 mb-2">SHIPPED TO</p>
                        <p className="ds_in-sold text-dark ds_600 mb-0">{invoice?.contact_name}</p>
                        <p className="ds_in-add text-dark fw-400">{invoice?.delivery_address}</p>
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
                            <th className="ds_table-th text-center">Price</th>
                            <th className="ds_table-th text-center">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceData?.map((element , index)=>{
                            console.log("Helllo" , element);
                            
                            return(
                                 <tr key={index}>
                                     <td>
                                       <div className="ds_table-title ds_600">{element?.product_name}</div>
                                       <p className='mb-0'><span className='ds_tcolor '>Size :</span> <span className='ds_600'>{element?.size}</span></p>
                                       <p className=''><span className='ds_tcolor'>Metal :</span> <span className='ds_600'>{element?.metal}</span></p>
                                     </td>
                                     <td className="ds_table-quantity  ds_600">{element?.qty}</td>
                                     <td className="ds_table-price text-center">{Math.round(element?.price)}</td>
                                     <td className="ds_table-price text-center">{Math.round(element?.total_price)}</td>
                                 </tr>
                            )
                          })}
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
                              <p className="ds_in-sub ds_600 text-dark">₹{local?.sub_total}</p>
                              <p className="ds_in-sub ds_600" style={{ color: "#0F993E" }}>-₹{local?.discount}</p>
                              <p className="ds_in-sub ds_600 text-dark">₹{local?.tax / 2}</p>
                              <p className="ds_in-sub ds_600 text-dark">₹{local?.tax / 2}</p>
                              <h6 className="ds_in-total ds_600">₹{local?.total}</h6>
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
                  <div className="d_invoicefooter">
                      <p className="mb-0">If you have any questions, feel free to call customer care at +1 565 5656 565 or use Contact Us section.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}

export default Invoice
