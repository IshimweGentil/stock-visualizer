import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import StockContext from './context/stockContext';


function App() {
  const [stockSymbol, setStockSymbol] = useState("FB"); // global state for the selected stock symbol, initialized to FB
  return (
    // stock context that wraps round the dashboard, takes in values stock symbol and set stock symbol
    <StockContext.Provider value = {{stockSymbol, setStockSymbol}}>
      <Dashboard />
    </StockContext.Provider>
      
  );
};

export default App;
