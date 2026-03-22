import type { SVGProps } from 'react';

export interface XIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

/**
 * XIcon — close / dismiss / clear
 * Source: x-close.svg  ·  viewBox 0 0 24 24
 */
export const XIcon = ({ size = 16, color = 'currentColor', ...props }: XIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
