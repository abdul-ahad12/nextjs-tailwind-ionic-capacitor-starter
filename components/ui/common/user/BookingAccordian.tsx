import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { Button } from '../button';
import { Arrow } from '../svgs';
import { Text } from '../text';

interface AccordionProps {
  title: string;
  bookingdetails: {
    heading: string;
    details: { description: string; price: string }[];
  }[];
  edit?: boolean;
}

const BookingAccordion: React.FC<AccordionProps> = ({
  title,
  bookingdetails,
  edit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border border-gray-300 rounded-md py-2">
      <div
        className="flex items-center justify-between cursor-pointer border-b px-3 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text typography="body" className="text-black font-semibold">
          {title}
        </Text>
        <motion.div
          className="transition-all"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <Arrow />
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          className="px-4"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }} // Animate height to 0 when closing
          transition={{ duration: 0.1 }}
        >
          {bookingdetails.map((item, index) => (
            <div key={index} className="border-t border-gray-300 ">
              <div className="flex justify-between items-center pt-3">
                <Text typography="body" className="text-black font-semibold">
                  {item.heading}
                </Text>
                {edit && (
                  <Button className="w-fit bg-white font-semibold underline text-blue-600">
                    Edit
                  </Button>
                )}
              </div>
              {item.details.map((detail, i) => (
                <div key={i} className="flex justify-between">
                  <Text typography="body" className="mt-2">
                    {detail.description}
                  </Text>
                  <Text typography="body" className="mt-2">
                    {detail.price}
                  </Text>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookingAccordion;
