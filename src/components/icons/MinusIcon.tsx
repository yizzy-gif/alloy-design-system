import type { SVGProps } from 'react';

export interface MinusIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function MinusIcon({ size = 16, color = 'currentColor', strokeWidth, ...props }: MinusIconProps) {
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
      <path d="M5 12H19" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

MinusIcon.displayName = 'MinusIcon';
