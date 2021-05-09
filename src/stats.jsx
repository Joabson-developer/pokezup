import React from "react";
import { Typography, Slider} from "@material-ui/core";
import {  withStyles } from "@material-ui/core/styles";

// Estilização do Slider
const PrettoSlider = withStyles({
    root: {
      color: '#3f51b5',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

// Cria o componente Stats com Slider
const Stats = (props) => {
    return (
        <>
            <Typography id={props.id} gutterBottom>
              {props.typeAbiliity} | {props.level}
            </Typography>
            <PrettoSlider
            valueLabelDisplay="auto"
            aria-label={props.id}
            defaultValue={props.level}
            min={0}
            max={200}
            disable />
        </>
    )
}

export default Stats;