import type { SVGProps } from 'react';

export interface ChevronLeftIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
}

export const ChevronLeftIcon = ({ size = 24, color = 'currentColor', ...props }: ChevronLeftIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 6L9 12L15 18"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ChevronLeftIcon.displayName = 'ChevronLeftIcon';
