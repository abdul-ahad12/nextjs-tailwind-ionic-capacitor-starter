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
}

const BookingAccordion: React.FC<AccordionProps> = ({
  title,
  bookingdetails,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border border-gray-300 rounded ">
      <div
        className="flex items-center justify-between cursor-pointer border-b p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <motion.div
          className="transition-all"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <Arrow />
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          className="p-4"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }} // Animate height to 0 when closing
          transition={{ duration: 0.3 }}
        >
          {bookingdetails.map((item, index) => (
            <div key={index} className="border-b border-gray-300 py-5">
              <div className="flex justify-between items-center">
                <Text
                  typography="cardsheader"
                  className="text-lg font-semibold"
                >
                  {item.heading}
                </Text>
                <Button className="w-fit bg-white text-blue-600">Edit</Button>
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
