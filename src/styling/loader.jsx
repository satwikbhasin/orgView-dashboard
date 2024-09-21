import React from 'react';
import { CircleDashed } from 'lucide-react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <CircleDashed className="rotating-circle" />
    </div>
  );
};

export default Loader;