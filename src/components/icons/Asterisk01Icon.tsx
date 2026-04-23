import type { SVGProps } from 'react';

export interface Asterisk01IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export function Asterisk01Icon({ size = 16, color = 'currentColor', strokeWidth, ...props }: Asterisk01IconProps) {
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
      <path d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Asterisk01Icon.displayName = 'Asterisk01Icon';
