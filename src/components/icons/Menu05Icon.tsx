import type { SVGProps } from 'react';

export interface Menu05IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Menu05Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Menu05IconProps) {
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
      <path d="M3 8.5H21M3 15.5H21" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Menu05Icon.displayName = 'Menu05Icon';
