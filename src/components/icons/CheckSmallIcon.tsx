import type { SVGProps } from 'react';

export interface CheckSmallIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function CheckSmallIcon({ size = 16, color = 'currentColor', strokeWidth, ...props }: CheckSmallIconProps) {
  const s = typeof size === 'number' ? size : parseFloat(size as string);
  const sw = strokeWidth ?? (s <= 12 ? 2 : s <= 16 ? 1.75 : s <= 20 ? 1.5 : 1.25);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={sw}
      {...props}
    >
      <path d="M7.5 12L10.5 15L16.5 9" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

CheckSmallIcon.displayName = 'CheckSmallIcon';
