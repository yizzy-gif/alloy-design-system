import type { SVGProps } from 'react';

export interface Asterisk02IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Asterisk02Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Asterisk02IconProps) {
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
      <path d="M12 4V20M18 6L6 18M20 12H4M18 18L6 6" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Asterisk02Icon.displayName = 'Asterisk02Icon';
