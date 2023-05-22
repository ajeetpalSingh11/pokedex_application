import React, { useEffect, useState } from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./utils/api";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import { FavoriteProvider } from "./contexts/favoritesContext";

const favoritesKey = "f"
function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("ID");

  const itemsPerPage = 30;
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itemsPerPage, itemsPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = (window.location.pathname === "/Favorites") ? getPokemonFavArr() : await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites);
    if(window.location.pathname === "/Favorites"){
      setPokemons(getPokemonFavArr())
    }
  }

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)

  }

  const getPokemonFavArr = () => {

    let pokemonsArr = [];
    const pokemonsFavArray = JSON.parse(window.localStorage.getItem(favoritesKey))

    pokemonsArr = pokemonsFavArray.map((item, index) => {

      return JSON.parse(item);
    })

    return pokemonsArr;
  }


  const handleChangeSortBy = (param) => {
    let sortArr = pokemons;
    //console.log("sortArr", sortArr);
    if (param === "ID") {
      sortArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    } else if (param === "Name") {
      sortArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }
    else if (param === "Height") {
      sortArr.sort((a, b) => (a.height > b.height) ? 1 : ((b.height > a.height) ? -1 : 0))
    }
    else if (param === "Weight") {
      sortArr.sort((a, b) => (a.weight > b.weight) ? 1 : ((b.weight > a.weight) ? -1 : 0))
    }
    setSortBy(param);
    setPokemons(sortArr)
  }


  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar onSearch={onSearchHandler} />
        {notFound ? (
          <div class-name="not-found-text"> Not Found </div>
        ) :
          (<Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            handleSortBy={handleChangeSortBy}
          />)}
      </div>
    </FavoriteProvider>

  );
}

export default App;