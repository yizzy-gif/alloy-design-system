import type { SVGProps } from 'react';

export interface ArrowUpRightIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
}

export const ArrowUpRightIcon = ({ size = 24, color = 'currentColor', ...props }: ArrowUpRightIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ArrowUpRightIcon.displayName = 'ArrowUpRightIcon';
