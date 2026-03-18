import type { SVGProps } from 'react';

export interface XIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const XIcon = ({ size = 10, color = 'currentColor', ...props }: XIconProps) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" {...props}>
    <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
