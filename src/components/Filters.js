import React from "react";

const Filters = (props) => {
    const { sortType, sortSelect, sortByArr } = props

    const handleChangeSort = (e) => {
        sortSelect(e.target.value);
    }

    return (

        <div className="sortContainter">
            <div >
                Sort by
            </div>
            <div style={{margin:"0px 10px 0px 10px"}}> <select  value={sortType} onChange={handleChangeSort}>
                {sortByArr.map((sort) => (
                    <option
                        key={sort}
                        value={sort}>{sort}
                    </option>
                ))}
            </select></div>
            
        </div>

    )
}

export default Filters;