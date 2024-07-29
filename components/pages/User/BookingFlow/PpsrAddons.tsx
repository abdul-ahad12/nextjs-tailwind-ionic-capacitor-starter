import { BackAndButton, Tabs } from '@components/ui';
import { DynamicFieldsGenerate } from '@components/ui/common/inputComponent/DynamicFieldsGenerate';
import Modal from '@components/ui/common/modals';
import TitleDescription from '@components/ui/common/TitleDescription';
import PackageOffer from '@components/ui/common/user/PackageOffer';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import { BookingResponseStore } from './store';

const PPSRAddons = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formMethods;

  const history=useHistory()

  const servicesPackage1 = {
    packageName: 'Basic Service',
    data: ['Verify Ownership', 'Theft check', 'Secure Investments'],
  };

  const handleSelectPackage = (packageName: any) => {
    setSelectedPackage(packageName);
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleSubmitVIN = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://ppsr-search-certificate-motor-vehicle1.p.rapidapi.com/rapid_ppsrLookupVIN',
        {
          params: { vin: data.VIN },
          headers: {
            'x-rapidapi-key':
              'b27414ee33msha8de5f0bef815a1p1f541fjsn06f62a363230',
            'x-rapidapi-host':
              'ppsr-search-certificate-motor-vehicle1.p.rapidapi.com',
          },
        },
      );

      if (response.data.Status) {
        const url = response.data.URL;
        BookingResponseStore.update(s=>{
          s.ppsrLink=url
        })
        setIsOpen(false)
        setIsSuccess(true);
      } else {
        throw new Error('Failed to retrieve the report');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'An error occurred');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      fieldName: 'VIN',
      inputType: 'text',
      label: 'Vehicle Information Number',
      defaultValue: '',
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <BackAndButton
        back
        title="Addons"
        BtnText="Buy"
        onSubmit={handleModalOpen}
      >
        <Tabs activeTab={4} />
        <div className="flex justify-between flex-col h-full">
          <div className="flex flex-col items-center text-center gap-4">
            <TitleDescription
              heading="PPSR Report"
              description="A PPSR report is crucial for verifying ownership, revealing encumbrances, ensuring secure investments, and preventing legal and financial risks."
            />
            <div className="flex justify-center gap-4">
              <PackageOffer
                title="PPSR Report"
                services={servicesPackage1.data}
                price="$40"
                selectable
                isSelected={selectedPackage === 'Basic Service'}
                onSelect={() => handleSelectPackage('Basic Service')}
              />
            </div>
          </div>

          <div
            onClick={() => {
              history.push('/selectdatetime');
            }}
            className="mb-5 bg-white border border-black text-black rounded-primary flex justify-center items-center py-3"
          >
            Continue
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          title="Enter VIN"
          btnText={loading ? 'Loading...' : 'Submit'}
          onSubmit={handleSubmit(handleSubmitVIN)}
          onDidDismiss={handleModalClose}
        >
          <DynamicFieldsGenerate fields={fields} errors={errors} />
        </Modal>
      </BackAndButton>

      <IonToast
        isOpen={isError}
        message={errorMsg}
        duration={5000}
        onDidDismiss={() => setIsError(false)}
      />

      <IonToast
        isOpen={isSuccess}
        message="File available for download after checkout"
        duration={5000}
        onDidDismiss={() => setIsSuccess(false)}
      />
    </FormProvider>
  );
};

export default PPSRAddons;
