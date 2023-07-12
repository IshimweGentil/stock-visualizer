import React, { useContext } from "react";
import StockContext from '../context/stockContext';



const SearchResults = ({ results }) => {

  const { setStockSymbol } = useContext(StockContext);

  return (
  <ul className='absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark text-white'> 
  {results.map ((item) => {  // maps the results in the unordered list
    return <li 
    key={item.symbol} 
    className = "cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-600 text-white"
    onClick =  { () => {
      setStockSymbol(item.symbol); // sets the stock symbol when you click on a result from the list
    }}
    >
        
        
        <span>{item.symbol}</span>
        <span>{item.description} </span>
    </li> // for each item it will return an individual list item

  })}
  </ul>
  );
};

export default SearchResults;
