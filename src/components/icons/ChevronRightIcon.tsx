import type { SVGProps } from 'react';

export interface ChevronRightIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
}

export const ChevronRightIcon = ({ size = 24, color = 'currentColor', ...props }: ChevronRightIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 6L15 12L9 18"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ChevronRightIcon.displayName = 'ChevronRightIcon';
