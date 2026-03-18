import type { SVGProps } from 'react';

export interface ArrowNarrowRightIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
}

export const ArrowNarrowRightIcon = ({ size = 24, color = 'currentColor', ...props }: ArrowNarrowRightIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12H20M20 12L14 6M20 12L14 18"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ArrowNarrowRightIcon.displayName = 'ArrowNarrowRightIcon';
