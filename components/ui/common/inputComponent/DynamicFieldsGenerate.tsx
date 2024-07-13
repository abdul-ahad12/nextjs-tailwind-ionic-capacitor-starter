import { ErrorMessage } from '@hookform/error-message';
import { Text } from '../text';
import { DynamicControl } from '../FormElements/DynamicControl';


interface IDynamicFieldsGenerate {
  fields: any;
  errors: any;
}

export const DynamicFieldsGenerate: React.FC<IDynamicFieldsGenerate> = ({
  fields,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-10 w-full pb-6">
      <div className="flex flex-col mt-10 gap-5 w-full">
        {fields.map((d: any, i: number) => (
          <div key={i} className=" w-full">
            <div key={i} className="flex flex-col w-full  ">
              <div className="flex items-center gap-10 w-full">
                <DynamicControl {...d} />
              </div>
              <div className="flex gap-2 items-center pt-1">
                <Text className="text-red-600">
                  <ErrorMessage errors={errors} name={d.fieldName} />
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
