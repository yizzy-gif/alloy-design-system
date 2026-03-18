import type { SVGProps } from 'react';

export interface InfoIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .alloy-icon-slot CSS when used inside an icon slot. */
  size?: number | string;
  color?: string;
}

export const InfoIcon = ({ size = 24, color = 'currentColor', ...props }: InfoIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.995 20V8.62745M11.995 4H12.005"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

InfoIcon.displayName = 'InfoIcon';
