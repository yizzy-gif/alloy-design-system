import type { SVGProps } from 'react';

export interface CircularArrowIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
  strokeWidth?: number;
}

/** CircularArrowIcon — open circular loop with a rightward arrow · viewBox 0 0 24 24 */
export const CircularArrowIcon = ({ size = 24, color = 'currentColor', strokeWidth, ...props }: CircularArrowIconProps) => {
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
        d="M3.34 7C5.07 4.01 8.3 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C8.3 22 5.07 19.99 3.34 17M12 16L16 12M16 12L12 8M16 12H2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CircularArrowIcon.displayName = 'CircularArrowIcon';
