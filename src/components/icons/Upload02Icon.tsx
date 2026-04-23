import type { SVGProps } from 'react';

export interface Upload02IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Upload02Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Upload02IconProps) {
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
      <path d="M21 3H3M18 13L12 7M12 7L6 13M12 7V21" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Upload02Icon.displayName = 'Upload02Icon';
