import React, { useEffect, useState } from "react";
import { IconButton, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, CircularProgress, Container, AppBar, Toolbar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import { toFirstCharUppercase } from "./constants";
import Stats from './stats';

import axios from "axios";

import clsx from 'clsx';

// Estilização dos componentes
const useStyles = makeStyles((theme) => ({
  container:{    
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  title:{
    cursor: 'pointer'
  },
  topMenu: {
    marginBottom: '25px'
  },
  root: {
    minWidth: 400,
    maxWidth: 1200,
  },
  media: {
    height: 0,
    paddingTop: '60%',
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

// Criação dos elemetos da aplicação
const Pokemon = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { match, history } = props;
  const { params } = match;
  const { idPokemon } = params;
  const [pokemon, setPokemon] = useState(undefined);

  // Requisição na api pokeapi.co pelo id do pokemon
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

  // Cria o card para visualização dos dados do pokemon
  const generatePokemonJSX = (pokemon) => {
    const { name, id, height, weight, types, stats } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    // Seta o tipo do pokemon
    const typeBR = `Tipo: ${types[0].type.name}`
    // Seta o tamanho do pokemon em cm
    const heightBR = `${height * 10} cm`
    // Seta o peso do pokemon em Kg
    const weightBR = `${weight / 10} Kg`
    
    // Define o título da página
    document.title = `PokeZupe | ${toFirstCharUppercase(name)}`

    // Habilita a visão dos sliders. default = false
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    // Recria um novo objeto para os sliders
    const statsNew = stats.reduce((acc, type)=>{
      acc.push({name: type.stat.name, value: type.base_stat})
      return acc
    },[])

    // Função cria os sliders com seus respectivos valores
    function generate(obj) {
      return obj.map((item) =>
        React.cloneElement(<Stats id={item.name} typeAbiliity={item.name} level={item.value} />, {
          key: item,
        }),
      );
    }
    
    return (
      <>      
      <AppBar className={classes.topMenu} position="sticky">
        <Toolbar>
          <Typography className={classes.title} onClick={() => history.push("/pokezup")} variant="h6" noWrap>
            PokeZup 
          </Typography>   
          <Typography variant="h6" noWrap>
             {'⠀|⠀'}{toFirstCharUppercase(name)}
          </Typography>  
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} onClick={() => history.push("/pokezup")}>{name.toUpperCase().substring(0, 2)}</Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <HomeIcon onClick={() => history.push("/pokezup")}/>
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
              <Typography variant="body1" color="textSecondary" component="p">Estatísticas</Typography >
              <hr />
              <br />
              
              {generate(statsNew)}

            </CardContent>
          </Collapse>
        </Card>
      </Container>
      <br />
      </>
    );
  }
  


  // Validação caso o pokemon não exista
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Esse pokemon não existe!</Typography>}

    </>
  );
};

export default Pokemon;
