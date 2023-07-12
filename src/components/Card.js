import React from 'react'

const Card = ({ children }) => {
    return <div className = "w-full h-full rounded-md relative p-8 border-2 bg-gray-900 border-gray-800 text-neutral-100"> {children} </div>;
};

export default Card;

// Card that will be used as a container component
// styled using tailwind