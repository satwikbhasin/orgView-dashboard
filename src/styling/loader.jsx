import React from 'react';
import { CircleDashed } from 'lucide-react';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <CircleDashed className="rotating-circle" />
    </div>
  );
};

export default Loader;