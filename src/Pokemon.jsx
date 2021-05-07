/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { IconButton, Button, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Slider, Avatar, CircularProgress, Container, AppBar, Toolbar} from "@material-ui/core";
import {  withStyles, makeStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  container:{    
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  root: {
    minWidth: 400,
    maxWidth: 1200,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
    backgroundPosition: 'unset'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
    cursor: 'pointer'
  },
}));



const Pokemon = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { match, history } = props;
  const { params } = match;
  const { idPokemon } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [idPokemon]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites, stats } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    const typeBR = `Tipo: ${types[0].type.name}`
    const heightBR = `${height * 10} cm`
    const weightBR = `${weight / 10} Kg`
    
    const textHP = stats[0].stat.name
    const valueHP = stats[0].base_stat
    const textAttack = stats[1].stat.name
    const valueAttack = stats[1].base_stat
    const textDefense = stats[2].stat.name
    const valueDefense = stats[2].base_stat
    const textSpecialAttack = stats[3].stat.name
    const valueSpecialAttack = stats[3].base_stat
    const textSpecialDefense = stats[4].stat.name
    const valueSpecialDefense = stats[4].base_stat
    const textSpeed = stats[5].stat.name
    const valueSpeed = stats[5].base_stat

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    function valuetext(value) {
      return `${value}`;
    }
    const PrettoSlider = withStyles({
      root: {
        color: '#52af77',
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
  
    return (
      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} onClick={() => history.push("/")}>{name.toUpperCase().substring(0, 2)}</Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <HomeIcon onClick={() => history.push("/")}/>
              </IconButton>
            }
            title={toFirstCharUppercase(name)}
            subheader=''
          />
          <CardMedia
            className={classes.media}
            image={fullImageUrl}
            title={toFirstCharUppercase(name)}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {typeBR} | {heightBR} | {weightBR}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Detalhes</Typography >
              
              <Typography id="hp_slide" gutterBottom>
                {textHP} | {valueHP}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="hp_slide" defaultValue={valueHP} disable />
              
              <Typography id="attack_slide" gutterBottom>
                {textAttack} | {valueAttack}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="attack_slide" defaultValue={valueAttack} disable />
   
              <Typography id="defense_slide" gutterBottom>
                {textDefense} | {valueDefense}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="defense_slide" defaultValue={valueDefense} disable />
 
              <Typography id="specialAtack_slide" gutterBottom>
                {textSpecialAttack} | {valueSpecialAttack}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="specialAtack_slide" defaultValue={valueSpecialAttack} disable />
 
              <Typography id="specialDefense_slide" gutterBottom>
                {textSpecialDefense} | {valueSpecialDefense}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="specialDefense_slide" defaultValue={valueSpecialDefense} disable />

              <Typography id="speed_slide" gutterBottom>
                {textSpeed} | {valueSpeed}
              </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="speed_slide" defaultValue={valueSpeed} disable />
             
            </CardContent>
          </Collapse>
        </Card>
      </Container>
    );
  }
  



  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

    </>
  );
};

export default Pokemon;
