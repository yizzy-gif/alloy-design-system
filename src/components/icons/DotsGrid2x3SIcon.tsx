import type { SVGProps } from 'react';

export interface DotsGrid2x3SIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function DotsGrid2x3SIcon({ size = 16, color = 'currentColor', strokeWidth, ...props }: DotsGrid2x3SIconProps) {
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
      <path d="M14.495 9.66667H14.505M14.495 14.3333H14.505M14.495 5H14.505M14.495 19H14.505M9.495 9.66667H9.505M9.495 14.3333H9.505M9.495 5H9.505M9.495 19H9.505" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

DotsGrid2x3SIcon.displayName = 'DotsGrid2x3SIcon';
