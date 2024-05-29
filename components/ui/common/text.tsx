import { error } from 'console';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const text = tv({
  base: 'text-secomdary font-[Silka]',
  variants: {
    typography: {
      header: 'font-[700] text-header ',
      cardsheader: 'text-[16px] font-semibold',
      body: 'text-[14px] text-[#A3A6AC] leading-[25px]',
      basicService:
        'bg-[#FFE5DD] text-[12px] w-fit px-2 py-1 rounded-md font-semibold',
      premiumService:
        'bg-[#D3EAB7] text-[12px] w-fit px-2 py-1 rounded-md font-semibold',
      modalHeader: 'text-[17px] font-semibold text-secondary',
      services: 'text-[11px] text-[#A3A6AC] ',
      inspectionLarge: 'text-[31px] text-tertiary font-semibold ',
      inspectionSmall: 'text-[25px] text-tertiary font-medium ',
      // blackbody:"text-[12px] "
    },
    error: {
      true: 'text-error text-small',
    },
  },
  defaultVariants: {
    // size: 'small',
    typography: 'body',
  },
});

type TextVariants = VariantProps<typeof text>;

interface TextProps extends TextVariants {
  children: React.ReactNode;
  className?: string; // Allow additional className
}

export const Text = (props: TextProps) => {
  // Combine generated classes with additional className if provided
  const combinedClassName = `${text(props)} ${props.className || ''}`;

  return <div className={combinedClassName}>{props.children}</div>;
};
