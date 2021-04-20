import React, { useState, useEffect } from 'react';

const Quote = ({ quote }) => {
  const [style, setStyle] = useState({ color: '' });

  //run useEffect every time the component is rendered and generate random rgb color
  useEffect(() => {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    setStyle({ color: `rgb(${r},${g},${b})` });
  }, []);
  return (
    <div className='quote-slide'>
      <h1 style={style}>{quote.text}</h1>
      <p>{quote.author ? `${quote.author}` : 'Unknown'}</p>
    </div>
  );
};

export default Quote;
