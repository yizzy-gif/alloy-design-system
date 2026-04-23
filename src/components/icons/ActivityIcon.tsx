import type { SVGProps } from 'react';

export interface ActivityIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function ActivityIcon({ size = 16, color = 'currentColor', strokeWidth, ...props }: ActivityIconProps) {
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
      <path d="M22 12H18L15 21L9 3L6 12H2" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

ActivityIcon.displayName = 'ActivityIcon';
