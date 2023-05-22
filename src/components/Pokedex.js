import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import Filters from "./Filters";

const pokedex = (props) => {
    const { pokemons, loading, page, setPage, totalPages, handleSortBy } = props;
    const onLeftClickHandler = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }
    const onRightClickHandler = () => {
        if (page + 1 !== totalPages) {
            setPage(page + 1)
        }
    }
    const handleSortSelect = (param) => {
        handleSortBy(param);
    }

    const sortByArr = ["ID", "Name", "Height", "Weight"]

    return (
        <div>
            <div className="pokedex-header">
                <h1>pokedex</h1>
                <Filters
                    sortByArr={sortByArr}
                    sortSelect={handleSortSelect}
                />
                <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onLeftClick={onLeftClickHandler}
                    onRightClick={onRightClickHandler}
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="pokedex-grid">
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <PokemonCard key={index} pokemon={pokemon} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default pokedex;