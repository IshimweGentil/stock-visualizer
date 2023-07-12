import React from 'react'
import Search from './Search';


const Header = ({name}) => {
  return <>
  <div className = "xl:px-32">  
  <h1 className = "text-3xl text-neutral-100"> {name} </h1>
    <Search /> {/* implements the search bar into the dashboard */}
  </div> 

  </>;
};

export default Header;
