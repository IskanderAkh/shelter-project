import React, { useState } from 'react';
import Slider from 'react-slider';

const PriceFilter = ({ min, max, onChange }) => {
    const [sliderValues, setSliderValues] = useState([min, max]);

    const handleSliderChange = (newValues) => {
        setSliderValues(newValues);
    };

    const applyFilter = () => {
        onChange(sliderValues);
    };

    return (
        <div className="price-filter bg-white p-6 rounded-lg mt-6">
            <Slider
                className="horizontal-slider"
                min={min}
                max={max}
                value={sliderValues}
                onChange={handleSliderChange}
                renderThumb={(props) => <div {...props}></div>}
                pearling
                minDistance={10}
            />
            <div className="price-range">
            </div>
            <div className='flex justify-between items-center'>
                <div>Price: ${sliderValues[0]} - ${sliderValues[1]}</div>
                <button className="filter-button" onClick={applyFilter}>Filter</button>
            </div>
        </div>
    );
};

export default PriceFilter;
