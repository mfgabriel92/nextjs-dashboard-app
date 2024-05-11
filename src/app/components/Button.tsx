'use client';

import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-12 w-48 items-center justify-center bg-blue-700 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 disabled:bg-gray-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
}
