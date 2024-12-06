import React from 'react';
import { Link } from 'react-router-dom';

const Visas = () => {
  return (
    <div>
      <h1>All visas</h1>
      <Link to="/visa-details" className='bg-yellow-500 font-black p-2'>Details</Link>
    </div>
  );
};

export default Visas;