// inputVariant.ts
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const input = tv({
  base: 'rounded-primary w-full py-[15px] px-[20px] text-small',
  variants: {
    state: {
      default:
        'border border-[#E8E9EA] focus:border-tertiary focus:outline-none',
    },
    error: {
      true: 'border border-error',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

type InputVariants = VariantProps<typeof input>;

interface InputProps
  extends InputVariants,
    React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = (props: InputProps) => {
  const { className, ...rest } = props;
  const combinedClassName = `${input(props)} ${className || ''}`;

  return <input className={combinedClassName} {...rest} />;
};
