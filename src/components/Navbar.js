import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Searchbar from "./Searchbar";

const Navbar = (props) => {
    const { favoritePokemons } = useContext(FavoriteContext);
    const { onSearch } = props;

    const isHomeActive = (window.location.pathname === "/Home" || window.location.pathname === "/") ? true : false;

    return (
        <nav>
            <div className="topnav">
                <a className={isHomeActive ? "active" : ""} href="Home">Home</a>
                <a className={!isHomeActive ? "active" : ""}href="Favorites" >Favorites</a>
                <Searchbar handleSearch={onSearch} />
            </div>
        </nav>
    );
};


export default Navbar;