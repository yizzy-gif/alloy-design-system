import type { SVGProps } from 'react';

export interface InfoCircleIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const InfoCircleIcon = ({ size = 24, color = 'currentColor', ...props }: InfoCircleIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-1 5.5a1 1 0 012 0v4.5a1 1 0 01-2 0V12z"
    />
  </svg>
);

InfoCircleIcon.displayName = 'InfoCircleIcon';
