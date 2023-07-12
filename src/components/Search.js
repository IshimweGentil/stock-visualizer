import React, { useContext, useState } from "react";
import { searchSymbol } from "../api/stock-api";
import SearchResults from "./SearchResults";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Search = () => {
 

  const [input, setInput] = useState(""); //input state will track what the user inputs

  const [bestMatches, setBestMatches] = useState([]); // returns best matches from the api

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      } // if there is an error, it will set best matches to an emoty array and log the error
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => { // sets input to an empty String and best matches to an empty array
    setInput("");
    setBestMatches([]);
  };

  return (
    <div
      className= 'flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-gray-900 border-gray-800'
      
    >
      <input
        type="text"
        value={input}
        className= 'w-full px-4 py-2 focus:outline-none rounded-md bg-gray-900'
        placeholder="Search stock..."
        onChange={(event) => setInput(event.target.value)} // when the input changes, will update the input state to event target value
        onKeyPress={(event) => { // if you press enter it will run updateBestatches and search
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1"> 
        {/* if therre is text in the search box, runs the clear function when the X button is clicked */}
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button 
        onClick={updateBestMatches} 
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      > {/* calls updateBestMatches when you click the search */}
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
      {/* if there is an input and best matches array > 0, render search results, other wise - null*/}
    </div>
  );
};

export default Search;