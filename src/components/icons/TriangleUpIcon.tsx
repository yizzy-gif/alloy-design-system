import type { SVGProps } from 'react';

export interface TriangleUpIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
  strokeWidth?: number;
}

/** TriangleUpIcon — outline triangle pointing up · viewBox 0 0 24 24 */
export const TriangleUpIcon = ({ size = 24, color = 'currentColor', strokeWidth, ...props }: TriangleUpIconProps) => {
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
      <path
        d="M11.4926 4.29493C11.7435 3.85826 12.2565 3.85826 12.5074 4.29493L22.1414 20.9893C22.3921 21.4258 22.0774 22 21.634 22H2.36603C1.92257 22 1.6079 21.4258 1.85856 20.9893L11.4926 4.29493Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

TriangleUpIcon.displayName = 'TriangleUpIcon';
