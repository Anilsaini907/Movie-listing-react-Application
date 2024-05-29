import React from 'react'

const Search = ({searchQuery,handleChange}) => {
  return (
    <div>
<div className="row mt-5">
<div className="col-md-5 mx-auto">
    <div className="small fw-light mb-1 mt-2"> Search movies here....</div>
    <div className="input-group">
        <input className="form-control border rounded-pill" type="search" 
        value={searchQuery}
        onChange={handleChange} 
        placeholder='type movie name here'
        id="example-search-input"></input>
    </div>
</div>
</div>
    </div>
  )
}

export default Search;




