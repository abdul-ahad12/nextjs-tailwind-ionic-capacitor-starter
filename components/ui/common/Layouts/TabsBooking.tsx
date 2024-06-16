import React from 'react';

interface TabsProps {
  activeTab: number;
}

const Tabs: React.FC<TabsProps> = ({ activeTab }) => {
  const tabsValue = 6;

  return (
    <div className="w-full flex justify-center pb-5 pt-2">
      <div className="justify-between flex gap-1 w-full">
        {Array.from({ length: tabsValue }).map((_, index) => {
          let bgColor = '#CDDEFF'; // default gray color

          if (index < activeTab) {
            bgColor = '#0671E0'; // replace with your actual tertiary color
          } else if (index === activeTab) {
            bgColor =
              'rgba(6, 113, 224, 0.3)'; // 30% opacity
          }

          return (
            <div
              key={index}
              className="w-full rounded-lg py-[2px]"
              style={{ backgroundColor: bgColor }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
