import React, { useContext, useEffect, useState} from 'react'
import Header from './Header';
import Details from './Details';
import Overview from './Overview';
import Chart from './Chart';
import StockContext from '../context/stockContext';
import { fetchStockDetails, fetchQuote } from '../api/stock-api';


// making seperate containers using the card component for each section of the website, sets the dimensions in the className
// is responsive to different screen sizes

const Dashboard = () => {

    const { stockSymbol } = useContext(StockContext);

    const [stockDetails, setStockDetails] = useState({}) //keeps track of stock details, initialized as an empty object
    const [quote, setQuote] = useState({}); //keeps track of stock quote, initialized as an empty object

    useEffect(() => {
        // when the user clicks on a new stock, update stock details and stock overview
        const updateStockDetails = async () => {
          try {
            const result = await fetchStockDetails(stockSymbol);
            setStockDetails(result);
          } catch (error) {
            setStockDetails({});
            console.log(error);
          } // if there is en error, set stock details to empty and log the error
        };
    
        const updateStockOverview = async () => {
          try {
            const result = await fetchQuote(stockSymbol);
            setQuote(result);
          } catch (error) {
            setQuote({});
            console.log(error);
          } // if there is en error, set stock details to empty and log the error
        };
    
        updateStockDetails();
        updateStockOverview();
      }, [stockSymbol]);
    

    return <div className = {"h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-gray-900 text-gray-300 " }
    >
        <div className = "col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justfy-start items-center">
            <Header name = {stockDetails.name} /> {/* implements the header into the dashboard, sets the name to the chosen stock */}
        </div>

        <div className = "md:col-span-2 row-span-4"> 
            <Chart /> 
        {/* implements the chart into the dashboard */}
        </div>

        <div>
            <Overview 
            symbol ={stockSymbol.ticker} 
            price = {quote.pc} 
            change = {quote.d} 
            changePercent = {quote.vp}
            currency = {stockDetails.currency}
            /> 
            {/* implements the Overview into the dashboard */}

        </div>

        <div className = "row-span-2 xl:row-span-3">
            <Details details = {stockDetails} /> {/* implements the company details into the dashboard */}
        </div>
        </div>
  
};

export default Dashboard

