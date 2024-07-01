// import { ErrorMessage } from '@hookform/error-message';
import { DynamicControl } from './DynamicFields';
import { Text } from '../text';

// interface Config {
//   required: string;
// }

// interface FormField {
//   fieldName: string;
//   inputType: string;
//   label: string;
//   defaultValue: string;
//   config?: Config;
//   validation?: any;
// }

interface IDynamicFieldsGenerate {
  fields: any;
  errors: any;
}

export const DynamicFieldsGenerate = ({
  fields,
  errors,
}: IDynamicFieldsGenerate) => {
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
                {/* {errors && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99992 13.4167C3.44159 13.4167 0.583252 10.5584 0.583252 7.00004C0.583252 3.44171 3.44159 0.583374 6.99992 0.583374C10.5583 0.583374 13.4166 3.44171 13.4166 7.00004C13.4166 10.5584 10.5583 13.4167 6.99992 13.4167ZM7.87492 2.91671H6.12492V7.58337H7.87492V2.91671ZM6.99992 8.75004C6.35825 8.75004 5.83325 9.27504 5.83325 9.91671C5.83325 10.5584 6.35825 11.0834 6.99992 11.0834C7.64159 11.0834 8.16659 10.5584 8.16659 9.91671C8.16659 9.27504 7.64159 8.75004 6.99992 8.75004Z"
                      fill="#DE1135"
                    />
                  </svg>
                )} */}
                {/* <Text className="text-red-600"> */}
                  {/* <ErrorMessage errors={errors} name={d.fieldName} /> */}
                {/* </Text> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
