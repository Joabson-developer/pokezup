import React, { useEffect, useState } from "react";
import { Grid, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton, InputBase, Container, Avatar, Typography, CircularProgress, Toolbar, AppBar,} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container:{    
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid #ccc'
  },
  pointer:{
    cursor: 'pointer'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  topMenu: {
    marginBottom: '25px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));

// Criação dos elemetos da aplicação
const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  // Requisição na api pokeapi.co com os 150 primeiros pokemons
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=150`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  // Captura os dados do input para filtrar o(s) pokemon(s)
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };
  
  // Clona o elemento para montagem da lista
  function generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  //Cria a listagem dos pokemons
  const getPokemonList = (idPokemon) => {
    const { id, name, sprite } = pokemonData[idPokemon];

    // Seta o titulo da página
    document.title = `PokeZupe | Home`

    // Retorna a lista de pokemons
    return (
      <Container className={classes.container}>
        <Grid item xs={12} lg={6} md={8} sm={10}>
          <div className={classes.list}>
           <List>
              {generate(
                <ListItem>
                  <ListItemAvatar onClick={() => history.push(`/${id}`)}>
                    <Avatar className={classes.pointer} alt={toFirstCharUppercase(name)} src={sprite}/>
                  </ListItemAvatar>
                  <ListItemText className={classes.pointer}
                    primary={id + '. ' + toFirstCharUppercase(name)}
                    onClick={() => history.push(`/${id}`)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="view" onClick={() => history.push(`/${id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid> 
      </Container>      
    );
  };

  // Menu de busca
  return (
    <>
      <AppBar className={classes.topMenu} position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            PokeZup
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar pokemon"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (idPokemon) =>
              pokemonData[idPokemon].name.includes(filter) &&
              getPokemonList(idPokemon)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
