import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { BookingStore } from './store';
import { australianCarData } from '../../../../utils/mockData/carMakes';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import TitleDescription from '../../../ui/common/TitleDescription';

interface FormValues {
  make: string;
  model: string;
  year: string;
  regNumber: string;
}

const VehicleDetails: React.FC = () => {
  const history = useHistory();

  const [formValues, setFormValues] = useState<FormValues>({
    make: '',
    model: '',
    year: '',
    regNumber: '',
  });
  const [modelOptions, setModelOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formValues.make.trim() !== '' &&
        formValues.model.trim() !== '' &&
        formValues.year.trim() !== '' &&
        formValues.regNumber.trim() !== '',
    );
  }, [formValues]);

  const handleMakeChange = (selectedMake: string) => {
    const makeData = australianCarData.find(make => make.make === selectedMake);
    if (makeData) {
      const models = makeData.models.map(model => ({
        value: model,
        label: model,
      }));
      setModelOptions(models);
      setFormValues(prev => ({ ...prev, make: selectedMake, model: '' }));
    } else {
      setModelOptions([]);
      setFormValues(prev => ({ ...prev, make: selectedMake, model: '' }));
    }
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.make.trim()) newErrors.make = 'Required';
    if (!formValues.model.trim()) newErrors.model = 'Required';
    if (!formValues.year.trim()) newErrors.year = 'Required';
    if (!formValues.regNumber.trim()) newErrors.regNumber = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    BookingStore.update(s => {
      s.vehicle = {
        ...s.vehicle,
        make: formValues.make,
        model: formValues.model,
        regNumber: formValues.regNumber,
        year: formValues.year,
      };
    });
    history.push('/package');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1989 },
    (_, index) => currentYear - index,
  );

  return (
    <form onSubmit={onSubmit}>
      <BackAndButton
        back
        BtnText="Next"
        title="Vehicle Information"
        onSubmit={onSubmit}
        disabled={isSubmitting || !isFormValid}
      >
        <div className="w-full">
          <TitleDescription
            heading="Vehicle Information?"
            description="Enter the vehicle details"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="make" className="text-[#1A202F]">
                Make
              </label>
              <select
                id="make"
                className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
                value={formValues.make}
                onChange={e => handleMakeChange(e.target.value)}
              >
                <option value="">Select Make</option>
                {australianCarData.map(make => (
                  <option key={make.make} value={make.make}>
                    {make.make}
                  </option>
                ))}
              </select>
              {errors.make && (
                <span className="text-red-500">{errors.make}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="model" className="text-[#1A202F]">
                Model
              </label>
              <select
                id="model"
                className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
                value={formValues.model}
                onChange={e => handleInputChange('model', e.target.value)}
              >
                <option value="">Select Model</option>
                {modelOptions.map(model => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
              {errors.model && (
                <span className="text-red-500">{errors.model}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className="text-[#1A202F]">
                Year
              </label>
              <select
                id="year"
                className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
                value={formValues.year}
                onChange={e => handleInputChange('year', e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && (
                <span className="text-red-500">{errors.year}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="regNumber" className="text-[#1A202F]">
                Registration Number
              </label>
              <input
                id="regNumber"
                type="text"
                className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
                value={formValues.regNumber}
                onChange={e => handleInputChange('regNumber', e.target.value)}
              />
              {errors.regNumber && (
                <span className="text-red-500">{errors.regNumber}</span>
              )}
            </div>
          </div>
        </div>
      </BackAndButton>
    </form>
  );
};

export default VehicleDetails;
