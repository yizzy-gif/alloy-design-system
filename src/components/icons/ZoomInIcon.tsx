import type { SVGProps } from 'react';

export interface ZoomInIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function ZoomInIcon({ size = 16, color = 'currentColor', strokeWidth, ...props }: ZoomInIconProps) {
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
      <path d="M21 21L17.5001 17.5M11.4529 7.64415V11.6441M11.4529 11.6441V15.6441M11.4529 11.6441H7.45291M11.4529 11.6441H15.4529M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

ZoomInIcon.displayName = 'ZoomInIcon';
