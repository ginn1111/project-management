import React from 'react';
import BangCap from './bang-cap';
import ChungChi from './chung-chi';

const BangCapChungChi = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="panel">
        <BangCap />
      </div>
      <div className="panel">
        <ChungChi />
      </div>
    </div>
  );
};

export default BangCapChungChi;
