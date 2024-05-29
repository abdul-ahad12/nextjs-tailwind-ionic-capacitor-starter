import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { IonRouterLink } from '@ionic/react';

export const button = tv({
  base: 'w-full text-[17px] py-[18px] rounded-primary font-bold font-[Silka]',
  variants: {
    color: {
      primary: 'bg-secomdary text-primary',
      secondary: 'text-secondary border-[1px]  border-black rounded-md',
      accept: 'bg-[#5CB85C] text-large text-white',
      reject: 'bg-[#E11900]  text-large text-white',
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

// Combine ButtonVariants and native button attributes
type MergedButtonProps = ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string; // Define href as an optional prop
  };

export const Button = (props: MergedButtonProps) => {
  // Determine if the button should be an IonRouterLink or regular button

  // Combine generated classes with additional className if provided
  const combinedClassName = `${button(props)} ${props.className || ''}`;

  // Render either a regular button or IonRouterLink based on props
  return (
    <button {...props} className={combinedClassName}>
      {props.children}
    </button>
  );
};
