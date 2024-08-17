import React, { useState } from 'react'

function SearchArt() {

    const [input,setInput] = useState('')
    return (
        <div>
             <div>
            <h2>Search Shoes</h2>
            <input 
            onChange={(e)=> setInput(e.target.value)}
            type="text"  
            placeholder="Search for your desired shoe..."/>
            <button  onClick={() => console.log("button clicked")}>Search</button>
           
            </div>
        </div>
      )
}

export default SearchArt