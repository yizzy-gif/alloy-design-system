import type { SVGProps } from 'react';

export interface Download02IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Download02Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Download02IconProps) {
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
      <path d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Download02Icon.displayName = 'Download02Icon';
