import React, { useState } from 'react';
import BackAndButton from '../../../ui/common/Layouts/BackAndButton';
import { Button } from '../../../ui/common/button';
import { Text } from '../../../ui/common/text';
import InputComponent from '../../../ui/common/inputComponent';
import {
  usePhotoGallery,
  UserPhoto,
} from '../../../../utils/supportingFns/takePhoto';

interface VehicleInformation {
  make: string;
  vin: string;
  ordometer: string;
  vehiclecolor: string;
  carImages: UserPhoto[];
}

interface DetailedInspectionItem {
  title: string;
  description: string;
  rating: number;
  comments: string;
  carImages: UserPhoto[];
}

interface DetailedInspection {
  title: string;
  data: DetailedInspectionItem[];
}

interface FormState {
  date: string;
  mechanicName: string;
  vehicleInformation: VehicleInformation;
  DetailedInspection: DetailedInspection[];
}

const initialFormState: FormState = {
  date: new Date().toLocaleDateString(),
  mechanicName: '',
  vehicleInformation: {
    make: '',
    vin: '',
    ordometer: '',
    vehiclecolor: '',
    carImages: [],
  },
  DetailedInspection: [
    {
      title: 'Engine and Peripherals',
      data: [
        {
          title: 'Engine Condition:',
          description: 'Dummy Description',
          rating: 5,
          comments: '',
          carImages: [],
        },
      ],
    },
    {
      title: 'Transmission and Drivetrain',
      data: [
        {
          title: 'Oil Level Quality',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Battery',
          description: '',
          rating: 3,
          comments: '',
          carImages: [],
        },
        {
          title: 'Radiator',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'Alternator',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Starter Motor',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
    {
      title: 'Body Structure',
      data: [
        {
          title: 'Body Panels',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'Roof Pillars',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Doors',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Bonnet',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Windshield',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'Side Mirrors',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
    {
      title: 'Interior',
      data: [
        {
          title: 'Seats Belts',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Dashboard',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'Air Conditioning',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Infotainment System',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Warning Lights',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'Cluster Panel',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
    {
      title: 'Suspension and Brakes',
      data: [
        {
          title: 'Shock Absorbers',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Suspension',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Brakes',
          description: '',
          rating: 5,
          comments: '',
          carImages: [],
        },
        {
          title: 'ABS',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
    {
      title: 'Wheels and Tires',
      data: [
        {
          title: 'Tire Condition',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Rims',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        {
          title: 'Alignment',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
    {
      title: 'Final Checks',
      data: [
        {
          title: 'Road Test',
          description: '',
          rating: 4,
          comments: '',
          carImages: [],
        },
        // Add more components as needed
      ],
    },
  ],
  // additionalComments: '',
  // recommendation: {
  //   purchase: true,
  //   repairsNeeded: [],
  //   estimatedRepairCosts: 0,
  // },
  // url: '',
};

const CreateReport: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { takePhoto, deletePhoto } = usePhotoGallery();

  const handleChange = (path: (string | number)[], value: any) => {
    setFormState(prevState => {
      const newState = { ...prevState };
      let currentLevel: any = newState;

      for (let i = 0; i < path.length - 1; i++) {
        currentLevel = currentLevel[path[i]];
      }

      currentLevel[path[path.length - 1]] = value;
      return newState;
    });
  };

  const handleTakePhoto = async (path: (string | number)[]) => {
    const newPhoto = await takePhoto();
    setFormState(prevState => {
      const newState = { ...prevState };
      let currentLevel: any = newState;

      for (let i = 0; i < path.length - 1; i++) {
        currentLevel = currentLevel[path[i]];
      }

      if (
        !currentLevel[path[path.length - 1]].some(
          (photo: UserPhoto) => photo.filepath === newPhoto.filepath,
        )
      ) {
        currentLevel[path[path.length - 1]] = [
          ...currentLevel[path[path.length - 1]],
          newPhoto,
        ];
      }

      return newState;
    });
  };

  const handleDeletePhoto = (path: (string | number)[], filepath: string) => {
    deletePhoto(filepath);
    setFormState(prevState => {
      const newState = { ...prevState };
      let currentLevel: any = newState;

      for (let i = 0; i < path.length - 1; i++) {
        currentLevel = currentLevel[path[i]];
      }

      currentLevel[path[path.length - 1]] = currentLevel[
        path[path.length - 1]
      ].filter((photo: UserPhoto) => photo.filepath !== filepath);

      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formState);
    // Perform any additional actions with the formState here
  };

  const createStarRating = (
    label: string,
    value: number,
    path: (string | number)[],
  ) => (
    <div key={path.join('.')} className="mt-4">
      <label className="block font-bold text-gray-600">{label}</label>
      <div className="star-rating flex space-x-1">
        {[5, 4, 3, 2, 1].map(i => (
          <div key={i}>
            <input
              type="radio"
              id={`star${i}-${path.join('-')}`}
              name={`rating-${path.join('-')}`}
              value={i}
              checked={value === i}
              onChange={() => handleChange(path, i)}
              className="hidden"
            />
            <label
              htmlFor={`star${i}-${path.join('-')}`}
              className="text-2xl cursor-pointer"
              style={{ color: value >= i ? '#f59e0b' : '#e5e7eb' }}
            >
              ★
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const createPhotoButton = (path: (string | number)[]) => {
    const photos = path.reduce(
      (obj: any, key: any) => obj[key],
      formState,
    ) as any;

    return (
      <div key={path.join('.')} className="mt-4">
        <div className="w-[10rem]">
          <Button
            color="accept"
            type="button"
            onClick={() => handleTakePhoto(path)}
          >
            Upload Images
          </Button>
        </div>
        <div className="flex mt-2">
          {photos.map((photo: any, index: number) => (
            <div
              key={index}
              className="relative mr-2"
              style={{ width: '3rem' }}
            >
              <img
                src={photo.webviewPath}
                alt=""
                className="w-full h-auto"
                style={{ maxWidth: '3rem' }}
              />
              <button
                type="button"
                onClick={() => handleDeletePhoto(path, photo.filepath)}
                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const createForm = (
    obj: any,
    path: (string | number)[] = [],
  ): JSX.Element[] => {
    const elements = Object.keys(obj).map(key => {
      const currentPath = [...path, key];
      const value = obj[key];
      const label = formatTitle(key);

      if (key === 'carImages') {
        return createPhotoButton(currentPath); // Handle carImages separately
      }

      if (Array.isArray(value)) {
        return value.map((item, index) => (
          <div key={index} className="mt-6">
            {createForm(item, [...currentPath, index])}
          </div>
        ));
      }

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mt-6">
            <Text typography="inspectionLarge">{label}</Text>
            {createForm(value, currentPath)}
          </div>
        );
      }

      if (key === 'date') {
        return (
          <Text key={key} typography="inspectionSmall">
            {formState.date}
          </Text>
        );
      }
      if (key === 'title') {
        return (
          <div key={key} className="mt-4">
            <Text typography="inspectionSmall">{value}</Text>
            <Text>
              {getDescription(value)} {/* Get description for the title */}
            </Text>
          </div>
        );
      }

      if (key === 'rating') {
        return createStarRating(label, value, currentPath);
      }

      return createInputField(label, value, currentPath);
    });

    return elements.flat() as JSX.Element[];
  };

  const getDescription = (title: string): string => {
    // Sample function to generate a 30-word description based on the title
    // Replace this with your actual logic to generate descriptions
    return `${title} is a critical component that needs thorough inspection. It ensures the proper functioning of the vehicle and contributes to its overall performance and safety.`;
  };

  const formatTitle = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const createInputField = (
    label: string,
    value: string,
    path: (string | number)[],
  ) => (
    <div key={path.join('.')} className="mt-4">
      <InputComponent
        text={label}
        type="text"
        value={value}
        onChange={e => handleChange(path, e.target.value)}
        className="mt-2 block w-full p-2 border border-gray-300 rounded focus"
      />
    </div>
  );

  return (
    <BackAndButton back title="Create Report" >
      <form onSubmit={handleSubmit}>
        {createForm(formState)}
        <Button type="submit" className="mt-10">
          Submit
        </Button>
      </form>
    </BackAndButton>
  );
};

export default CreateReport;
