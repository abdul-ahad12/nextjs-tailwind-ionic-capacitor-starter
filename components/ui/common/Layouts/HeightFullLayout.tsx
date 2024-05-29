import React from 'react';

interface IHeightFullLayout {
  children: React.ReactNode;
}

const HeightFullLayout: React.FC<IHeightFullLayout> = ({ children }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default HeightFullLayout;
