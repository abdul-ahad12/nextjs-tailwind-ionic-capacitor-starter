import { error } from 'console';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const text = tv({
  base: '',
  variants: {
    typography: {
      header: 'font-[700] text-header',
      body: 'text-medium',
    },
    size: {
      large: 'text-large font-[600]',
      medium: 'text-medium',
      small: 'text-small',
    },
    error:{
        true:"text-error text-small"
    }
 
  },
  defaultVariants: {
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
