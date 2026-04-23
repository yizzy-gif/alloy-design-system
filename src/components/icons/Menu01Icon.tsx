import type { SVGProps } from 'react';

export interface Menu01IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Menu01Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Menu01IconProps) {
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
      <path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Menu01Icon.displayName = 'Menu01Icon';
