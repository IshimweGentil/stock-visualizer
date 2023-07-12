// helper methods for finnhub api

const apiKey = 'cilnhj9r01qk0p7auetgcilnhj9r01qk0p7aueu0' 
// sensitive info, shouldnt be placed in this file but couldnt get it to work any other way, oh well


const basePath = "https://finnhub.io/api/v1";

//completes a request to search symbols from the api
export const searchSymbol = async (query) => {
    const url = `${basePath}/search?q=${query}&token=${apiKey}`;
    const response = await fetch(url);
  
    // if response object has an error
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    // takes the response object and parses it as JSON, producing a JavaScript object
    return await response.json();
  };

// performs an http request using 'fetch' to retreive the profile details of a stock
export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;
    const response = await fetch(url);

    // if response object has an error
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
        return await response.json();
};

// retreives teh quote of a stock
export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${apiKey}`;
    const response = await fetch(url);

    // if response object has an error
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
        return await response.json();
};

// retrieves the historical data of the stock
export const fetchHistoricalData = async (
    stockSymbol,
    resolution,
    from,
    to
    ) => {
    const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;
    const response = await fetch(url);

    // if response object has an error
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
        return await response.json();
};
