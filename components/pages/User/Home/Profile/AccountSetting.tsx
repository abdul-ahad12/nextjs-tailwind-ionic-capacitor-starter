import React, { useState } from 'react';
import { RightArrowSvg } from '../../../../ui/common/svgs';
import { DocumentSvg } from '../../../../ui/common/svgs/DocumentSvg';
import { Button } from '../../../../ui/common/button';
import BackAndButton from '../../../../ui/common/Layouts/BackAndButton';
import { Phone } from '../../../../ui/common/svgs/Phone';
import LocationSvg from '../../../../ui/common/svgs/LocationSvg';
import Modal from '../../../../ui/common/modals';
import { DynamicFieldsGenerate } from '../../../../ui/common/InputComponent/DynamicFieldsGenerate';
import { FormProvider, useForm } from 'react-hook-form';
import { AccountComp, IconTextButton } from '../../../../ui/common';

const AccountSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const fields = [
    {
      fieldName: 'email',
      inputType: 'text',
      label: 'Update Your Email',
      defaultValue: '',
      config: {
        required: 'Required',
      },
      validation: {
        required: 'Email is Required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Incorrect Email',
        },
      },
    },
  ];

  const iconTextButtonData = [
    {
      icon: <LocationSvg />, // Assuming you have an AddImageSvg component imported
      text: 'Victoria Melbourne, Australia SA-150',
      bgcolor: 'bg-[#F1F1F199]', // Example background color
    },
    {
      icon: <DocumentSvg />, // Assuming you have an AddImageSvg component imported
      text: 'benwilliams@gmail.com',
      bgcolor: 'bg-[#F1F1F199]', // Example background color
    },

    // Add more objects as needed
  ];

  const handleUpdate = (data: any) => {
    console.log(data);

    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(false);
  };

  return (
    <BackAndButton back title="My Account">
      <div className="flex flex-col gap-10">
        <AccountComp
          direction={'flex-col '}
          imageUrl="/notifications/profile.svg"
          name="Ben Williams"
          rating={'Rating'}
          items={'items-center '}
        />

        <div className="flex flex-col gap-5 ">
          {/* Map the iconTextButtonData array and render IconTextButton component */}
          {iconTextButtonData.map((item, index) => (
            <IconTextButton
              key={index}
              svgcomp={<RightArrowSvg />}
              icon={item.icon}
              text={item.text}
              bgcolor={item.bgcolor}
              onButtonClick={handleOpenModal}
            />
          ))}
        </div>
        <Button
          className="text-red-500 w-full justify-center flex items-center"
          color="secondary"
        >
          <img src="/trash.png" />
          <span className="ml-3"> Delete Account</span>
        </Button>
        <FormProvider {...formMethods}>
          <Modal
            btnText="Update"
            title="Update Your Email Address"
            isOpen={isOpen}
            onSubmit={handleSubmit(handleUpdate)}
          >
            <DynamicFieldsGenerate fields={fields} errors={errors} />
          </Modal>
        </FormProvider>
      </div>
    </BackAndButton>
  );
};

export default AccountSetting;
