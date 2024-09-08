import React, { useState } from "react";

import { Slider } from "@mui/material";

function valuetext(value) {
    return `${value}`
}

const CustomSlider = ({ paramName, updateParams, rangeArr, step, min, max }) => {
    const [value, setValue] = useState(rangeArr);

    const handleChange = (evt, newValue) => {
        setValue(newValue);
        updateParams(paramName, newValue)
    }

    return (
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={step}
            min={min}
            max={max}
        />
    )
}

export default CustomSlider;