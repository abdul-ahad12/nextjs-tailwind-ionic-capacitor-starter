import React from 'react';
import { Text } from '../text';

interface OrderItem {
  text: string;
  price: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3 p-2">
      <Text typography="body" className="text-black font-semibold">
        Order Summary
      </Text>
      <div className="flex flex-col gap-2 bg-[#F1F1F199] p-3 rounded-sm">
        {items.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <Text className="text-black font-medium">{item.text}</Text>
            <Text>{item.price}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
