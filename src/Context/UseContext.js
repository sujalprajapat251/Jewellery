import React, { useEffect, useState } from 'react'
import noteContext from './noteContext'
import axios from 'axios';


const UseContext = (props) => {
  const [allCategory,setAllCatgegory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  const ApiKey = 'https://shreekrishnaastrology.com/api';


  const Api = 'https://shreekrishnaastrology.com/api'

  
  const token = "166|WKmeJed3S8OccXi1CWl3NTzLGePGxUb5rDNgQ1YZ6f6850e8";

  useEffect(() => {
    // fetch catgory
    axios.get(`${ApiKey}/categories/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllCatgegory(response.data.categories);
        // console.log(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // fetch sub catgeory data
    axios.get(`${ApiKey}/subcategories/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllSubCategory(response.data.subCategories);
        // console.log(response.data.subCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // fetch product data
    axios.get(`${ApiKey}/products/getallactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAllProduct(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  return (
    <noteContext.Provider value={{ allCategory,allProduct,allSubCategory,Api,token}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default UseContext
