import type { SVGProps } from 'react';

export interface Hash01IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Hash01Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Hash01IconProps) {
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
      <path d="M4 8H20M4 16H20M8 3V21M16 3V21" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Hash01Icon.displayName = 'Hash01Icon';
