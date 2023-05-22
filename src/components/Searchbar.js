import React, { useState } from "react";

const Searchbar = (props) => {
    const [search, setSearch] = useState("dito")
    const { handleSearch } = props
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            handleSearch(undefined)
        }
    }

    const onButtonClickHandler = () => {
        handleSearch(search)
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Search pokemon" onChange={onChangeHandler} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler} >Search</button>
            </div>
        </div>
    )
}

export default Searchbar;