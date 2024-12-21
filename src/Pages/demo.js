import React, { useState } from "react";

const Demo = () => {
    const data = [
        { gender: "men", purity: "14k", metal_color: "rose", category: "ring", brand: "BrandA", price: 150 },
        { gender: "women", purity: "18k", metal_color: "gold", category: "necklace", brand: "BrandB", price: 450 },
        { gender: "women", purity: "14k", metal_color: "white", category: "earring", brand: "BrandA", price: 300 },
        { gender: "unisex", purity: "22k", metal_color: "yellow", category: "bracelet", brand: "BrandC", price: 700 },
        { gender: "men", purity: "18k", metal_color: "gold", category: "ring", brand: "BrandB", price: 600 },
      ];
    
      // Extract unique filter values
      const filters = {
        gender: [...new Set(data.map(item => item.gender))],
        purity: [...new Set(data.map(item => item.purity))],
        metal_color: [...new Set(data.map(item => item.metal_color))],
        category: [...new Set(data.map(item => item.category))],
        brand: [...new Set(data.map(item => item.brand))],
      };
    
      const [selectedFilters, setSelectedFilters] = useState({
        gender: [],
        purity: [],
        metal_color: [],
        category: [],
        brand: [],
      });
    
      const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Set initial price range
    
      const handleCheckboxChange = (type, value) => {
        setSelectedFilters(prev => {
          const currentValues = prev[type];
          const updatedValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
          return { ...prev, [type]: updatedValues };
        });
      };
    
      const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange(prev => ({
          ...prev,
          [name]: Number(value),
        }));
      };
    
      // Filter data based on selected filters and price range
      const filteredData = data.filter(item =>
        Object.keys(selectedFilters).every(key =>
          selectedFilters[key].length === 0 || selectedFilters[key].includes(item[key])
        ) &&
        item.price >= priceRange.min && item.price <= priceRange.max
      );
    
      return (
        <div>
          <h1>Filter Items</h1>
          {/* Render filter checkboxes */}
          {Object.keys(filters).map(filterType => (
            <div key={filterType}>
              <h3>{filterType}</h3>
              {filters[filterType].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={() => handleCheckboxChange(filterType, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          ))}
    
          {/* Price Range Filter */}
          <div>
            <h3>Price</h3>
            <div>
              <label>
                Min Price: 
                <input
                  type="number"
                  name="min"
                  value={priceRange.min}
                  min="0"
                  onChange={handlePriceChange}
                />
              </label>
              <label style={{ marginLeft: "10px" }}>
                Max Price: 
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  max="1000"
                  onChange={handlePriceChange}
                />
              </label>
            </div>
            <p>
              Price Range: ${priceRange.min} - ${priceRange.max}
            </p>
          </div>
    
          <h2>Filtered Results</h2>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <span key={key}>
                    {key}: {value}{" "}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    };
    export default Demo;
