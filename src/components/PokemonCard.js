import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";

const PokemonCard = (props) => {
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)
    const { pokemon } = props;
    const onHeartClick = () => {
        updateFavoritePokemons(JSON.stringify(pokemon))
    }
    const heart = favoritePokemons.includes(JSON.stringify(pokemon)) ? "❤️" : "🖤";
    return (
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <img alt={pokemon.name} src={pokemon.sprites.other['official-artwork']['front_default']} className="pokemon-image" />
            </div>
            <div className="card-body">
                <div className="card-top">
                   <h3> {pokemon.name}</h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) => {
                            return (
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className="pokemon-heart-btn" onClick={onHeartClick}>
                        {heart}
                    </button>
                </div>
                <div> {"Height : "  + pokemon.height}</div>
                    <div>{"Weight : " +pokemon.weight}</div>
            </div>
        </div>)
}

export default PokemonCard;