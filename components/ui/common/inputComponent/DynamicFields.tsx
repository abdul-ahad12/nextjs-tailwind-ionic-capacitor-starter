import { useFormContext } from 'react-hook-form';
import { DynamicFieldData } from '../../../../utils/definations/types/DynamicControlField';
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
              placeholder={`Enter your ${label}`}
            />
          </div>
        </div>
      );

    default:
      return <input type="text" />;
  }
};
