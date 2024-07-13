const SwitchTabs = ({ activeTab, setActiveTab }: any) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <div
        className={`flex items-center cursor-pointer px-7 py-2 rounded-primary transition-all duration-300 ${
          activeTab === 'vehicle'
            ? 'bg-secomdary text-white'
            : 'bg-white text-secomdary'
        }`}
        onClick={() => handleTabClick('vehicle')}
      >
        <img
          src="/user/mechanicselectlocation.png"
          alt="Vehicle"
          className={`w-6  mr-2 ${activeTab === 'vehicle' && 'hidden'}`}
        />
        Vehicle
      </div>
      <div
        className={`flex items-center cursor-pointer px-7 py-2 rounded-primary transition-all duration-300 border border-[#E6E6E6] ${
          activeTab === 'realestate'
            ? 'bg-secomdary text-white'
            : 'bg-white text-secomdary'
        }`}
        onClick={() => handleTabClick('realestate')}
      >
        <img
          src="/user/realestateselectlocation.png"
          alt="Real estate"
          className={`w-6 h-6 mr-2 ${activeTab === 'realestate' && 'hidden'}`}
        />
        Real estate
      </div>
    </div>
  );
};

export default SwitchTabs;
