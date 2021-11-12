import {ChangeEvent, useState} from "react";
import Slider from "@material-ui/core/Slider";
import s from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    handleChange: (newValue: number | number[]) => void
    value: Array<number>
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        value, handleChange
    }
) => {
    const handleChangeSlider = (event: ChangeEvent<{}>, newValue: number | number[]): void => {
        handleChange(newValue)
    }


    return (
        <>
            <div>
                <Slider
                    value={value}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
        </>
    )
}

export default SuperDoubleRange


