import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'w-full  text-[17px] py-[14px] rounded-primary font-bold',
  variants: {
    color: {
      primary: 'bg-secomdary text-primary',
    },
    disabled: {
      true: 'bg-customWhite text-[#0000008C]',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string; // Allow additional className
}

export const Button = (props: ButtonProps) => {
  // Combine generated classes with additional className if provided
  const combinedClassName = `${button(props)} ${props.className || ''}`;

  return <button className={combinedClassName}>{props.children}</button>;
};
