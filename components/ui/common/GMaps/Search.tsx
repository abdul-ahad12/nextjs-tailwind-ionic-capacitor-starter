import React from 'react';
import { IonInput, IonList, IonItem } from '@ionic/react';

interface SearchComponentProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  suggestions: any;
  handleSelect: any;
  top?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  inputValue,
  setInputValue,
  suggestions,
  handleSelect,
  top,
}) => {
  return (
    <div className="relative">
      <input
        value={inputValue}
        placeholder="Type a location"
        onChange={(e: any) =>
          setInputValue((e.target as HTMLInputElement).value)
        }
        className="rounded-primary w-full py-[15px] px-[20px] text-medium font-[Silka] border border-[#E8E9EA] focus:border-tertiary focus:outline-none"
      />
      {suggestions.length > 0 && (
        <div
          className={`absolute ${top ? 'top-[3rem]' : 'bottom-[3rem] '} left-[4px] w-[95%] bg-white shadow-md rounded z-50`}
        >
          <IonList className="divide-y divide-gray-200">
            {suggestions.map((suggestion: any) => (
              <IonItem
                key={suggestion.place_id}
                button
                onClick={() => {
                  handleSelect(suggestion);
                }}
                className="p-2 hover:bg-gray-100"
              >
                {suggestion.description}
              </IonItem>
            ))}
          </IonList>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
