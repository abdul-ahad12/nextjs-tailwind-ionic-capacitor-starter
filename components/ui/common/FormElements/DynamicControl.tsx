import { useFormContext } from 'react-hook-form';
import { Text } from '../text';

export const DynamicControl = ({
  label,
  inputType,
  fieldName,
  defaultValue,
  options = [],
  config = {},
  validation = {},
  placeholder,
}: any) => {
  const { register } = useFormContext();

  const validationConfig = { ...config, ...validation };

  // Function to get today's date in the format yyyy-mm-dd
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to get current time in the format hh:mm
  const getCurrentTime = () => {
    const today = new Date();
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  switch (inputType) {
    case 'text':
      return (
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <Text className="text-[#1A202F]">{label}</Text>
            <input
              className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
              id={fieldName}
              type="text"
              defaultValue={defaultValue}
              {...register(fieldName, validationConfig)}
              placeholder={placeholder ? placeholder : `Enter your ${label}`}
            />
          </div>
        </div>
      );
    case 'file':
      return (
        <div>
          <label>{label}</label>
          <input
            className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
            id={fieldName}
            type="file"
            defaultValue={defaultValue}
            {...register(fieldName, validationConfig)}
          />
        </div>
      );
    case 'select': {
      return (
        <div className="w-full">
          <label>{label}</label>
          <select
            defaultValue={defaultValue}
            {...register(fieldName, validationConfig)}
            name={fieldName}
            id={fieldName}
            className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
          >
            {options.map((o: any, index: number) => (
              <option key={index} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
    case 'number':
      return (
        <div>
          <label>{label}</label>
          <input
            type="number"
            className="items-center border-[2px] p-1 w-[300px] rounded-md"
            id={fieldName}
            {...register(fieldName, validationConfig)}
            defaultValue={defaultValue}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <label>{label}</label>
          <input
            className="rounded-md"
            type="checkbox"
            id={fieldName}
            {...register(fieldName, validationConfig)}
            defaultValue={defaultValue}
          />
        </div>
      );
    case 'date':
      return (
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <Text className="text-[#1A202F]">{label}</Text>
            <input
              className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
              id={fieldName}
              type="date"
              {...register(fieldName, config)}
              defaultValue={defaultValue}
              min={getTodayDate()} // Set minimum value to today's date
              placeholder={`Enter your ${label}`}
            />
          </div>
        </div>
      );
    case 'time':
      return (
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <Text className="text-[#1A202F]">{label}</Text>
            <input
              className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
              id={fieldName}
              type="time"
              {...register(fieldName, config)}
              defaultValue={defaultValue}
              min={getCurrentTime()} // Set minimum value to current time
              placeholder={`Enter your ${label}`}
            />
          </div>
        </div>
      );
    default:
      return <input type="text" />;
  }
};
