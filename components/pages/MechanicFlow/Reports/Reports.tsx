import React, { useEffect, useRef, useState } from 'react';
import BasicReport from '../../../ui/common/mechanic/resuable/mechanicinspection/BasicReport';
import { Text } from '../../../ui/common/text';
import { Button } from '../../../ui/common/button';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { useHistory } from 'react-router';
import { Filter } from '../../../ui/common/svgs/Filter';
import Modal from '../../../ui/common/modals';
import RadioBtn from '../../../ui/common/radioBtn';
import useDynamicGetRequest from '../../../../utils/supportingFns/getCall';
import { baseURL } from '../../../../utils/definations/axios/url';

const Reports = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const { data, error, loading, makeRequest } = useDynamicGetRequest();

  const mechId = '62989d7a-be2a-5a88-98f6-4d5adc77e693';
  useEffect(() => {
    // Example usage of makeRequest function
    makeRequest(`${baseURL}/inspection-report/mechanic/${mechId}`, 'GET');
  }, []);

  console.log(data)

  const handleSubmit = () => {
    history.push('/app/ongoingreports');
  };

  const inspectionData = [
    {
      firstText: 'Basic Service',
      name: 'John Doe',
      imageUrl: '/mechanic/inspection/file.png',

      imageurl2: '/mechanic/inspection/calender.png',

      dateTime: '2024-05-13',
      earningText: '100$',
      carModalText: 'Toyota Camry',
      description: 'Some description',
      orderId: '123456789',
    },
    {
      firstText: 'Second Inspection',
      name: 'Jane Doe',
      imageUrl: '/mechanic/inspection/file.png',

      imageurl2: '/mechanic/inspection/calender.png',

      dateTime: '2024-05-14',
      earningText: '150$',
      carModalText: 'Honda Civic',
      description: 'Another description',
      orderId: '987654321',
    },
  ];

  const options = ['No Filter', 'Today', 'Last Week', 'Last Month'];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  function dismiss() {
    setIsOpen(false);
  }

  return (
    <BackAndButton
      onSubmit={handleSubmit}
      title="Reports"
      back
      BtnText="Create New Report"
    >
      <div className="flex justify-between w-full items-center">
        <Text className="font-semibold">Recent Reports</Text>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-transparent flex text-black items-center gap-3 font-medium text-[16px] w-fit"
        >
          <Filter />
          Filter by
        </Button>
        <Modal
          isOpen={isOpen}
          ref={modal}
          title={'Filter By'}
          btnText={'Apply Filter'}
          trigger={'open-modal'}
          onSubmit={dismiss}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`py-5 px-2 rounded-secondary w-full ${selectedOption === option && 'bg-[#f7f7f7]'}`}
            >
              <RadioBtn
                modal
                key={option}
                label={option}
                checked={selectedOption === option}
                onChange={() => handleRadioChange(option)}
              />
            </div>
          ))}
        </Modal>
      </div>
      <div className="flex gap-3 flex-col pb-9">
        {inspectionData.map((inspection, index) => (
          <BasicReport
            typography={'basicService'}
            imageurl2={inspection.imageurl2}
            viewReport={true}
            key={index}
            firstText={inspection.firstText}
            name={inspection.name}
            imageUrl={inspection.imageUrl}
            dateTime={inspection.dateTime}
            description={inspection.description}
          />
        ))}
      </div>
    </BackAndButton>
  );
};

export default Reports;
