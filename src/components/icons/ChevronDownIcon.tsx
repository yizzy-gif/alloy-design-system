import type { SVGProps } from 'react';

export interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
}

export const ChevronDownIcon = ({ size = 24, color = 'currentColor', ...props }: ChevronDownIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ChevronDownIcon.displayName = 'ChevronDownIcon';
