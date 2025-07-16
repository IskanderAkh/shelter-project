import React, { useState } from 'react';
import Slider from 'react-slider';

const PriceFilter = ({ min, max, onChange }) => {
    const [values, setValues] = useState([min, max]);

    const handleSliderChange = (newValues) => {
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div className="price-filter mr-10">
            <Slider
                className="horizontal-slider"
                min={min}
                max={max}
                value={values}
                onChange={handleSliderChange}
                renderThumb={(props, state) => <div {...props}></div>}
                pearling
                minDistance={10}
            />
            <div className="price-range">
            </div>
            <div className='flex justify-between items-center'>
                <div>Price: ${values[0]} - ${values[1]}</div>
                <button className="filter-button" onClick={() => onChange(values)}>Filter</button>
            </div>
        </div>
    );
};

export default PriceFilter;
